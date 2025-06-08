import dbConnect from "@/lib/db/ConnectDB";
import { NextResponse } from "next/server";
import UserModel from "@/lib/models/User.model";
import { getAuthUser } from "@/lib/utils/getAuthUser";
import { ApiResponse } from "@/types/ApiResponse";
import bcrypt from "bcryptjs";

export async function PATCH(request: Request) {
  await dbConnect();

  try {
    //1st Step - We have to check the token if user has token and it is correct
    const userId = await getAuthUser();

    //2nd Step - We are taking the current Pass and new Pass from the user
    const { currentPassword, newPassword } = await request.json();

    //3rd Step - We are finding if we have a user from this id or not.
    const user = await UserModel.findById(userId);
    if (!user) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "User not Found" },
        { status: 401 }
      );
    }

    //4th Step - We'll check if the current password is right or wrong
    const checkIfCurrPassIsCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!checkIfCurrPassIsCorrect) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Current Password is not correct" },
        { status: 401 }
      );
    }

    //5th Step - We have to save the user with new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error: any) {
    console.error("Error while Updating Password: ", error.message);
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
