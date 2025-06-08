import dbConnect from "@/lib/db/ConnectDB";
import UserModel from "@/lib/models/User.model";
import { ApiResponse } from "@/types/ApiResponse";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { generateToken } from "@/lib/utils/jwt";
import { setTokenCookie } from "@/lib/utils/setTokenCookie";

export async function POST(request: Request) {
  //We have to check everytimi if server is connected or not if not we'll connect it again and it connected then we'll proceed as in NextJS the server is not up all the time so we have to do this to check.
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

    // 3. If everything is Okay then first we hash the password and continue to save the user to database
    const hashedPass = await bcrypt.hash(password, 10);

    // 4. Save new user with the hashed password
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPass,
    });

    // 5. Generate Token for the user for future req
    const token = generateToken({ userId: newUser._id });

    // 7. Send Response to the user
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
    console.error("Signup Error: ", error.message);
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
