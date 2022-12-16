
export interface IMailService{
    sendMailVertify(email:string, activeKey:string): void;
    sendMailForgotPass(email:string, pass:string): void;
    sendMailNotify(email: string, task: string, dealine:string): Promise<void> ;
}