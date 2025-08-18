import { getServerEnv } from "@/shared/constants/config";

const { IS_DEV } = getServerEnv();

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !IS_DEV,
  path: "/",
  sameSite: "lax" as const,
};

export const PAGINATION_LIMIT = "10";
export const PAGINATION_OFFSET = "0";