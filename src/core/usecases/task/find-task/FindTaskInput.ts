import { IsOptional, IsString } from "class-validator";
import { QueryPaginationRequest } from "../../../shared/usecase/QueryPaginationRequest";

export class FindTaskInput extends QueryPaginationRequest {
    @IsOptional()
    keyword: string | null;
    @IsString()
    dataId: string;
}