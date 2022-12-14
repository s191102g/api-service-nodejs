import { Service } from "typedi";
import { IPaypalService } from "../../../core/gateways/services/IPaypalService";
import * as paypal from 'paypal-rest-sdk'
import { CLIENT_ID, CLIENT_SECRET, MODE } from "../../../configs/Configuration";

@Service("paypal.service")
export class PaypalService implements IPaypalService{
    private _paypal = paypal

    constructor(){
        this._paypal.configure({
            client_id:CLIENT_ID ,
            client_secret: CLIENT_SECRET,
            mode:MODE
        })
    }
    pay(){
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/success",
                "cancel_url": "http://localhost:3000/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Iphone 4S",
                        "sku": "001",
                        "price": "25.00",
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": "25.00"
                },
                "description": "Iphone 4S cũ giá siêu rẻ"
            }]
        };
    
        this._paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                console.log(payment);
                
    
            }
        });
    }
}