"use client";
import { createIngredient, updateIngredient } from "@/lib/service/ingredient";
import { IngredientItem } from "@/lib/types/ingredient";
import { put } from "@vercel/blob";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

interface IngredientPropTypes {
  ingredientData: IngredientItem;
  onSubmit?: () => void;
}

const IngredientInputForm = ({
  ingredientData,
  onSubmit,
}: IngredientPropTypes): React.ReactNode => {
  const imageRef = useRef<HTMLInputElement>(null);

  const [ingredient, setIngredient] = useState<IngredientItem>(ingredientData);

  const reset = () => {
    setIngredient({ name: "", image_url: "" });
  };

  const onChangeInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    var data: IngredientItem = {
      ...ingredientData,
      name: ingredient?.name ?? "",
    };
    data = {
      ...data,
      name: e.currentTarget.value,
    };

    setIngredient(data);
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
    if (ingredient) {
      var res;
      if (ingredient.id) {
        res = await updateIngredient({
          ...ingredient,
          image_url: image ?? ingredient.image_url,
        });
      } else {
        res = await createIngredient({ ...ingredient, image_url: image ?? "" });
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
        <h1 className="pt-4 px-10 font-bold">Add New Ingredient</h1>
        <div className="card-body">
          <form onSubmit={onSubmitForm}>
            <div className="form-control mb-2">
              <div className="label">
                <span className="label-text">name</span>
              </div>
              <input
                onChange={(e) => {
                  onChangeInput(e);
                }}
                value={ingredient?.name}
                type="text"
                placeholder="Ingredient name..."
                className="input input-bordered w-full"
              />
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

export default IngredientInputForm;
