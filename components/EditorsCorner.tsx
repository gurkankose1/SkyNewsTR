
import React from 'react';
import { Editor } from '../types';
import { EditorCard } from './EditorCard';

const mockEditors: Editor[] = [
  {
    id: 1,
    name: 'Elif Kara',
    title: 'Airport Operations Analyst',
    imageUrl: 'https://picsum.photos/seed/woman1/200/200',
    latestArticleTitle: 'The Silent Revolution: How Automation is Reshaping European Airports This Week.',
    latestArticleLink: '#'
  },
  {
    id: 2,
    name: 'Barış Çelik',
    title: 'Airline Industry Strategist',
    imageUrl: 'https://picsum.photos/seed/man1/200/200',
    latestArticleTitle: 'Fuel Prices and Fleet Decisions: A High-Stakes Game for Major Airlines.',
    latestArticleLink: '#'
  },
  {
    id: 3,
    name: 'Selin Aydın',
    title: 'Ground Services & Logistics Expert',
    imageUrl: 'https://picsum.photos/seed/woman2/200/200',
    latestArticleTitle: 'Turnaround Times Under Pressure: The Unseen Challenges of Ground Handling.',
    latestArticleLink: '#'
  },
  {
    id: 4,
    name: 'Ahmet Yılmaz',
    title: 'Aviation Policy & Regulation Advisor',
    imageUrl: 'https://picsum.photos/seed/man2/200/200',
    latestArticleTitle: 'New Cross-Border Drone Regulations: What Do They Mean for Commercial Aviation?',
    latestArticleLink: '#'
  },
];

export const EditorsCorner: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-dark-navy sm:text-4xl">
            Weekly Columns from Our Experts
          </h2>
          <p className="mt-4 text-lg text-slate-gray max-w-2xl mx-auto">
            Get in-depth analysis on the most critical sectors of the aviation industry from our team of AI-powered specialists.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {mockEditors.map((editor) => (
            <EditorCard key={editor.id} editor={editor} />
          ))}
        </div>
      </div>
    </div>
  );
};
