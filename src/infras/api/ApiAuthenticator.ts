
// import { Action } from "routing-controllers";
// import Container from "typedi";
// import { UnauthorizedError } from "../../core/shared/exceptions/UnauthorizedError";
// import { IRequest, IRequest } from "../../core/shared/request/IRequest";

export class ApiAuthenticator {
  static authorizationChecker = async (
    // action: Action,
    // roleIds: string[]
  ): Promise<boolean> => {
    // const reqExt = action.request as IRequest;
    // const authJwtService = Container.get<IAuthJwtService>("auth_jwt.service");
    // const token = authJwtService.getTokenFromHeader(reqExt.headers);
    // if (!token) {
    //   throw new UnauthorizedError();
    // }

    // const handleOption = new HandleOption();
    // handleOption.req = reqExt;
    // handleOption.trace = reqExt.trace;

    // const getUserAuthByJwtQueryHandler = Container.get(
    //   GetUserAuthByJwtQueryHandler
    // );
    // const { data } = await getUserAuthByJwtQueryHandler.handle(
    //   token,
    //   handleOption
    // );
    // if (
    //   roleIds &&
    //   roleIds.length &&
    //   !roleIds.some((roleId) => data && roleId === data.roleId)
    // ) {
    //   throw new AccessDeniedError();
    // }

    // reqExt.userAuth = new UserAuthenticated(
    //   data.userId,
    //   data.roleId,
    //   data.type
    // );
    return true;
  };

  // static currentUserChecker = (action: Action): string | null => {
  //   // const reqExt = action.request as IRequest;
  //   // return reqExt.userAuth;
  // };

  static currentUserChecker = () => {
    // const reqExt = action.request as IRequest;
    // return reqExt.userAuth;
    return true
  };
}
