"use client";
import { createRecipe, updateRecipe } from "@/lib/service/recipe";
import {
  RecipeCategoryType,
  RecipeIngredientType,
  RecipeItem,
} from "@/lib/types/recipe";
import { put } from "@vercel/blob";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import { getIngredientList } from "@/lib/service/ingredient";
import { getCategoryList } from "@/lib/service/category";
import { formatRichText } from "@/lib/utils/helper";

interface RecipePropTypes {
  recipeData: RecipeItem;
  onSubmit?: () => void;
}

const IngredientInputForm = ({
  recipeData,
  onSubmit,
}: RecipePropTypes): React.ReactNode => {
  const imageRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const [editor, setEditor] = useState<EditorState>();

  const [recipe, setRecipe] = useState<RecipeItem>(recipeData);
  const [selectedIngredients, setSelectedIngredients] = useState<any>([]);
  const [optionIngredients, setOptionIngredients] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>({});
  const [optionCategories, setOptionCategories] = useState<any>({});
  const emptyRecipe: RecipeItem = {
    title: "",
    description: "",
    category: { id: "", name: "" },
    image_url: "",
    images: [],
    time: "",
    ingredients: [],
  };

  const reset = () => {
    setRecipe(emptyRecipe);
  };

  const onChangeInput = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    var data;
    switch (type) {
      case "title":
        data = {
          ...recipe,
          title: e.currentTarget.value,
        };
        break;
      case "time":
        data = {
          ...recipe,
          time: e.currentTarget.value,
        };
        break;
      default:
        data = recipe;
        break;
    }
    setRecipe(data);
  };

  const onSelectOptions = (option: any, type: string) => {
    var data;
    switch (type) {
      case "ingredient":
        const ingredients = option.map((item: any): RecipeIngredientType => {
          return { id: item.value, name: item.label };
        });
        data = {
          ...recipe,
          ingredients: ingredients,
        };
        break;

      case "category":
        data = {
          ...recipe,
          category: { id: option.value, name: option.label },
        };
        break;

      default:
        data = recipe;
        break;
    }
    setRecipe(data);
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

  const onImagesUpload = async (): Promise<Array<string> | void> => {
    const files = imagesRef.current?.files;
    if (files) {
      if (files.length > 0) {
        var uploadedFiles = [];
        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          const imageBlob = await put(file.name, file, {
            access: "public",
            token: process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN,
          });
          uploadedFiles.push(imageBlob.url);
        }

        return uploadedFiles;
      }
    } else {
      console.log("please upload valid files");
    }
  };

  const onDescriptionEdit = (editValue: EditorState) => {
    const editContent = convertToHTML(editValue.getCurrentContent());
    const data: RecipeItem = {
      ...recipe,
      description: editContent,
    };
    setRecipe(data);
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("editor");
    const editorState = editor?.getCurrentContent();
    if (editorState) {
      console.log(convertToHTML(editorState));
    }
    const image = await onImageUpload();
    const images = await onImagesUpload();
    if (recipe) {
      var res;
      if (recipe.id) {
        res = await updateRecipe({
          ...recipe,
          image_url: image ?? recipe.image_url,
          images: images ?? recipe.images,
        });
      } else {
        res = await createRecipe({
          ...recipe,
          image_url: image ?? "",
          images: images ?? [""],
        });
      }
      toast(res.message);
      reset();
      onSubmit && onSubmit();
    } else {
      onSubmit && onSubmit();
    }
  };

  const getIngredients = async () => {
    const ingredients = await getIngredientList();
    const options = ingredients.map((ingredient) => {
      return {
        value: ingredient._id,
        label: ingredient.name.toUpperCase(),
      };
    });
    setOptionIngredients(options);
  };
  const getCategories = async () => {
    const categories = await getCategoryList();
    const options = categories.map((category) => {
      return {
        value: category._id,
        label: category.title.toUpperCase(),
      };
    });
    setOptionCategories(options);
  };

  useEffect(() => {
    getIngredients();
    getCategories();
  }, []);

  return (
    <div className="card w-[1000px] bg-base-100 shadow-xl">
      <h1 className="pt-4 px-10 font-bold">Add New Recipe</h1>
      <div
        className="card-body h-[650px] overflow-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        <form onSubmit={onSubmitForm}>
          <div className="form-control mb-2">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              onChange={(e) => {
                onChangeInput(e, "title");
              }}
              value={recipe?.title}
              type="text"
              placeholder="Ingredient name..."
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex">
            <div className="form-control mb-2">
              <div className="label">
                <span className="label-text">Image</span>
              </div>
              <input
                ref={imageRef}
                onChange={onImageUpload}
                type="file"
                className="file-input w-full max-w-xs"
              />
            </div>
            <div className="form-control mb-2">
              <div className="label">
                <span className="label-text">Additional Images</span>
              </div>
              <input
                ref={imagesRef}
                onChange={onImagesUpload}
                multiple
                type="file"
                className="file-input w-full max-w-xs"
              />
            </div>
          </div>
          <div className="form-control mb-2">
            <div className="label">
              <span className="label-text">Time (Hour/Minutes)</span>
            </div>
            <input
              onChange={(e) => {
                onChangeInput(e, "time");
              }}
              value={recipe?.time}
              type="text"
              placeholder="Estimated time..."
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mb-2">
            <div className="label">
              <span className="label-text">Categories</span>
            </div>
            <Select
              styles={{
                option: (base) => ({
                  backgroundColor: "#FFF",
                  color: "#030303",
                  paddingLeft: 5,
                  paddingRight: 5,
                }),
              }}
              defaultValue={
                { value: recipe.category.id, label: recipe.category.name } ??
                selectedCategory
              }
              onChange={(options) => onSelectOptions(options, "category")}
              options={optionCategories}
            />
          </div>
          <div className="form-control mb-2">
            <div className="label">
              <span className="label-text">Ingredients</span>
            </div>
            <Select
              styles={{
                option: (base) => ({
                  backgroundColor: "#FFF",
                  color: "#030303",
                  paddingLeft: 5,
                  paddingRight: 5,
                }),
              }}
              isMulti
              defaultValue={
                recipe.ingredients.map((ingredient) => {
                  return { value: ingredient.id, label: ingredient.name };
                }) ?? selectedIngredients
              }
              onChange={(options) => onSelectOptions(options, "ingredient")}
              options={optionIngredients}
            />
          </div>
          <div className="form-control mb-2">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <Editor
              defaultEditorState={EditorState.createWithContent(
                ContentState.createFromText(
                  formatRichText(recipe.description) ?? ""
                )
              )}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onDescriptionEdit}
            />
          </div>
          <button type="submit" className="btn mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default IngredientInputForm;
