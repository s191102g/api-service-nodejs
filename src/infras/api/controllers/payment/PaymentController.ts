import { Service } from "typedi";
import { Authorized, CurrentUser,  JsonController, Post} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { RoleType } from "../../../../core/domain/enums/userEnum";
import { UserAuthenticated } from "../../../../core/shared/UserAuthenticated";
import { CreatePaymentHandler } from "../../../../core/usecases/payment/create-payment/CreatePaymentHandler";
import { CreatePaymentOutput } from "../../../../core/usecases/payment/create-payment/CreatePaymentOutput";

@Service()
@JsonController("/v1/payment")
export class PaymentController{
    constructor(
        private readonly _createPaymentHandler: CreatePaymentHandler
    ){}

    @Post("/")
    @OpenAPI({summary: " Create transaction with paypal"})
    @Authorized(RoleType.Client)
    @ResponseSchema(CreatePaymentOutput)
    async create(

        @CurrentUser()  userAuth: UserAuthenticated
    ): Promise<CreatePaymentOutput> {
        return await this._createPaymentHandler.handle(userAuth.userId)
    }

}