
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: "The name of the recipe.",
    },
    description: {
      type: Type.STRING,
      description: "A short, enticing description of the dish."
    },
    ingredients: {
      type: Type.ARRAY,
      description: "A list of all ingredients needed for the recipe, including quantities. It should also list ingredients that are not provided by the user but are commonly available, such as salt, pepper, oil.",
      items: {
        type: Type.STRING,
      },
    },
    instructions: {
      type: Type.ARRAY,
      description: "Step-by-step instructions to prepare the dish.",
      items: {
        type: Type.STRING,
      },
    },
    servings: {
        type: Type.STRING,
        description: "How many people this recipe serves."
    },
    prepTime: {
        type: Type.STRING,
        description: "Estimated preparation and cooking time."
    }
  },
  required: ["recipeName", "description", "ingredients", "instructions", "servings", "prepTime"],
};


export const generateRecipes = async (ingredients: string[]): Promise<Recipe[]> => {
  if (ingredients.length === 0) {
    return [];
  }

  const prompt = `You are an expert chef. Create 3 diverse and delicious recipes using the following ingredients: ${ingredients.join(', ')}. Also include common pantry staples if needed (like oil, salt, pepper, flour, etc.). The recipes should be creative but approachable for a home cook.`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          description: "A list of three creative and delicious recipes.",
          items: recipeSchema,
        },
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("Received an empty response from the API.");
    }

    const recipes = JSON.parse(jsonText) as Recipe[];
    return recipes;
  } catch (error) {
    console.error("Error generating recipes:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate recipes: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating recipes.");
  }
};
