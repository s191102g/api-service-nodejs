
export interface IMailService{
    sendMailVertify(email:string, activeKey:string): void;
    sendMailNotify(email: string, task: string, dealine:string): Promise<void> ;
}