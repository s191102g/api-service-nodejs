import { IsOptional, IsString } from "class-validator";
import { QueryPaginationRequest } from "../../../../shared/usecase/QueryPaginationRequest";


export class FindAllClientInput extends QueryPaginationRequest{
    @IsString()
    @IsOptional()
    keyword: string;
}