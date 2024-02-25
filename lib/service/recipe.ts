import { RecipeItem, RecipeResponseType } from "../types/recipe";
import { endpoints } from "../configs/api";
import { APIResponseType } from "../types/common";

export const getRecipeList = (): Promise<RecipeResponseType[]> => {
  return fetch(endpoints.recipe, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => console.log(error));
};

export const createRecipe = (recipe: RecipeItem): Promise<APIResponseType> => {
  return fetch(endpoints.recipe, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...recipe,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const updateRecipe = (recipe: RecipeItem): Promise<APIResponseType> => {
  return fetch(endpoints.recipe, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...recipe }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const deleteIRecipe = (id: string): Promise<APIResponseType> => {
  return fetch(endpoints.recipe, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
