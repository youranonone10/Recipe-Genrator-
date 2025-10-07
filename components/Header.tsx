
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-3">
            <i className="fas fa-utensils text-3xl text-green-600"></i>
            <h1 className="text-3xl font-bold text-gray-900">
            Gemini Recipe Generator
            </h1>
        </div>
        <p className="mt-2 text-md text-gray-600">What's in your pantry? Let's get cooking!</p>
      </div>
    </header>
  );
};

export default Header;
