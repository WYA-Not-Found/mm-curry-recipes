import { NextRequest, NextResponse } from "next/server";
import {
  _createCategory,
  _deleteCategory,
  _getCategoryList,
  _updateCategory,
} from "@/lib/controller/category";
import { CategoryItem } from "@/lib/types/category";

export async function GET() {
  const categories = await _getCategoryList();
  return NextResponse.json({ status: 200, data: categories });
}

export async function POST(request: NextRequest) {
  const { title, description, image_url }: CategoryItem = await request.json();

  if (title && image_url) {
    await _createCategory({
      title,
      description,
      image_url: image_url,
    });
    return NextResponse.json({
      message: "Successfully created new category!",
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
  const { id, title, description, image_url }: CategoryItem =
    await request.json();
  if (id && title && image_url) {
    await _updateCategory(id, { title, description, image_url });
    return NextResponse.json({
      message: "Successfully update category!",
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
    await _deleteCategory(id);
    return NextResponse.json({
      message: "Successfully removed category!",
      status: 200,
    });
  } else {
    return NextResponse.json({
      message: "Something is wrong!",
      status: 400,
    });
  }
}
