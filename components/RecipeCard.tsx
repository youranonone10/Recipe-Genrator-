
import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{recipe.recipeName}</h3>
        <p className="text-gray-600 mb-4">{recipe.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 space-x-4 mb-6">
            <div className="flex items-center">
                <i className="fas fa-clock mr-2 text-green-500"></i>
                <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center">
                <i className="fas fa-user-friends mr-2 text-green-500"></i>
                <span>Serves {recipe.servings}</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 border-b-2 border-green-200 pb-2 mb-3">
              <i className="fas fa-shopping-basket mr-2"></i>Ingredients
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700 border-b-2 border-green-200 pb-2 mb-3">
              <i className="fas fa-stream mr-2"></i>Instructions
            </h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
