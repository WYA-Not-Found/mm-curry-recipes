import { IngredientItem, IngredientResponseType } from "../types/ingredient";
import { endpoints } from "../configs/api";
import { APIResponseType } from "../types/common";

export const getIngredientList = (): Promise<IngredientResponseType[]> => {
  return fetch(endpoints.ingredient, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => console.log(error));
};

export const createIngredient = (
  ingredient: IngredientItem
): Promise<APIResponseType> => {
  return fetch(endpoints.ingredient, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...ingredient,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const updateIngredient = (
  ingredient: IngredientItem
): Promise<APIResponseType> => {
  return fetch(endpoints.ingredient, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...ingredient }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteIngredient = (id: string): Promise<APIResponseType> => {
  return fetch(endpoints.ingredient, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
