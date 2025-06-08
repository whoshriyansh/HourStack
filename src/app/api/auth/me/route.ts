import dbConnect from "@/lib/db/ConnectDB";
import UserModel from "@/lib/models/User.model";
import { getAuthUser } from "@/lib/utils/getAuthUser";
import { ApiResponse } from "@/types/ApiResponse";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();

  try {
    const userId = await getAuthUser();

    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "User not Found" },
        { status: 401 }
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "User Info Fetched Correctly",
        data: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error while geting User Info: ", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
