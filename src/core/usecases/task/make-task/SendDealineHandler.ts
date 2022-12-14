import Container from "typedi";
import { IClientRepository } from "../../../gateways/repositories/user/IClientRepository";
import { IMailService } from "../../../gateways/services/IMailService";
import { MessageError } from "../../../shared/exceptions/message/MessageError";
import { SystemError } from "../../../shared/exceptions/SystemError";


export class SendDealineHandler {

  static async handler(param){
    const _mailService = Container.get<IMailService>('mail.service');
    const _clientRepository = Container.get<IClientRepository>('client.repository');
    const interval = setInterval(async ()=>{
        const dateNow = new Date();
        const date = dateNow.toString();
        const dealine = param.dealine;
        
        if(date === dealine){ 
            clearItv();
        }
         
     },1000);
     

     const clearItv = async () =>{
        clearInterval(interval);
        const dealine = param.dealine;
        const user = await _clientRepository.getById(param.userid);
        if(!user){
            throw new SystemError(MessageError.DATA_NOT_FOUND)
        }
        await _mailService.sendMailNotify(user.email, param.data.title, dealine)
     } 
   
    
  }
}