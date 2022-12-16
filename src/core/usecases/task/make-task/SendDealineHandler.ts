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
      // handler dealine
        const arr1 = param.dealine.split(" ");
        const arr1b = arr1.slice(0,5);
        const finalDeadline = arr1b.join(" ")
          
        // handler date
        const dateNow = new Date();
        const date = dateNow.toString();
        const arr2 = date.split(" ");
        const arr2b = arr2.slice(0,5);       
        const arrtime = arr2b[4].split(":")
        const hh = Number(arrtime[0]) + 7;
         arrtime.splice(0,1,String(hh));
        const fnTime = arrtime.join(":")
         arr2b.splice(4,1,fnTime)

         const finalDate = arr2b.join(" ");

         console.log(
          finalDeadline,
          finalDate
         );
         
        
        if(finalDate === finalDeadline){ 
            clearItv();
        }
        // console.log(date);
        
         
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