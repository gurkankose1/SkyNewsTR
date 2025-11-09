
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NewsCard } from './components/NewsCard';
import { Article } from './types';
import { EditorsCorner } from './components/EditorsCorner';
import { db } from './services/firebase';
import { collection, getDocs, query, orderBy, limit, Timestamp } from 'firebase/firestore';

const formatDate = (date: Timestamp | string) => {
    if (typeof date === 'string') {
        return date;
    }
    if (date && typeof date.toDate === 'function') {
        return date.toDate().toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    return 'Tarih bilgisi yok';
};


const SkeletonCard: React.FC = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col animate-pulse">
      <div className="relative h-48 bg-slate-200"></div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
        <div className="h-6 bg-slate-200 rounded w-full mb-2"></div>
        <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
        <div className="h-16 bg-slate-200 rounded w-full mb-4"></div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
           <div className="h-4 bg-slate-200 rounded w-1/4"></div>
           <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-slate-200 rounded-full"></div>
              <div className="w-5 h-5 bg-slate-200 rounded-full"></div>
              <div className="w-5 h-5 bg-slate-200 rounded-full"></div>
           </div>
        </div>
      </div>
    </div>
);


function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesCollection = collection(db, 'articles');
        const q = query(articlesCollection, orderBy('date', 'desc'), limit(10));
        const articleSnapshot = await getDocs(q);
        const articlesList = articleSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as Omit<Article, 'id' | 'date'>,
          date: formatDate(doc.data().date as Timestamp)
        }));
        setArticles(articlesList);
      } catch (error) {
        console.error("Error fetching articles: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const mainArticle = !loading && articles.length > 0 ? articles[0] : null;
  const otherArticles = !loading && articles.length > 1 ? articles.slice(1) : [];

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow bg-off-white">
        
        {/* Hero Section / Manşet */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {loading ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-xl overflow-hidden p-6 animate-pulse">
                    <div className="order-2 md:order-1">
                        <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
                        <div className="h-10 bg-slate-200 rounded w-full mb-3"></div>
                        <div className="h-10 bg-slate-200 rounded w-5/6 mb-4"></div>
                        <div className="h-20 bg-slate-200 rounded w-full mb-6"></div>
                        <div className="h-5 bg-slate-200 rounded w-1/2"></div>
                    </div>
                    <div className="order-1 md:order-2 h-80 bg-slate-200 rounded-lg shadow-md"></div>
                </div>
            ) : mainArticle && (
                <a href="#" className="group grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl shadow-xl overflow-hidden p-6 hover:shadow-2xl transition-shadow duration-300">
                    <div className="order-2 md:order-1">
                        <p className="text-sm font-semibold text-brand-blue uppercase tracking-wide">GÜNDEM</p>
                        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-dark-navy leading-tight group-hover:text-brand-blue transition-colors duration-200">{mainArticle.title}</h1>
                        <p className="mt-4 text-lg text-slate-gray">{mainArticle.summary}</p>
                        <div className="mt-6 flex items-center text-sm">
                            <span className="font-semibold text-dark-navy">By {mainArticle.author}</span>
                            <span className="mx-2 text-slate-gray">|</span>
                            <span className="text-slate-gray">{mainArticle.date.toString()}</span>
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <img src={mainArticle.imageUrl} alt={mainArticle.title} className="w-full h-80 object-cover rounded-lg shadow-md" />
                    </div>
                </a>
            )}
        </div>


        {/* Latest News Section */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-dark-navy text-center mb-12">Günün Diğer Gelişmeleri</h2>
            <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
                ) : (
                    otherArticles.map(article => (
                        <NewsCard key={article.id} article={article} />
                    ))
                )}
            </div>
             { !loading && articles.length === 0 && (
                <div className="text-center col-span-full py-16">
                    <h3 className="text-2xl font-bold text-dark-navy">Haberler Yükleniyor...</h3>
                    <p className="text-slate-gray mt-2">AI haber robotumuz en güncel haberleri sizin için hazırlıyor. Lütfen kısa bir süre sonra tekrar kontrol edin.</p>
                </div>
            )}
        </div>

        {/* Editors' Corner Section */}
        <EditorsCorner />
        
      </main>
      <Footer />
    </div>
  );
}

export default App;
