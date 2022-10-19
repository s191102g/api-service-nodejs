import { IDbQueryRunner } from "../database/interfaces/IDbQueryRunner";
import { IRequest } from "../IRequest";
import { UserAuthenticated } from "../UserAuthenticated";


export class HandleOption {
  req: IRequest;
  res: Response;
  userAuth: UserAuthenticated | null;
  queryRunner: IDbQueryRunner | null;
}
