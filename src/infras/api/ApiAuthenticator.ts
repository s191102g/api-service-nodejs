import { Action } from "routing-controllers";
import { IAuthJwtService } from "../../core/gateways/services/IAuthJwtService";
import Container from "typedi";
import { IRequest } from "../../core/shared/IRequest";
import { UnauthorizedError } from "../../core/shared/exceptions/UnauthorizedError";
import { GetAuthByJwtQueryHandler } from "../../core/usecases/user/getAuthByJwt/GetAuthByJwtHandler";
import { AccessDeniedError } from "../../core/shared/exceptions/AccessDeniedError";
import { UserAuthenticated } from "../../core/shared/UserAuthenticated";

export class ApiAuthenticator {
  static authorizationChecker = async (
    action: Action,
    role: string[]
  ): Promise<boolean> => {
    const reqExt = action.request as IRequest;
    const authJwtService = Container.get<IAuthJwtService>("auth_jwt.service");
    const token = authJwtService.getTokenFromHeader(reqExt.headers);
    if (!token) {
      throw new UnauthorizedError();
    }

    const getAuthByJwtQueryHandler = Container.get(GetAuthByJwtQueryHandler);
    const { data } = await getAuthByJwtQueryHandler.handle(token);
    if (
      role &&
      role.length &&
      !role.some((role) => data && role === data.role)
    ) {
      throw new AccessDeniedError();
    }

    reqExt.userAuth = new UserAuthenticated(data.userId, data.role);
    return true;
  };

  static currentUserChecker = (action: Action): UserAuthenticated | null => {
    const reqExt = action.request as IRequest;
    return reqExt.userAuth;
  };
}
