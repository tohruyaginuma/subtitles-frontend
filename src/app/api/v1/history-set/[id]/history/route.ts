import { API_ROOT_V1 } from "@/shared/constants/config";
import { apiClient } from "@/bff/lib/api-client";
import { networkErrorResponse } from "@/bff/lib/response";
import { RouteCtx } from "@/bff/types/bff";

export async function POST(request: Request, { params }: RouteCtx) {
  const { content } = await request.json();
  const { id } = await params;
  try {
    return await apiClient(`${API_ROOT_V1}/history-set/${id}/history/`, {
      method: "POST",
      body: { content },
    });
  } catch (error) {
    return networkErrorResponse(error);
  }
}

export async function GET(request: Request, { params }: RouteCtx) {
  try {
    const { id } = await params;
    return await apiClient(`${API_ROOT_V1}/history-set/${id}/history/`);
  } catch (error) {
    return networkErrorResponse(error);
  }
}
