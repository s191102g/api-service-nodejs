import { Service } from "typedi";
import { WorkSpace } from "../../../../core/domain/entities/workspace/WorkSpace";
import { IWorkSpaceRepository } from "../../../../core/gateways/repositories/workspace/IWorkSpaceRepository";
import { WorkSpaceDb } from "../../entities/workspace/WorkSpaceDb";
import { WORKSPACE_SCHEMA } from "../../schemas/workspace/WorkSpaceSchema";
import { BaseRepository } from "../base/BaseRepository";





@Service("workspace.repository")
export class WorkspaceRepository extends BaseRepository<
string, WorkSpace, WorkSpaceDb
> implements IWorkSpaceRepository
 {
      constructor(){
        super(WorkSpaceDb,WORKSPACE_SCHEMA)
      }
 
      async findByUser(userId:string): Promise<WorkSpace[]>{
        const query = this.repository
        .createQueryBuilder(WORKSPACE_SCHEMA.TABLE_NAME)
        .where(
          `${WORKSPACE_SCHEMA.TABLE_NAME}.${WORKSPACE_SCHEMA.COLUMNS.USER_ID} = :userId `,
          { userId }
        );
  
      const result = await query.getMany();
      return result.map((e)=> e.toEntity());
      }

      async checkNameExist(
        name: string,
      ): Promise<boolean> {
        let query = this.repository
          .createQueryBuilder(WORKSPACE_SCHEMA.TABLE_NAME)
          .where(
            `lower(${WORKSPACE_SCHEMA.TABLE_NAME}.${WORKSPACE_SCHEMA.COLUMNS.NAME}) = lower(:name)`,
            { name }
          );
    
        const result = await query.getOne();
        return !!result ;
      }

      async getAll(): Promise<WorkSpace[]>{
        let query = this.repository
        .createQueryBuilder(WORKSPACE_SCHEMA.TABLE_NAME)

        const result = await query.getMany()
        return result.map((e) => e.toEntity())
      }


      async getByUserAndId(idUser:string, idWorkspace:string): Promise<WorkSpace | null>{
           let query = this.repository
           .createQueryBuilder(WORKSPACE_SCHEMA.TABLE_NAME)

           .where(
              `${WORKSPACE_SCHEMA.TABLE_NAME}.${WORKSPACE_SCHEMA.COLUMNS.USER_ID} = :idUser `,
              {idUser}
           )
           .andWhere(
             `${WORKSPACE_SCHEMA.TABLE_NAME}.${WORKSPACE_SCHEMA.COLUMNS.ID} = :idWorkspace`,
             {idWorkspace}
           )

           const result = await query.getOne();
           return result ? result.toEntity() : null;
      }

}