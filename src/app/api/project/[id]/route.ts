import dbConnect from "@/lib/db/ConnectDB";
import { ApiResponse } from "@/types/ApiResponse";
import { getAuthUser } from "@/lib/utils/getAuthUser";
import { NextResponse } from "next/server";
import ProjectModel from "@/lib/models/Project.model";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  const projectId = await params.id;

  try {
    const userId = await getAuthUser();
    const project = await ProjectModel.find({
      _id: projectId,
      createdBy: userId,
    });

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project Not Found or Unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Project Fetched Successfully",
        data: project,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error while Updating the project: ", error.message);
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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const userId = await getAuthUser();
    const body = await request.json();
    const allowedFields = ["name", "color", "tasks"];
    const updateData: Record<string, any> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) updateData[field] = body[field];
    }

    const updated = await ProjectModel.findOneAndUpdate(
      { _id: params.id, createdBy: userId },
      updateData,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Project Not Found or Unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Project Updated Successfully",
        data: updated,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();

  try {
    const userId = await getAuthUser();
    const deleted = await ProjectModel.findOneAndDelete({
      _id: params.id,
      createdBy: userId,
    });

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Project Not Found or Unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Project Deleted Successfully",
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
