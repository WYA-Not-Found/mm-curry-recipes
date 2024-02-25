"use client";
import React from "react";
import { deleteIngredient, getIngredientList } from "@/lib/service/ingredient";
import { IngredientItem, IngredientResponseType } from "@/lib/types/ingredient";
import { useEffect, useState } from "react";
import IngredientInputForm from "./IngredientInputForm";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Image from "next/image";

const IngredientList = (): React.JSX.Element => {
  const [ingredients, setIngredients] = useState<IngredientResponseType[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const emptyIngredient = {
    name: "",
    image_url: "",
  };
  const [ingredientData, setIngredientData] =
    useState<IngredientItem>(emptyIngredient);
  const getIngredients = async () => {
    const ingredients: IngredientResponseType[] = await getIngredientList();
    if (ingredients.length > 0) {
      setIngredients(ingredients);
    } else {
      setIngredients([]);
    }
  };

  const onEditIngredient = async (ingredient: IngredientResponseType) => {
    const data = {
      id: ingredient._id,
      name: ingredient.name,
      image_url: ingredient.image_url,
    };
    setIngredientData(data);
    setOpenModal(true);
  };

  const onDeleteIngredient = async (id: string) => {
    const res = await deleteIngredient(id);
    toast(res.message);
    getIngredients();
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Ingredient List</h1>
        <button
          className="btn ml-4"
          onClick={() => {
            setIngredientData(emptyIngredient);
            setOpenModal(true);
          }}
        >
          Create Ingredient
        </button>
      </div>
      <div className="overflow-x-auto w-[1000px]">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              {/* <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th> */}
              <th>name</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ingredients?.map((ingredient: IngredientResponseType) => {
              return (
                <tr key={ingredient._id}>
                  {/* <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th> */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="font-bold">{ingredient.name}</div>
                    </div>
                  </td>
                  <td>
                    <Image
                      src={ingredient.image_url}
                      alt="ingredient image"
                      width={60}
                      height={60}
                    />
                  </td>
                  <th>
                    <button
                      onClick={() => {
                        onEditIngredient(ingredient);
                      }}
                      className="btn btn-ghost btn-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        onDeleteIngredient(ingredient._id);
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
          className="w-full h-full flex justify-center items-center"
          isOpen={openModal}
          onRequestClose={() => {
            setOpenModal(false);
          }}
          contentLabel="Example Modal"
        >
          <IngredientInputForm
            ingredientData={ingredientData}
            onSubmit={() => {
              setOpenModal(false);
              getIngredients();
            }}
          />
        </Modal>
      }
    </div>
  );
};

export default IngredientList;
