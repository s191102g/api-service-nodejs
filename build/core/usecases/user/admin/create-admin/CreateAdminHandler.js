"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAdminHandler = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const validator_1 = require("../../../../../utils/validator");
const Admin_1 = require("../../../../domain/entities/user/Admin");
const userEnum_1 = require("../../../../domain/enums/userEnum");
const CommandHandler_1 = require("../../../../shared/usecase/CommandHandler");
const CreateAdminOutput_1 = require("./CreateAdminOutput");
let CreateAdminHandler = class CreateAdminHandler extends CommandHandler_1.CommandHandler {
    constructor(_adminRepository) {
        super();
        this._adminRepository = _adminRepository;
    }
    async handle(param) {
        await (0, validator_1.validateDataInput)(param);
        const data = new Admin_1.Admin();
        data.userName = param.username;
        data.passWord = param.password;
        data.role = userEnum_1.RoleType.Admin;
        data.firstName = "admin";
        const id = await this._adminRepository.create(data);
        const result = new CreateAdminOutput_1.CreateAdminOutput();
        result.setData(id);
        return result;
    }
};
CreateAdminHandler = tslib_1.__decorate([
    (0, typedi_1.Service)(),
    tslib_1.__param(0, (0, typedi_1.Inject)('admin.repository')),
    tslib_1.__metadata("design:paramtypes", [Object])
], CreateAdminHandler);
exports.CreateAdminHandler = CreateAdminHandler;
