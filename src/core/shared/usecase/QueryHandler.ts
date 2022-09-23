import { IDataResponse } from "./DataResponse";


export abstract class QueryHandler<TIn, TOut extends IDataResponse> {
  abstract handle(
    param: number | string | TIn ,
    param2?: any
  ): Promise<TOut>;
}
