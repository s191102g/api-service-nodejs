import { Inject, Service } from "typedi";
import { validateDataInput } from "../../../../../utils/validator";
import { Client } from "../../../../domain/entities/user/Client";
import { IClientRepository } from "../../../../gateways/repositories/user/IClientRepository";
import { IAuthJwtService } from "../../../../gateways/services/IAuthJwtService";
import { ICryptoService } from "../../../../gateways/services/ICryptoService";
import { IDbContext } from "../../../../shared/database/interfaces/IDbContext";
import { MessageError } from "../../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../../shared/exceptions/SystemError";
import { CommandHandler } from "../../../../shared/usecase/CommandHandler";
import { HandleOption } from "../../../../shared/usecase/HandleOption";
import { CreateBoardInput } from "../../../board/create/CreateBoardInput";
import { CreateBoardWhenCreateClientHandler } from "../../../board/create/CreateBoardwhenCreateClientHandler";
import { CreateWorkspaceInput } from "../../../workspace/create/CreateWorkspaceInput";
import { CreateWorkspaceWhenCreateClientHandler } from "../../../workspace/create/CreateWorkspaceWhenCreateClientHandler";
import { CreateClientInput } from "./CreateClientInput";
import { CreateClientOutput } from "./CreateClientOutput";

@Service()
export class CreateClientHandler extends CommandHandler<
  CreateClientInput,
  CreateClientOutput
> {
  constructor(
    @Inject("client.repository")
    private readonly _clientRepository: IClientRepository,

    @Inject("crypto.service")
    private readonly _cryptoService: ICryptoService,
    @Inject("db.context") private readonly _dbContext: IDbContext,
    @Inject()
    private readonly _createWorkspace: CreateWorkspaceWhenCreateClientHandler,
    @Inject()
    private readonly _createBoard: CreateBoardWhenCreateClientHandler,
    @Inject("auth_jwt.service")
    private readonly _authJwtService: IAuthJwtService,
  ) {
    super();
  }

  async handle(param: CreateClientInput): Promise<CreateClientOutput> {
    await validateDataInput(param);

    const data = new Client();
    data.firstName = param.firstName;
    data.passWord = param.password;
    data.avatar = param.image;
    const client = await this._clientRepository.getByEmail(
      this._cryptoService.encrypt(param.email)
    );
    if (!client) {
      throw new SystemError(MessageError.DATA_NOT_FOUND);
    }

    if (client.activeKey) {
      throw new SystemError(MessageError.DATA_INVALID);
    }
    const worksapce = new CreateWorkspaceInput();
    worksapce.name = `${data.firstName} WorkSpace`;

    return await this._dbContext
      .getConnection()
      .runTransaction(async (queryRunner) => {
        const handleOption = new HandleOption();
        handleOption.queryRunner = queryRunner;
        const idCreated =  await this._createWorkspace.handle(client.id, worksapce, handleOption);
        
        const board = new CreateBoardInput();
        board.title = "First board"
        board.workspaceId = idCreated.data;
        board.description = '<h2><a href="https://emojipedia.org/travel-places">🚀</a>Xin chào bạn, lại là DOLS đây !<a href="https://emojipedia.org/travel-places">🚀</a></h2><p>&nbsp;</p><h2><a href="https://emojipedia.org/four-leaf-clover/">🍀</a>Đây là nơi mà bạn có thể ghi bất cứ thứ gì mà bạn muốn…</h2><p>&nbsp;</p><h2><a href="https://emojipedia.org/new-years-eve/">🎊</a>Chỉ có cái bạn không nghĩ ra chứ không có cái DOLS không có&nbsp;</h2>'
        board.position = 0
        board.icon = '✍️',
        board.favourite = 'no',
        board.favouritePosition = 0
        board.templateId = '674e1995-80a0-467a-b48f-312502538210'
        await this._createBoard.handle(board, handleOption);

        await this._clientRepository.update(client.id, data, handleOption.queryRunner);
        const token = this._authJwtService.sign(
            client.id,
            client.role
          );
        const result = new CreateClientOutput();
        result.setData(token);
        return result;
      });
  }
}
