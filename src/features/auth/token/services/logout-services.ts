import { apiClient } from "@/client/lib/api";
import { ApiResult } from "@/client/types/api";
import { DeleteResponse } from "@/client/types/api";
import { API_ROUTES } from "@/client/constants/api";

export const logoutService = (): Promise<ApiResult<DeleteResponse>> => {
  return apiClient<DeleteResponse>(API_ROUTES.tokenLogout, {
    method: "POST",
  });
};
