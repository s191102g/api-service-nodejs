import { Service } from "typedi";
import { IMailService } from "../../../core/gateways/services/IMailService";
import nodemailer from "nodemailer";

@Service("mail.service")
export class MailService implements IMailService {
  async sendMailVertify(email: string, activeKey: string): Promise<void> {
    var transporter = nodemailer.createTransport({
      // config mail server
      service: "Gmail",
      auth: {
        user: "dolsservicess@gmail.com",
        pass: "afxzatllrwoikkdk",
      },
    });
    var mainOptions = {
      // thiết lập đối tượng, nội dung gửi mail
      from: "UMALL_SERVICE",
      to: `${email}`,
      subject: "XÁC THỰC NGƯỜI DÙNG",
      text: "Hãy sử dụng mã phía dưới để xác thực",
      html: `<p>Mã xác thực của bạn  là : ${activeKey}</p>`,
    };
    transporter.sendMail(mainOptions);
  }
}
