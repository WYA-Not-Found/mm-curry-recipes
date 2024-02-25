import Recipe from "../models/Recipe";
import { RecipeItem } from "../types/recipe";

export const _getRecipeList = () => {
  return Recipe.find();
};
export const _createRecipe = (data: RecipeItem) => {
  return Recipe.create({ ...data });
};
export const _updateRecipe = (id: string, data: RecipeItem) => {
  return Recipe.findByIdAndUpdate(id, data);
};
export const _deleteRecipe = (id: string) => {
  return Recipe.findByIdAndDelete(id);
};
