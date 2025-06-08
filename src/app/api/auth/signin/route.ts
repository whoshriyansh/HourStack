import dbConnect from "@/lib/db/ConnectDB";
import UserModel from "@/lib/models/User.model";
import bcrypt from "bcryptjs";
import { ApiResponse } from "@/types/ApiResponse";
import { NextResponse } from "next/server";
import { generateToken } from "@/lib/utils/jwt";
import { setTokenCookie } from "@/lib/utils/setTokenCookie";

export async function POST(request: Request) {
  //Check DB Connection
  await dbConnect();

  try {
    //1st Step - Take Email and Password from the user
    const { email, password } = await request.json(); //Destructuring the properties on the fly

    //2nd Step - Verify If we have user from the email or not
    const verifyUserWithEmail = await UserModel.findOne({ email });
    if (!verifyUserWithEmail) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "No user found with this email",
        },
        { status: 404 }
      );
    }

    //3rd Step - If we have the user then we'll verify the Pasword and then return a Token and allow user to signin

    const checkIfPasswordIsCorrect = await bcrypt.compare(
      password,
      verifyUserWithEmail.password
    );
    if (!checkIfPasswordIsCorrect) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Password is incorrect",
        },
        { status: 401 }
      );
    }

    //4th Step Everything is fine now returun the response
    const token = generateToken({ userId: verifyUserWithEmail._id });
    let response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Login Successfull",
        data: {
          userId: verifyUserWithEmail._id,
          username: verifyUserWithEmail.username,
          email: verifyUserWithEmail.email,
        },
      },
      { status: 200 }
    );

    response = setTokenCookie(response, token);
    return response;
  } catch (error: any) {
    console.log("SignIn Error: ", error.message);
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
