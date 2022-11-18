import { IsOptional, IsString } from "class-validator";
import { QueryPaginationRequest } from "../../../shared/usecase/QueryPaginationRequest";


export class FindTemplateInput extends QueryPaginationRequest{
    @IsString()
    @IsOptional()
    keyword: string;
}