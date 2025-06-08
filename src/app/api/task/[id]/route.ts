import dbConnect from "@/lib/db/ConnectDB";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/utils/getAuthUser";
import TaskModel from "@/lib/models/Task.model";
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
        { success: false, message: "Invalid Task ID" },
        { status: 400 }
      );
    }

    const task = await TaskModel.findOne({
      _id: params.id,
      createdBy: userId,
    });

    if (!task) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Task not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>(
      { success: true, message: "Task fetched successfully", data: task },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching task:", error.message);
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
        { success: false, message: "Invalid Task ID" },
        { status: 400 }
      );
    }

    const allowedFields = ["name", "isCompleted"];
    const updateData: Record<string, any> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) updateData[field] = body[field];
    }

    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: params.id, createdBy: userId },
      updateData,
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Task not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>(
      { success: true, message: "Task updated", data: updatedTask },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating task:", error.message);
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
        { success: false, message: "Invalid Task ID" },
        { status: 400 }
      );
    }

    const deletedTask = await TaskModel.findOneAndDelete({
      _id: params.id,
      createdBy: userId,
    });

    if (!deletedTask) {
      return NextResponse.json<ApiResponse>(
        { success: false, message: "Task not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>(
      { success: true, message: "Task deleted" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting task:", error.message);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
