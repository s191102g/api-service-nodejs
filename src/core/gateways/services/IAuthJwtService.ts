import { IncomingHttpHeaders } from "http";

export interface IJwtPayload {
  sub: string; // Subject
  exp: number; // Expiration time
  iat: number; // Issued at
  iss: string; // Issuer
  aud: string; // Audience
}

export interface IJwtPayloadExtend extends IJwtPayload {
  role: string;
}

export interface IAuthJwtService {
  getTokenFromHeader(headers: IncomingHttpHeaders): string;

  sign(userId: string, role: string): string;

  verify(token: string): IJwtPayloadExtend;
}
