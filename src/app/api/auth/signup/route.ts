// /app/api/auth/signup/route.ts
import dbConnect from "@/lib/db/ConnectDB";
import UserModel from "@/lib/models/User.model";
import { ApiResponse } from "@/types/ApiResponse";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { generateToken } from "@/lib/utils/jwt";
import { setTokenCookie } from "@/lib/utils/setTokenCookie";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, username, password } = await request.json();

    // 1. Validate
    if (!email || !username || !password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Username, email, and password are required",
        },
        { status: 400 }
      );
    }

    // 2. Check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "User already registered with this email",
        },
        { status: 409 }
      );
    }

    // 3. Hash Password
    const hashedPass = await bcrypt.hash(password, 10);

    // 4. Save new user
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPass,
    });

    // 5. Generate Token
    const token = generateToken({ userId: newUser._id });

    // 7. Send Response
    let response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "User registered successfully",
        data: {
          userId: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      },
      { status: 201 }
    );

    response = setTokenCookie(response, token);
    return response;
  } catch (error: any) {
    console.error("Signup Error:", error.message);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
