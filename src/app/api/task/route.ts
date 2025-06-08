import dbConnect from "@/lib/db/ConnectDB";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/utils/getAuthUser";
import TaskModel from "@/lib/models/Task.model";
import { ApiResponse } from "@/types/ApiResponse";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const userId = await getAuthUser();
    const { name, isCompleted } = await request.json();

    const newTask = await TaskModel.create({
      name,
      isCompleted: isCompleted || false,
      createdBy: userId,
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Task created successfully",
        data: newTask,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating task:", error.message);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect();

  try {
    const userId = await getAuthUser();
    const tasks = await TaskModel.find({ createdBy: userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Tasks fetched successfully",
        data: tasks,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching tasks:", error.message);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
