import { NextResponse } from "next/server";
import Post from "@/lib/models/Post";

export async function GET() {
  const posts = await Post.find();
  return NextResponse.json(posts);
}

export async function POST() {
  const post = Post.create({
    title: "hello",
    description: "this is description",
  });
  return NextResponse.json({ post }, { status: 200 });
}
