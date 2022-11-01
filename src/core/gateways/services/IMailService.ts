
export interface IMailService{
    sendMailVertify(email:string, activeKey:string): void;
}