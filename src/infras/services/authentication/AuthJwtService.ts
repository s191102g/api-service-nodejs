import { IncomingHttpHeaders } from "http";


import jwt from "jsonwebtoken";
import { Service } from "typedi";


@Service()
export class AuthJwtService  {
  getTokenFromHeader(headers: IncomingHttpHeaders): string {
    let token = "";
    if (headers.authorization) {
      const parts = headers.authorization.split(" ");
      token = parts.length === 2 && parts[0] === "Bearer" ? parts[1] : "";
    }
    return token;
  }

  sign(userId: string, roleId: string, type: any): string {
    return jwt.sign(
      {
        roleId,
        type,
      },
      'AUTH_SECRET_OR_PRIVATE_KEY',
      {
        subject: userId,
        expiresIn: 24 * 60 * 60,
        issuer: 'tt',
        audience: `33`,
        algorithm: 'AUTH_SIGNATURE',
      } as jwt.SignOptions
    );
  }

  verify(token: string) {
    return jwt.verify(token, 'AUTH_SECRET_OR_PUBLIC_KEY', {
      issuer: 'tt',
      audience: `33`,
      algorithm: 'AUTH_SIGNATURE',
    } as jwt.VerifyOptions) ;
  }
}
