import { IsString } from "class-validator";




export class CreateClientInput{
   @IsString()
   firstName:string;

   // @IsString()
   // @IsOptional()
   // lastName:string;

   @IsString()
   email:string;

   @IsString()
   password:string;

   @IsString()
   image: string;
}