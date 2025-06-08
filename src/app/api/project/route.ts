import dbConnect from "@/lib/db/ConnectDB";
import { ApiResponse } from "@/types/ApiResponse";
import { getAuthUser } from "@/lib/utils/getAuthUser";
import { NextResponse } from "next/server";
import ProjectModel from "@/lib/models/Project.model";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const userId = await getAuthUser();
    const { name, color, tasks } = await request.json();

    const newProject = await ProjectModel.create({
      name,
      color,
      tasks,
      createdBy: userId,
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Project Created Successfully",
        data: newProject,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error Creating Project:", error.message);
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

    const projects = await ProjectModel.find({ createdBy: userId });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Project Fetched Successfully",
        data: projects,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error while Getting All Projects: ", error.message);
    return NextResponse.json<ApiResponse>(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
