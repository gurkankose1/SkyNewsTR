
import React from 'react';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#">
              <Logo className="h-14 w-auto" />
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-base font-medium text-dark-navy hover:text-brand-blue transition-colors duration-200">Home</a>
            <a href="#" className="text-base font-medium text-dark-navy hover:text-brand-blue transition-colors duration-200">Top Stories</a>
            <a href="#" className="text-base font-medium text-dark-navy hover:text-brand-blue transition-colors duration-200">Discussions</a>
            <a href="#" className="text-base font-medium text-dark-navy hover:text-brand-blue transition-colors duration-200">Haber Uçur</a>
          </nav>
          <div className="hidden md:block">
            <a href="#" className="bg-brand-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-blue/90 transition-colors duration-200">
              Editor Login
            </a>
          </div>
          <div className="md:hidden">
             {/* Mobile menu button could go here */}
          </div>
        </div>
      </div>
    </header>
  );
};
