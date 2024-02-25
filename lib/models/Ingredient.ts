import mongoose from "mongoose";

const { Schema } = mongoose;

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Ingredient ||
  mongoose.model("Ingredient", ingredientSchema);
