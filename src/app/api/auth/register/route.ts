import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import db from "@/libs/db";
import { User } from "@prisma/client";
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. Check if user already exists (email or username)
    const emailFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (emailFound) {
      return NextResponse.json(new Error("Email already in use"), {
        status: 400,
      });
    }

    const userFound = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (userFound) {
      return NextResponse.json(new Error("User already exists"), {
        status: 400,
      });
    }

    // 2. Hash password

    const hashPassword = await bcrypt.hash(data.password, 10);

    // 3. Create user

    type NewUser = Omit<User, "id" | "createdAt" | "updatedAt">;

    const newUser: NewUser = {
      username: data.username,
      email: data.email,
      password: hashPassword,
    };

    const newUserResponse = await db.user.create({
      data: newUser,
    });

    // data that can be returned to the client
    const secureUser = {
      id: newUserResponse.id,
      username: newUserResponse.username,
      email: newUserResponse.email,
    };

    return NextResponse.json(secureUser);
  } catch (error: any) {
    return NextResponse.json(new Error(error.message), { status: 500 });
  }
}
