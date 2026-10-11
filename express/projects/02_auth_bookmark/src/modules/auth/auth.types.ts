export type JwtPayload = {
  sub: number,
  email: string,
}

export type DecodedJwt = JwtPayload & {
  iat: number;
  exp: number;
}

export type JwtTokenType = "access" | "refresh";

export type SafeUser = {
  id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

export type UserResponse = SafeUser & {
  accessToken: string;
  refreshToken: string;
}