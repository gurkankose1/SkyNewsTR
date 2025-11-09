
import { Timestamp } from "firebase/firestore";

export interface Article {
  id: string; // Firestore ID'si string olacak
  title: string;
  summary: string;
  author: string;
  date: Timestamp | string; // Firestore'dan gelen Timestamp veya formatlanmış string
  imageUrl: string;
  source: string;
}

export interface AIGeneratedContent {
  title: string;
  body: string;
  imagePrompt: string;
}

export interface Editor {
  id: number;
  name: string;
  title: string;
  imageUrl: string;
  latestArticleTitle: string;
  latestArticleLink: string;
}
