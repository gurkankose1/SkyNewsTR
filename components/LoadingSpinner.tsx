
import React from 'react';

export const LoadingSpinner: React.FC<{ text?: string }> = ({ text = "Processing..." }) => (
  <div className="flex flex-col items-center justify-center space-y-2">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
    <p className="text-dark-navy text-sm font-medium">{text}</p>
  </div>
);