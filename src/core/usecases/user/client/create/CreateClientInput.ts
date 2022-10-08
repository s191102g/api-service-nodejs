import { IsString } from "class-validator";




export class CreateClientInput{
   @IsString()
   firstName:string;

   @IsString()
   lastName:string;

   @IsString()
   email:string;

   @IsString()
   userName:string;

   @IsString()
   passWord:string;
}