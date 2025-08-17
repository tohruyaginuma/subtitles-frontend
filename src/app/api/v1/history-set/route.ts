export const runtime = "nodejs";

import { getServerEnv } from "@/shared/constants/config";
import { apiClient } from "@/bff/lib/api-client";
import { networkErrorResponse } from "@/bff/lib/response";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { API_ROOT_V1 } = getServerEnv();

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ?? "10";
  const offset = searchParams.get("offset") ?? "0";

  try {
    const response = await apiClient(
      `${API_ROOT_V1}/history-set/?limit=${limit}&offset=${offset}`
    );
    const jsonResponse = await response.json();

    const newResponse = {
      ...jsonResponse,
      next: jsonResponse.next ? `/api${jsonResponse.next}` : undefined,
      previous: jsonResponse.previous
        ? `/api${jsonResponse.previous}`
        : undefined,
    };

    return NextResponse.json(newResponse);
  } catch (error) {
    return networkErrorResponse(error);
  }
}

export async function POST(request: Request) {
  const { API_ROOT_V1 } = getServerEnv();

  try {
    const { title } = await request.json();
    return await apiClient(`${API_ROOT_V1}/history-set/`, {
      method: "POST",
      body: { title },
    });
  } catch (error) {
    return networkErrorResponse(error);
  }
}
