import { IncomingHttpHeaders } from "http";


import jwt from "jsonwebtoken";
import { Service } from "typedi";
import { IAuthJwtService } from "../../../core/gateways/services/IAuthJwtService";


@Service('auth_jwt.service')
export class AuthJwtService implements IAuthJwtService {
  getTokenFromHeader(headers: IncomingHttpHeaders): string {
    let token = "";
    if (headers.authorization) {
      const parts = headers.authorization.split(" ");
      token = parts.length === 2 && parts[0] === "Bearer" ? parts[1] : "";
    }
    return token;
  }

  sign(userId: string, role: string): string {
    return jwt.sign(
      {
        userId,
        role,
  
      },
      'AUTH_SECRET_OR_PRIVATE_KEY',
      {
        subject: userId,
        expiresIn: 24 * 60 * 60,
        issuer: 'tt',
        audience: `33`
      } as jwt.SignOptions
    );
  }

  verify(token: string) {
    return jwt.verify(token, 'AUTH_SECRET_OR_PRIVATE_KEY', {
      issuer: 'tt',
      audience: `33`
    } as jwt.VerifyOptions) ;
  }
}
