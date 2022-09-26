import { Sang } from "../../../domain/entities/sang/Sang";
import { IBaseRepository } from "../../../shared/database/interfaces/IBaseRepository";




export interface ISangRepository extends IBaseRepository< string,Sang >{
}