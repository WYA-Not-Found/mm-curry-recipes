import Ingredient from "../models/Ingredient";
import { IngredientItem } from "../types/ingredient";

export const _getIngredientList = () => {
  return Ingredient.find();
};
export const _createIngredient = (data: IngredientItem) => {
  return Ingredient.create({ ...data });
};
export const _updateIngredient = (id: string, data: IngredientItem) => {
  return Ingredient.findByIdAndUpdate(id, data);
};
export const _deleteIngredient = (id: string) => {
  return Ingredient.findByIdAndDelete(id);
};
