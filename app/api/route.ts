import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  return NextResponse.json("this is hello world");
}
