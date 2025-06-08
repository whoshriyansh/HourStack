import dbConnect from "@/lib/db/ConnectDB";
import UserModel from "@/lib/models/User.model";
import { getAuthUser } from "@/lib/utils/getAuthUser";
import { ApiResponse } from "@/types/ApiResponse";
import { NextResponse } from "next/server";

export async function DELETE() {
  await dbConnect();

  try {
    const userId = await getAuthUser();

    await UserModel.findByIdAndDelete(userId);

    const response = NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Account deleted successfully",
      },
      { status: 201 }
    );

    // Optional: Clear cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.log("Error while deleting Account: ", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
