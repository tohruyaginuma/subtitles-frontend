export type LoginResponse = {
  access: string;
  refresh: string;
  email: string;
};

export type RefreshTokenResponse = {
  access: string;
};
