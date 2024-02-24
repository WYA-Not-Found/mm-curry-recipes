import { APIResponseDataType } from "./common";

export interface CategoryItem {
  id?: string;
  title: string;
  description: string;
}
export interface CategoryResponseType extends APIResponseDataType {
  title: string;
  description: string;
}
