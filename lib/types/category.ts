import { PutBlobResult } from "@vercel/blob";
import { APIResponseDataType } from "./common";

export interface CategoryItem {
  id?: string;
  title: string;
  description?: string;
  image_url: string | File | PutBlobResult;
}
export interface CategoryResponseType extends APIResponseDataType {
  title: string;
  description?: string;
  image_url: string;
}
