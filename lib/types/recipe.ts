import { PutBlobResult } from "@vercel/blob";
import { APIResponseDataType } from "./common";

export interface RecipeIngredientType {
  id: string;
  name: string;
}
export interface RecipeCategoryType {
  id: string;
  name: string;
}

export interface RecipeItem {
  id?: string;
  title: string;
  category: RecipeCategoryType;
  description: string;
  image_url: string | File | PutBlobResult;
  images: string[];
  time: string;
  ingredients: RecipeIngredientType[];
}
export interface RecipeResponseType extends APIResponseDataType {
  title: string;
  description: string;
  category: RecipeCategoryType;
  image_url: string | File | PutBlobResult;
  images: Array<string | File | PutBlobResult>;
  time: string;
  ingredients: RecipeIngredientType[];
}
