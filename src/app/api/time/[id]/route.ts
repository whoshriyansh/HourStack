// app/api/tracked-time/[id]/route.ts

import dbConnect from "@/lib/db/ConnectDB";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/utils/getAuthUser";
import TrackedTimeModel from "@/lib/models/TrackerTime.model";
import { ApiResponse } from "@/types/ApiResponse";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const userId = await getAuthUser();

  try {
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const entry = await TrackedTimeModel.findOne({
      _id: params.id,
      createdBy: userId,
    });

    if (!entry) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Entry not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>(
      { success: true, message: "Entry fetched", data: entry },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching entry:", error.message);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const userId = await getAuthUser();
  const body = await request.json();

  try {
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const allowedFields = [
      "name",
      "projects",
      "duration",
      "startedAt",
      "endedAt",
    ];
    const updateData: Record<string, any> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) updateData[field] = body[field];
    }

    const updatedEntry = await TrackedTimeModel.findOneAndUpdate(
      { _id: params.id, createdBy: userId },
      updateData,
      { new: true }
    );

    if (!updatedEntry) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Entry not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>(
      { success: true, message: "Entry updated", data: updatedEntry },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating tracked time:", error.message);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const userId = await getAuthUser();

  try {
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const deleted = await TrackedTimeModel.findOneAndDelete({
      _id: params.id,
      createdBy: userId,
    });

    if (!deleted) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Entry not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>(
      { success: true, message: "Entry deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting tracked time:", error.message);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
