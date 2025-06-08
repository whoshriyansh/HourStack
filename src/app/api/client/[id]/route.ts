import dbConnect from "@/lib/db/ConnectDB";
import { ApiResponse } from "@/types/ApiResponse";
import { getAuthUser } from "@/lib/utils/getAuthUser";
import { NextResponse } from "next/server";
import ClientModel from "@/lib/models/Client.model";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const userId = await getAuthUser();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json(
      { success: false, message: "Invalid Client ID" },
      { status: 400 }
    );
  }

  const client = await ClientModel.findOne({
    _id: params.id,
    createdBy: userId,
  }).lean();

  if (!client) {
    return NextResponse.json(
      { success: false, message: "Client Not Found or Unauthorized" },
      { status: 404 }
    );
  }

  return NextResponse.json<ApiResponse>(
    {
      success: true,
      message: "Client fetched successfully",
      data: client,
    },
    { status: 200 }
  );
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const userId = await getAuthUser();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json(
      { success: false, message: "Invalid Client ID" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const allowedFields = ["name", "budget", "websiteUrl", "tasks", "projects"];
  const updateData: Record<string, any> = {};

  for (const field of allowedFields) {
    if (body[field] !== undefined) updateData[field] = body[field];
  }

  const updatedClient = await ClientModel.findOneAndUpdate(
    { _id: params.id, createdBy: userId },
    updateData,
    { new: true }
  );

  if (!updatedClient) {
    return NextResponse.json(
      { success: false, message: "Client Not Found or Unauthorized" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Client updated successfully",
      data: updatedClient,
    },
    { status: 200 }
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const userId = await getAuthUser();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json(
      { success: false, message: "Invalid Client ID" },
      { status: 400 }
    );
  }

  const deleted = await ClientModel.findOneAndDelete({
    _id: params.id,
    createdBy: userId,
  });

  if (!deleted) {
    return NextResponse.json(
      { success: false, message: "Client Not Found or Unauthorized" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Client deleted successfully",
    },
    { status: 200 }
  );
}
