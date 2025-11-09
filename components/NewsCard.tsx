import React from 'react';
import { Article } from '../types';
import { TwitterIcon } from './icons/TwitterIcon';
import { LinkedinIcon } from './icons/LinkedinIcon';
import { InstagramIcon } from './icons/InstagramIcon';


interface NewsCardProps {
  article: Article;
}

const handleShareClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
};

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const shareUrl = `https://skynews.tr/article/${article.id}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(article.title)}&summary=${encodeURIComponent(article.summary)}`;

  return (
    <a href="#" className="group bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
      <div className="relative">
        <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-sm text-slate-gray mb-2">{article.source} · {article.date}</p>
        <h3 className="text-xl font-bold text-dark-navy mb-2 leading-tight group-hover:text-brand-blue transition-colors duration-200">{article.title}</h3>
        <p className="text-slate-gray text-base mb-4 flex-grow">{article.summary}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
          <span className="text-xs font-semibold text-dark-navy">By {article.author}</span>
          <div className="flex items-center space-x-3">
             <button onClick={(e) => handleShareClick(e, twitterShareUrl)} title="Share on Twitter" className="text-slate-gray hover:text-brand-blue transition-colors duration-200">
                <TwitterIcon className="w-5 h-5" />
             </button>
             <button onClick={(e) => handleShareClick(e, linkedinShareUrl)} title="Share on LinkedIn" className="text-slate-gray hover:text-brand-blue transition-colors duration-200">
                <LinkedinIcon className="w-5 h-5" />
             </button>
              <button onClick={(e) => handleShareClick(e, '#')} title="Share on Instagram" className="text-slate-gray hover:text-brand-blue transition-colors duration-200">
                <InstagramIcon className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>
    </a>
  );
};