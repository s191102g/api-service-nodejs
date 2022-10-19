
import { Request } from "express";
import { UserAuthenticated } from "./UserAuthenticated";

export interface IRequest extends Request {

  userAuth: UserAuthenticated | null;
}
