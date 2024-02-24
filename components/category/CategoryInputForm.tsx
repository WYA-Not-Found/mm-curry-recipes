"use client";
import { createCategory, updateCategory } from "@/lib/service/category";
import { CategoryItem } from "@/lib/types/category";
import { title } from "process";
import { useState } from "react";
import { toast } from "react-toastify";

interface CategoryPropTypes {
  categoryData: CategoryItem;
  onSubmit?: () => void;
}

const CategoryInputForm = ({
  categoryData,
  onSubmit,
}: CategoryPropTypes): React.ReactNode => {
  const [category, setCategory] = useState<CategoryItem>(categoryData);

  const reset = () => {
    setCategory({ title: "", description: "" });
  };

  const onChangeInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    var data: CategoryItem = {
      ...categoryData,
      title: category?.title ?? "",
      description: category?.description ?? "",
    };
    switch (type) {
      case "title":
        data = {
          ...data,
          title: e.currentTarget.value,
        };
        break;
      case "description":
        data = {
          ...data,
          description: e.currentTarget.value,
        };
        break;
      default:
        break;
    }
    setCategory(data);
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (category) {
      var res;
      if (category.id) {
        res = await updateCategory(category);
      } else {
        res = await createCategory(category);
      }
      toast(res.message);
      reset();
      onSubmit && onSubmit();
    } else {
      onSubmit && onSubmit();
    }
  };

  return (
    <div>
      <div className="card w-[1000px] bg-base-100 shadow-xl">
        <h1 className="pt-4 px-10 font-bold">Add New Category</h1>
        <div className="card-body">
          <form onSubmit={onSubmitForm}>
            <div className="form-control">
              <div className="label">
                <span className="label-text">Title</span>
              </div>
              <input
                onChange={(e) => {
                  onChangeInput(e, "title");
                }}
                value={category?.title}
                type="text"
                placeholder="Category title..."
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                onChange={(e) => {
                  onChangeInput(e, "description");
                }}
                value={category?.description}
                className="textarea textarea-bordered"
                placeholder="Category descripton..."
              ></textarea>
            </div>
            <button type="submit" className="btn mt-4">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryInputForm;
