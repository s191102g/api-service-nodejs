import { Inject, Service } from "typedi";
import { IAuthJwtService } from "../../../gateways/services/IAuthJwtService";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { UnauthorizedError } from "../../../shared/exceptions/UnauthorizedError";
import { QueryHandler } from "../../../shared/usecase/QueryHandler";
import { GetUserAuthByJwtQueryOutput } from "./GetAuthByJwtOutput";

@Service()
export class GetAuthByJwtQueryHandler extends QueryHandler<
  string,
  GetUserAuthByJwtQueryOutput
> {
  constructor(
    @Inject("auth_jwt.service")
    private readonly _authJwtService: IAuthJwtService
  ) {
    super();
  }

  async handle(token: string): Promise<GetUserAuthByJwtQueryOutput> {
    if (!token) {
      throw new SystemError(MessageError.PARAM_REQUIRED, "token");
    }

    let payload;
    try {
      payload = this._authJwtService.verify(token);
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new UnauthorizedError(MessageError.PARAM_EXPIRED, "token");
      } else {
        throw new UnauthorizedError(MessageError.PARAM_INVALID, "token");
      }
    }

    if (!payload || !payload.sub || !payload.role) {
      throw new UnauthorizedError(MessageError.PARAM_INVALID, "token payload");
    }

    const result = new GetUserAuthByJwtQueryOutput();
    result.setData({
      userId: payload.sub,
      role: payload.role,
    });
    return result;
  }
}
