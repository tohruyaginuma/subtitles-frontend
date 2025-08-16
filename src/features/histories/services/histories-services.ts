import { ApiResult, PaginationResponse } from "@/client/types/api";
import { HistoryResponse } from "@/features/histories/types/histories";
import { API_ROUTES } from "@/client/constants/api";
import { apiClient } from "@/client/lib/api";

export const listHistoryService = (
  id: string
): Promise<ApiResult<PaginationResponse<HistoryResponse>>> => {
  return apiClient<PaginationResponse<HistoryResponse>>(
    API_ROUTES.history(id),
    {
      method: "GET",
    }
  );
};

export const createHistoryService = ({
  id,
  content,
}: {
  id: string;
  content: string;
}): Promise<ApiResult<HistoryResponse>> => {
  return apiClient<HistoryResponse>(API_ROUTES.history(id), {
    method: "POST",
    body: { content },
  });
};
