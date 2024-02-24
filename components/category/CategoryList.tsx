"use client";
import React from "react";
import {
  deleteCategory,
  getCategoryList,
  updateCategory,
} from "@/lib/service/category";
import { CategoryItem, CategoryResponseType } from "@/lib/types/category";
import { useEffect, useState } from "react";
import CategoryInputForm from "./CategoryInputForm";
import Modal from "react-modal";
import { toast } from "react-toastify";

const CategoryList = (): React.JSX.Element => {
  const [categories, setCategories] = useState<CategoryResponseType[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [categoryData, setCategory] = useState<CategoryItem>({
    title: "",
    description: "",
  });
  const getCategories = async () => {
    const categories: CategoryResponseType[] = await getCategoryList();
    if (categories.length > 0) {
      setCategories(categories);
    }
  };

  const onEditCategory = async (category: CategoryResponseType) => {
    const data = {
      id: category._id,
      title: category.title,
      description: category.description,
    };
    setCategory(data);
    setOpenModal(true);
  };

  const onDeleteCategory = async (id: string) => {
    const res = await deleteCategory(id);
    toast(res.message);
    getCategories();
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Category List</h1>
        <button
          className="btn ml-4"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Create Category
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
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category: CategoryResponseType) => {
              return (
                <tr key={category._id}>
                  {/* <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th> */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="font-bold">{category.title}</div>
                    </div>
                  </td>
                  <td>{category.description}</td>
                  <th>
                    <button
                      onClick={() => {
                        onEditCategory(category);
                      }}
                      className="btn btn-ghost btn-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        onDeleteCategory(category._id);
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
          <CategoryInputForm
            categoryData={categoryData}
            onSubmit={() => {
              setOpenModal(false);
              getCategories();
            }}
          />
        </Modal>
      }
    </div>
  );
};

export default CategoryList;
