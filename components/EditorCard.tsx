
import React from 'react';
import { Editor } from '../types';

interface EditorCardProps {
  editor: Editor;
}

export const EditorCard: React.FC<EditorCardProps> = ({ editor }) => {
  return (
    <div className="text-center p-4">
        <div className="relative w-32 h-32 mx-auto mb-4">
            <img 
                className="rounded-full w-full h-full object-cover shadow-lg border-4 border-white" 
                src={editor.imageUrl} 
                alt={`Portrait of ${editor.name}`} 
            />
        </div>
        <h3 className="text-xl font-bold text-dark-navy">{editor.name}</h3>
        <p className="text-brand-blue font-semibold">{editor.title}</p>
        <p className="text-slate-gray text-sm mt-2 px-2">"{editor.latestArticleTitle}"</p>
        <a href={editor.latestArticleLink} className="mt-4 inline-block text-sm font-semibold text-brand-blue hover:underline">
            Read Weekly Column →
        </a>
    </div>
  );
};
