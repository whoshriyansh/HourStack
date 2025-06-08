import dbConnect from "@/lib/db/ConnectDB";
import { ApiResponse } from "@/types/ApiResponse";
import { getAuthUser } from "@/lib/utils/getAuthUser";
import { NextResponse } from "next/server";
import ClientModel from "@/lib/models/Client.model";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const userId = await getAuthUser();
    const body = await request.json();

    const newClient = await ClientModel.create({ ...body, createdBy: userId });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Client Created Successfully",
        data: newClient,
      },
      { status: 201 }
    );
  } catch (error: any) {
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

export async function GET() {
  await dbConnect();
  try {
    const userId = await getAuthUser();
    const clients = await ClientModel.find({ createdBy: userId }).lean();

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Clients fetched successfully",
        data: clients,
      },
      { status: 200 }
    );
  } catch (error: any) {
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
