import { NextResponse } from "next/server";

export function setTokenCookie<T>(
  response: NextResponse<T>,
  token: string
): NextResponse<T> {
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return response;
}
