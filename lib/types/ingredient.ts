import { PutBlobResult } from "@vercel/blob";
import { APIResponseDataType } from "./common";

export interface IngredientItem {
  id?: string;
  name: string;
  image_url: string | File | PutBlobResult;
}
export interface IngredientResponseType extends APIResponseDataType {
  name: string;
  image_url: string;
}
