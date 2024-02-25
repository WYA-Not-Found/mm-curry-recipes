import { NextRequest, NextResponse } from "next/server";
import {
  _createRecipe,
  _deleteRecipe,
  _getRecipeList,
  _updateRecipe,
} from "@/lib/controller/recipe";
import { RecipeItem } from "@/lib/types/recipe";

export async function GET() {
  const ingredients = await _getRecipeList();
  return NextResponse.json({ status: 200, data: ingredients });
}

export async function POST(request: NextRequest) {
  const {
    title,
    category,
    image_url,
    images,
    description,
    time,
    ingredients,
  }: RecipeItem = await request.json();

  if (title && image_url && category && description && time && ingredients) {
    await _createRecipe({
      title,
      description,
      category,
      time,
      images,
      image_url,
      ingredients,
    });
    return NextResponse.json({
      message: "Successfully created new recipe!",
      status: 200,
    });
  } else {
    return NextResponse.json({
      message: "Please fill all data",
      status: 400,
    });
  }
}
export async function PUT(request: NextRequest) {
  const {
    id,
    title,
    category,
    image_url,
    images,
    description,
    time,
    ingredients,
  }: RecipeItem = await request.json();
  if (
    id &&
    title &&
    image_url &&
    description &&
    category &&
    time &&
    ingredients
  ) {
    await _updateRecipe(id, {
      title,
      description,
      category,
      time,
      images,
      image_url,
      ingredients,
    });
    return NextResponse.json({
      message: "Successfully update recipe!",
      status: 200,
    });
  } else {
    return NextResponse.json({
      message: "Something is wrong!",
      status: 400,
    });
  }
}
export async function DELETE(request: NextRequest) {
  const { id }: { id: string } = await request.json();
  if (id) {
    await _deleteRecipe(id);
    return NextResponse.json({
      message: "Successfully removed recipe!",
      status: 200,
    });
  } else {
    return NextResponse.json({
      message: "Something is wrong!",
      status: 400,
    });
  }
}
