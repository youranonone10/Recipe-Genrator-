
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import IngredientInput from './components/IngredientInput';
import RecipeCard from './components/RecipeCard';
import { generateRecipes } from './services/geminiService';
import { Recipe } from './types';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddIngredient = useCallback((ingredient: string) => {
    setIngredients(prev => [...prev, ingredient]);
  }, []);

  const handleRemoveIngredient = useCallback((indexToRemove: number) => {
    setIngredients(prev => prev.filter((_, index) => index !== indexToRemove));
  }, []);

  const handleGenerateRecipes = async () => {
    setIsLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const generated = await generateRecipes(ingredients);
      setRecipes(generated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IngredientInput
            ingredients={ingredients}
            onAddIngredient={handleAddIngredient}
            onRemoveIngredient={handleRemoveIngredient}
            onGenerate={handleGenerateRecipes}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-8 max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
              <strong className="font-bold"><i className="fas fa-exclamation-triangle mr-2"></i>Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="mt-12">
            {isLoading && (
              <div className="text-center">
                  <i className="fas fa-spinner fa-spin text-4xl text-green-600"></i>
                  <p className="mt-4 text-lg text-gray-600">Finding delicious recipes for you...</p>
              </div>
            )}
            
            {recipes.length > 0 && !isLoading && (
              <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                {recipes.map((recipe, index) => (
                  <RecipeCard key={index} recipe={recipe} />
                ))}
              </div>
            )}

            {!isLoading && recipes.length === 0 && ingredients.length > 0 && (
                 <div className="text-center text-gray-500 mt-10">
                    <i className="fas fa-book-open text-4xl mb-4"></i>
                    <p className="text-lg">Ready to find some recipes? Hit the "Generate" button!</p>
                 </div>
            )}
          </div>

        </div>
      </main>
      <footer className="text-center py-6 text-sm text-gray-500">
        <p>Powered by Google Gemini. Created with <i className="fas fa-heart text-red-500"></i> for food lovers.</p>
      </footer>
    </div>
  );
};

export default App;
