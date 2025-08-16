export type Options = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  timeoutMs?: number;
  isAuth?: boolean;
};

export type ResponseError = {
  code?: string;
  message: string;
  details?: unknown;
};

export type DeleteResponse = null;

export type ApiResult<T> = T | { error: ResponseError };

export type PaginationResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};
