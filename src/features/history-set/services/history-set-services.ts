import { apiClient } from "@/client/lib/api";
import { ApiResult, PaginationResponse } from "@/client/types/api";
import { HistorySetResponse } from "@/features/history-set/types/history-set";
import { API_ROUTES } from "@/client/constants/api";
import { DeleteResponse } from "@/client/types/api";

export const listHistorySetService = ({
  nextUri,
}: {
  nextUri: string;
}): Promise<ApiResult<PaginationResponse<HistorySetResponse>>> => {
  return apiClient<PaginationResponse<HistorySetResponse>>(nextUri, {
    method: "GET",
  });
};

export const retrieveHistorySetService = (
  id: string
): Promise<ApiResult<HistorySetResponse>> => {
  return apiClient<HistorySetResponse>(API_ROUTES.historySetId(id), {
    method: "GET",
  });
};

export const createHistorySetService = ({
  title,
}: {
  title: string;
}): Promise<ApiResult<HistorySetResponse>> => {
  return apiClient<HistorySetResponse>(API_ROUTES.historySet, {
    method: "POST",
    body: { title },
  });
};

export const patchHistorySetService = (
  id: string,
  title: string
): Promise<ApiResult<HistorySetResponse>> => {
  return apiClient<HistorySetResponse>(API_ROUTES.historySetId(id), {
    method: "PATCH",
    body: { title },
  });
};

export const deleteHistorySetService = (
  id: string
): Promise<ApiResult<DeleteResponse>> => {
  return apiClient<DeleteResponse>(API_ROUTES.historySetId(id), {
    method: "DELETE",
  });
};
