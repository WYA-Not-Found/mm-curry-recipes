import { NextRequest, NextResponse } from "next/server";
import {
  _createIngredient,
  _deleteIngredient,
  _getIngredientList,
  _updateIngredient,
} from "@/lib/controller/ingredient";
import { IngredientItem } from "@/lib/types/ingredient";

export async function GET() {
  const ingredients = await _getIngredientList();
  return NextResponse.json({ status: 200, data: ingredients });
}

export async function POST(request: NextRequest) {
  const { name, image_url }: IngredientItem = await request.json();

  if (name && image_url) {
    await _createIngredient({
      name,
      image_url: image_url,
    });
    return NextResponse.json({
      message: "Successfully created new ingredient!",
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
  const { id, name, image_url }: IngredientItem = await request.json();
  if (id && name && image_url) {
    await _updateIngredient(id, { name, image_url });
    return NextResponse.json({
      message: "Successfully update ingredient!",
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
    await _deleteIngredient(id);
    return NextResponse.json({
      message: "Successfully removed ingredient!",
      status: 200,
    });
  } else {
    return NextResponse.json({
      message: "Something is wrong!",
      status: 400,
    });
  }
}
