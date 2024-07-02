import { NextResponse } from 'next/server';
import {users} from "@/constants/users";

export async function GET() {
  return NextResponse.json(users);
}