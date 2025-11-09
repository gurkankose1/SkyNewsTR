const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");
const { GoogleGenAI, Type } = require("@google/genai");

admin.initializeApp();
const db = admin.firestore();

const API_KEY = functions.config().gemini.key;
if (!API_KEY) {
  throw new Error("Gemini API key not configured. Run 'firebase functions:config:set gemini.key=\"YOUR_API_KEY\"' in local OR set gemini.key in Firebase Function Environment variables.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const rewriteSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    body: { type: Type.STRING },
    imagePrompt: { type: Type.STRING },
  },
  required: ['title', 'body', 'imagePrompt'],
};

const RSS_URLS = [ "https://www.flightglobal.com/rss" ];

exports.fetchAndProcessNews = functions.runWith({ timeoutSeconds: 540, memory: '1GB' }).pubsub.schedule('every 60 minutes').onRun(async (context) => {
  functions.logger.info("News processing function started.");

  for (const url of RSS_URLS) {
      try {
        functions.logger.info(`Fetching RSS feed: ${url}`);
        const response = await axios.get(url, { timeout: 10000 });
        const parser = new XMLParser({ ignoreAttributes: false });
        const result = parser.parse(response.data);
        const items = result.rss.channel.item.slice(0, 3);

        for (const item of items) {
          const articleText = `${item.title}. ${item['content:encoded'] || item.description}`;
          const sourceUrl = item.link;

          const snapshot = await db.collection('articles').where('sourceUrl', '==', sourceUrl).get();
          if (!snapshot.empty) {
            functions.logger.info(`Article already exists, skipping: ${item.title}`);
            continue;
          }
          
          functions.logger.info(`Processing new article: ${item.title}`);
          
          const contentResponse = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `Based on the following aviation news text, please generate a JSON object containing a new Turkish title, an SEO-friendly rewritten Turkish body, and a detailed English image prompt. The title and body must be in Turkish. The imagePrompt must be in English. Text: ${articleText}`,
            config: { responseMimeType: "application/json", responseSchema: rewriteSchema },
          });
          const processedContent = JSON.parse(contentResponse.text);

          const imageResponse = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: processedContent.imagePrompt,
            config: { numberOfImages: 1, outputMimeType: 'image/jpeg', aspectRatio: '16:9' },
          });
          const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;
          const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
          
          const newArticle = {
            title: processedContent.title,
            summary: processedContent.body.split('\n\n')[0],
            body: processedContent.body,
            author: "SkyNews AI",
            date: admin.firestore.FieldValue.serverTimestamp(),
            imageUrl: imageUrl,
            source: result.rss.channel.title || "Unknown Source",
            sourceUrl: sourceUrl,
          };

          await db.collection("articles").add(newArticle);
          functions.logger.info(`Successfully added article to Firestore: ${processedContent.title}`);
        }
      } catch (error) {
        functions.logger.error(`Error processing URL: ${url}`, error);
      }
  }
  return null;
});
