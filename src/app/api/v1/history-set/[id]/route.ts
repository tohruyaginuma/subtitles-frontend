import { getServerEnv } from "@/shared/constants/config";
import { apiClient } from "@/bff/lib/api-client";
import { networkErrorResponse } from "@/bff/lib/response";
import { RouteCtx } from "@/bff/types/bff";

export async function GET(request: Request, { params }: RouteCtx) {
  const { API_ROOT_V1 } = getServerEnv();

  try {
    const { id } = await params;
    return await apiClient(`${API_ROOT_V1}/history-set/${id}/`);
  } catch (error) {
    return networkErrorResponse(error);
  }
}

export async function DELETE(request: Request, { params }: RouteCtx) {
  const { API_ROOT_V1 } = getServerEnv();

  try {
    const { id } = await params;
    return await apiClient(`${API_ROOT_V1}/history-set/${id}/`, {
      method: "DELETE",
    });
  } catch (error) {
    return networkErrorResponse(error);
  }
}

export async function PATCH(request: Request, { params }: RouteCtx) {
  const { API_ROOT_V1 } = getServerEnv();

  try {
    const { title } = await request.json();
    const { id } = await params;
    return await apiClient(`${API_ROOT_V1}/history-set/${id}/`, {
      method: "PUT",
      body: { title },
    });
  } catch (error) {
    return networkErrorResponse(error);
  }
}
