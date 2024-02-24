import { CategoryItem, CategoryResponseType } from "../types/category";
import { endpoints } from "../configs/api";
import { APIResponseType } from "../types/common";

export const getCategoryList = (): Promise<CategoryResponseType[]> => {
  return fetch(endpoints.category, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => console.log(error));
};

export const createCategory = (
  category: CategoryItem
): Promise<APIResponseType> => {
  return fetch(endpoints.category, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...category }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const updateCategory = (
  category: CategoryItem
): Promise<APIResponseType> => {
  return fetch(endpoints.category, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...category }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteCategory = (id: string): Promise<APIResponseType> => {
  return fetch(endpoints.category, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
