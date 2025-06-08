// app/api/tracked-time/route.ts

import dbConnect from "@/lib/db/ConnectDB";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/utils/getAuthUser";
import TrackedTimeModel from "@/lib/models/TrackerTime.model";
import { ApiResponse } from "@/types/ApiResponse";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const userId = await getAuthUser();
    const { name, projects, duration, startedAt, endedAt } =
      await request.json();

    const newTrackedTime = await TrackedTimeModel.create({
      name,
      projects,
      duration,
      startedAt,
      endedAt,
      createdBy: userId,
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Tracked Time created successfully",
        data: newTrackedTime,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating tracked time:", error.message);
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

    const entries = await TrackedTimeModel.find({ createdBy: userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json<ApiResponse>(
      {
        success: true,
        message: "Tracked time entries fetched",
        data: entries,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching tracked times:", error.message);
    return NextResponse.json<ApiResponse>(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
