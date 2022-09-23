"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSangCommandHandle = void 0;
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const SangRepository_1 = require("../../../../../infras/data/repositories/sang/SangRepository");
const Sang_1 = require("../../../../domain/entities/sang/Sang");
const CommandHandler_1 = require("../../../../shared/usecase/CommandHandler");
const CreateSangCommandOutput_1 = require("./CreateSangCommandOutput");
let CreateSangCommandHandle = class CreateSangCommandHandle extends CommandHandler_1.CommandHandler {
    constructor() {
        super();
        this._sangRepository = typeorm_typedi_extensions_1.Container.get(SangRepository_1.SangRepository);
    }
    async handle(param) {
        // await validateDataInput(param)
        const data = new Sang_1.Sang();
        data.name = param.name;
        const id = await this._sangRepository.create(data);
        const result = new CreateSangCommandOutput_1.CreateSangCommandOutput();
        result.setData(id);
        return result;
    }
};
CreateSangCommandHandle = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], CreateSangCommandHandle);
exports.CreateSangCommandHandle = CreateSangCommandHandle;
