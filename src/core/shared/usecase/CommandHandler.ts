import { IDataResponse } from "./DataResponse";


export abstract class CommandHandler<
  TIn,
  TOut extends IDataResponse 
> {
  abstract handle(
    param: number | string | TIn ,
    param2?: TIn 
  ): Promise<TOut>;
}
