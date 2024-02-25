"use client";
import { createCategory, updateCategory } from "@/lib/service/category";
import { CategoryItem } from "@/lib/types/category";
import { put } from "@vercel/blob";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

interface CategoryPropTypes {
  categoryData: CategoryItem;
  onSubmit?: () => void;
}

const CategoryInputForm = ({
  categoryData,
  onSubmit,
}: CategoryPropTypes): React.ReactNode => {
  const imageRef = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState<CategoryItem>(categoryData);

  const reset = () => {
    setCategory({ title: "", description: "", image_url: "" });
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

  const onImageUpload = async (): Promise<string | void> => {
    const files = imageRef.current?.files;
    if (files) {
      if (files.length > 0) {
        const imageBlob = await put(files[0].name, files[0], {
          access: "public",
          token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
        });
        return imageBlob.url;
      }
    } else {
      console.log("please upload valid file");
    }
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const image = await onImageUpload();
    if (category) {
      var res;
      if (category.id) {
        res = await updateCategory({
          ...category,
          image_url: image ?? category.image_url,
        });
      } else {
        res = await createCategory({ ...category, image_url: image ?? "" });
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
            <div className="form-control mb-2">
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
            <div className="form-control mb-2">
              <div className="label">
                <span className="label-text">Description (optional)</span>
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
            <div className="form-control mb-2">
              <div className="label">
                <span className="label-text">Image</span>
              </div>
              <input
                ref={imageRef}
                type="file"
                className="file-input w-full max-w-xs"
              />
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
