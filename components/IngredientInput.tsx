
import React, { useState } from 'react';

interface IngredientInputProps {
  ingredients: string[];
  onAddIngredient: (ingredient: string) => void;
  onRemoveIngredient: (index: number) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, onAddIngredient, onRemoveIngredient, onGenerate, isLoading }) => {
  const [currentIngredient, setCurrentIngredient] = useState('');

  const handleAdd = () => {
    const trimmed = currentIngredient.trim();
    if (trimmed && !ingredients.map(i => i.toLowerCase()).includes(trimmed.toLowerCase())) {
      onAddIngredient(trimmed);
      setCurrentIngredient('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="ingredient-input" className="block text-sm font-medium text-gray-700 mb-2">
          Add your ingredients one by one
        </label>
        <div className="flex items-center gap-2">
          <input
            id="ingredient-input"
            type="text"
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., Chicken, Tomatoes, Rice"
            className="flex-grow shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md p-3"
            disabled={isLoading}
          />
          <button
            onClick={handleAdd}
            disabled={isLoading || !currentIngredient.trim()}
            className="px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
             <i className="fas fa-plus"></i> Add
          </button>
        </div>
      </div>

      <div className="mb-6 min-h-[50px] space-y-2">
        {ingredients.map((ingredient, index) => (
          <span key={index} className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-1 rounded-full">
            {ingredient}
            <button
              onClick={() => onRemoveIngredient(index)}
              disabled={isLoading}
              className="text-green-600 hover:text-green-800 focus:outline-none"
            >
              <i className="fas fa-times-circle"></i>
            </button>
          </span>
        ))}
        {ingredients.length === 0 && <p className="text-gray-500 text-sm">Your ingredients will appear here.</p>}
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || ingredients.length === 0}
        className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isLoading ? 'Generating...' : 'Generate Recipes'}
        {isLoading && <i className="fas fa-spinner fa-spin ml-2"></i>}
        {!isLoading && <i className="fas fa-magic ml-2"></i>}
      </button>
    </div>
  );
};

export default IngredientInput;
