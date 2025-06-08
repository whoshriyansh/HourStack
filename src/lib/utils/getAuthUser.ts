import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getAuthUser(): Promise<string> {
  const cookieStore = await cookies(); // ✅ await it
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const decoded = verifyToken(token) as { userId: string };
    return decoded.userId;
  } catch (error: any) {
    throw new Error("Invalid Token");
  }
}
