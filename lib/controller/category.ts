import Category from "../models/Category";
import { CategoryItem } from "../types/category";

export const _getCategoryList = () => {
  return Category.find();
};
export const _createCategory = (data: CategoryItem) => {
  return Category.create({ ...data });
};
export const _updateCategory = (id: string, data: CategoryItem) => {
  return Category.findByIdAndUpdate(id, data);
};
export const _deleteCategory = (id: string) => {
  console.log("deleted id : " + id);

  return Category.findByIdAndDelete(id);
};
