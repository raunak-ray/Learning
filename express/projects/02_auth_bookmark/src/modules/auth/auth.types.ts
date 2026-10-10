export type JwtPayload = {
  sub: number,
  email: string,
}

export type DecodedJwt = JwtPayload & {
  iat: number;
  eat: number;
}

export type JwtTokenType = "access" | "refresh";
