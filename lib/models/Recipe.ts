import mongoose from "mongoose";

const { Schema } = mongoose;

const recipeSchema = new Schema(
  {
    category: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    images: {
      type: Array<string>,
    },
    time: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);
