import dbConnect from "@/lib/db/ConnectDB";
import UserModel from "@/lib/models/User.model";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/utils/getAuthUser";

export async function PATCH(request: Request) {
  await dbConnect();

  try {
    const userId = await getAuthUser();
    const body = await request.json();

    // Allowed fields only — prevent malicious keys
    const allowedFields = ["username", "email", "ratePerHour"];
    const updateData: any = {};

    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updateData[key] = body[key];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid fields to update" },
        { status: 400 }
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
