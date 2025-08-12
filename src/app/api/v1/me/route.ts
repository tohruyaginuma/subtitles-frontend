import { getServerEnv } from "@/shared/constants/config";
import { apiClient } from "@/bff/lib/api-client";
import { networkErrorResponse } from "@/bff/lib/response";

export async function GET() {
  const { API_ROOT_V1 } = getServerEnv();

  try {
    return await apiClient(`${API_ROOT_V1}/me/`);
  } catch (error) {
    return networkErrorResponse(error);
  }
}
