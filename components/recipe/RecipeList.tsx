"use client";
import React from "react";
import { deleteIRecipe, getRecipeList } from "@/lib/service/recipe";
import { useEffect, useState } from "react";
import RecipeInputForm from "./RecipeInputForm";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Image from "next/image";
import { RecipeItem, RecipeResponseType } from "@/lib/types/recipe";
import { formatRichText } from "@/lib/utils/helper";

const RecipeList = (): React.JSX.Element => {
  const [recipes, setRecipes] = useState<RecipeResponseType[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const emptyRecipe = {
    title: "",
    description: "",
    category: { id: "", name: "" },
    image_url: "",
    images: [],
    time: "",
    ingredients: [],
  };
  const [recipeData, setRecipeData] = useState<RecipeItem>(emptyRecipe);
  const getRecipes = async () => {
    const recipes: RecipeResponseType[] = await getRecipeList();
    if (recipes.length > 0) {
      setRecipes(recipes);
    } else {
      setRecipes([]);
    }
  };
  const onEditRecipe = async (recipe: RecipeResponseType) => {
    const data = {
      id: recipe._id,
      title: recipe.title,
      description: recipe.description,
      category: recipe.category,
      image_url: recipe.image_url,
      images: recipe.images as Array<string>,
      time: recipe.time,
      ingredients: recipe.ingredients,
    };
    setRecipeData(data);
    setOpenModal(true);
  };

  const onDeleteRecipe = async (id: string) => {
    const res = await deleteIRecipe(id);
    toast(res.message);
    getRecipes();
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Recipe List</h1>
        <button
          className="btn ml-4"
          onClick={() => {
            setRecipeData(emptyRecipe);
            setOpenModal(true);
          }}
        >
          Create Recipe
        </button>
      </div>
      <div className="overflow-x-auto w-[1000px]">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Image</th>
              <th>Images</th>
              <th>Time</th>
              <th>Ingredients</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recipes?.map((recipe, index) => {
              return (
                <tr key={recipe._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="font-bold">{recipe.title}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <div className="font-bold">
                        {formatRichText(recipe.description).slice(0, 20)}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="font-bold">{recipe.category.name}</div>
                    </div>
                  </td>
                  <td>
                    <Image
                      src={recipe.image_url as string}
                      alt="recipe image"
                      width={40}
                      height={40}
                    />
                  </td>
                  <td>
                    <div className="flex gap-1">
                      {recipe.images.map((image, index) => {
                        return (
                          <Image
                            key={index}
                            src={image as string}
                            alt="recipe image"
                            width={40}
                            height={40}
                          />
                        );
                      })}
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center ">
                      <div className="font-bold text-center">{recipe.time}</div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      {recipe.ingredients.map((ingredient) => {
                        return (
                          <div key={ingredient.id} className="font-bold">
                            {ingredient.name}
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <th>
                    <button
                      onClick={() => {
                        onEditRecipe(recipe);
                      }}
                      className="btn btn-ghost btn-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        onDeleteRecipe(recipe._id);
                      }}
                      className="btn btn-ghost btn-xs"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {
        <Modal
          className="w-full flex justify-center items-center"
          isOpen={openModal}
          onRequestClose={() => {
            setOpenModal(false);
          }}
          contentLabel="Example Modal"
        >
          <RecipeInputForm
            recipeData={recipeData}
            onSubmit={() => {
              setOpenModal(false);
              getRecipes();
            }}
          />
        </Modal>
      }
    </div>
  );
};

export default RecipeList;
