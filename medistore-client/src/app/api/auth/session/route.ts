// app/api/auth/session/route.ts
import userService from "@/components/modules/userService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET() {
  try {
  
    const data = await userService.getSession(); 
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ data: null }, { status: 501 });
  }
}