import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../utils/validator";
import { WorkSpace } from "../../../domain/entities/workspace/WorkSpace";
import { IClientRepository } from "../../../gateways/repositories/user/IClientRepository";
import { IWorkSpaceRepository } from "../../../gateways/repositories/workspace/IWorkSpaceRepository";
import { ICryptoService } from "../../../gateways/services/ICryptoService";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../shared/usecase/CommandHandler";
import { AddMemberWorkspaceInput } from "./AddMemberWorkspaceInput";
import { AddMemberWorkspaceOutput } from "./AddMemberWorkspaceOutput";



@Service()
export class AddMemberWorkspaceHandler extends CommandHandler<
AddMemberWorkspaceInput,
AddMemberWorkspaceOutput
>{
    constructor(
        @Inject("workspace.repository")
        private readonly _workspaceRepository: IWorkSpaceRepository,
        @Inject('client.repository')
        private readonly  _clientRepository: IClientRepository,
        @Inject('crypto.service')
        private readonly _cryptoService: ICryptoService
    ){
        super()
    }

    async handle(idUser:string, param:  AddMemberWorkspaceInput): Promise<AddMemberWorkspaceOutput> {
        await validateDataInput(param)

        const client = await this._clientRepository.getByEmail( this._cryptoService.encrypt(param.emailUser) )
        if(!client){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }
        const workspace = await this._workspaceRepository.getByUserAndId(idUser, param.idWorkSpace);
        if(!workspace){
            throw new SystemError(MessageError.PARAM_INCORRECT,"workspace")
        }
        if(workspace.member.includes(client.id)){
            throw new SystemError(MessageError.PARAM_EXISTED,"member")
        }

        workspace.member.push(client.id);
        const data = new WorkSpace()
        data.member = workspace.member;

        const hasSuccess = await this._workspaceRepository.update(workspace.id, data)
        const result =new AddMemberWorkspaceOutput()
        result.setData(hasSuccess);
        return result;
    }
}