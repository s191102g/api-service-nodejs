import { Service } from "typedi";
import { IMailService } from "../../../core/gateways/services/IMailService";
import nodemailer from "nodemailer";
import { SystemError } from "../../../core/shared/exceptions/SystemError";
import { MessageError } from "../../../core/shared/exceptions/message/MessageError";

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
      html: `
      
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
    <meta name="format-detection" content="telephone=no" />

    <style type="text/css">
        body {
        -webkit-text-size-adjust: 100% !important;
        -ms-text-size-adjust: 100% !important;
        -webkit-font-smoothing: antialiased !important;
        }
        .email-logo{
            width: 100px;
            height: auto;
        }
        img {
        border: 0 !important;
        outline: none !important;
        }
        p {
        margin: 0px !important;
        padding: 0px !important;
        }
        table {
        border-collapse: collapse;
        }
        table * {
            font-family: Arial, sans-serif;
        }
        td, a, span {
        border-collapse: collapse;
        mso-line-height-rule: exactly;
        }
        td[class="em_main_padding"] {
            padding: 60px 30px !important;
        }
        td[class="em_text_pb"]{
            padding-bottom: 20px;
        }
    </style>
    <style media="only screen and (max-width:480px)" type="text/css">
        @media only screen and (max-width:480px) {
            td[class="em_main_padding"] {
            padding: 30px 30px !important;
            }
            td[class="em_footer_padding"] {
            padding: 15px 30px !important;
            }
            td[class="em_header_padding"] {
            padding: 20px 30px !important;
            }
            td[class="em_text_pb"]{
                padding-bottom: 15px;
            }
            span[class="fs_heading"] {
                font-size: 20px !important;
            }
            span[class="fs_normal"] {
                font-size: 14px !important;
            }
            table[class="em_main_width"] {
                width: 100%;
            }
        }
    </style>
  </head>
  <body style="margin:0px; padding:20px 0px; background:#E5E5E5;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 50px;">
        <tbody>
            <!-- === BEGIN HEADER === -->  
            <tr class="em_row">
                <td>
                    <table style="max-width: 600px; width: 100% !important;" cellpadding="0" cellspacing="0" border="0" align="center" bgcolor="#ffffff">
                        <tbody>
                            <tr>
                                <td class="em_header_padding" valign="middle" align="center" style="width: 100%; padding-top: 35px; padding-bottom: 35px;">
                                    <a href="" target="_blank" ">
                                    <img src="cid:logo.png" class="email-logo" alt="" />
                                    </a>
                                 
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <!-- === END HEADER === -->  
            
            <!-- === BEGIN BODY === --> 
            <tr class="em_row">
                <td>
                    <table style="max-width: 600px; width: 100% !important;" cellpadding="0" cellspacing="0" border="0" align="center" bgcolor="#FFF6E9">
                        <tbody>
                            <tr>
                                <td valign="top" class="em_main_padding" style="padding: 60px 30px;">
                                    <table align="center" class="em_main_width" style="width: 72.5%;" border="0" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td align="center" valign="middle" style="color: #000000; padding-bottom: 35px; padding-top: 20px;">
                                                    <span class="fs_heading" style="font-size: 28px; line-height: 100%; font-weight: 400;">Cảm ơn vì bạn đã chọn Dols</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" valign="middle" style="color: #000000; padding-bottom: 20px;">
                                                                                                     
                                                    <span class="fs_normal" style="font-size: 16px; line-height: 20px; font-weight: 400;">Mã xác thực của bạn là ${activeKey}</span>
                                                </td>
                                            </tr>
                                      
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <!-- === END BODY === -->  

            <!-- === BEGIN FOOTER === -->
            <tr class="em_row">
                <td>
                    <table style="max-width: 600px; width: 100% !important" align="center" bgcolor="#ffffff" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td class="em_footer_padding" style="padding-top: 30px; padding-bottom: 30px;">
                                    <table align="center" width="100%">
                                        <tbody>
                                            <tr>
                                                <td align="center" style="font-size: 12px; font-weight: 400; text-align: center; color: #308085">© 2022 
                                                    <a href="<%- product.link %>" target="_blank" style="color: #308085; font-weight: 400;">Dols</a>
                                                    . All rights reserved.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <!-- === END FOOTER === -->
        </tbody>
     </table>
  </body>
</html>
      `,
      attachments: [{
        filename: 'logo.png',
        path: 'https://firebasestorage.googleapis.com/v0/b/dols-a767c.appspot.com/o/images%2Flogo%20lightt.pngrc-upload-1670742588085-5?alt=media&token=ffe7f319-2af9-40de-acf0-696ad259b2ff',
        cid: "logo.png"
    }]
    };
    transporter.sendMail(mainOptions, (err,infor)=>{
        if(err){
            throw new SystemError(MessageError.SOMETHING_WRONG)
        }else{
            console.log(infor);
            
        }
    });
  }


  async sendMailNotify(email: string, task: string, dealine:string): Promise<void> {
    var transporter = nodemailer.createTransport({
      // config mail server
      service: "Gmail",
      auth: {
        user: "dolsnotification@gmail.com",
        pass: "roaavzpkwsrzwzxh",
      },
    });
    var mainOptions = {
      // thiết lập đối tượng, nội dung gửi mail
      from: "UMALL_SERVICE",
      to: `${email}`,
      subject: "THÔNG BÁO DEALINE TASK",
      text: "Dols nhắc task",
      html: `
      
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
    <meta name="format-detection" content="telephone=no" />

    <style type="text/css">
        body {
        -webkit-text-size-adjust: 100% !important;
        -ms-text-size-adjust: 100% !important;
        -webkit-font-smoothing: antialiased !important;
        }
        .email-logo{
            width: 100px;
            height: auto;
        }
        img {
        border: 0 !important;
        outline: none !important;
        }
        p {
        margin: 0px !important;
        padding: 0px !important;
        }
        table {
        border-collapse: collapse;
        }
        table * {
            font-family: Arial, sans-serif;
        }
        td, a, span {
        border-collapse: collapse;
        mso-line-height-rule: exactly;
        }
        td[class="em_main_padding"] {
            padding: 60px 30px !important;
        }
        td[class="em_text_pb"]{
            padding-bottom: 20px;
        }
    </style>
    <style media="only screen and (max-width:480px)" type="text/css">
        @media only screen and (max-width:480px) {
            td[class="em_main_padding"] {
            padding: 30px 30px !important;
            }
            td[class="em_footer_padding"] {
            padding: 15px 30px !important;
            }
            td[class="em_header_padding"] {
            padding: 20px 30px !important;
            }
            td[class="em_text_pb"]{
                padding-bottom: 15px;
            }
            span[class="fs_heading"] {
                font-size: 20px !important;
            }
            span[class="fs_normal"] {
                font-size: 14px !important;
            }
            table[class="em_main_width"] {
                width: 100%;
            }
        }
    </style>
  </head>
  <body style="margin:0px; padding:20px 0px; background:#E5E5E5;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 50px;">
        <tbody>
            <!-- === BEGIN HEADER === -->  
            <tr class="em_row">
                <td>
                    <table style="max-width: 600px; width: 100% !important;" cellpadding="0" cellspacing="0" border="0" align="center" bgcolor="#ffffff">
                        <tbody>
                            <tr>
                                <td class="em_header_padding" valign="middle" align="center" style="width: 100%; padding-top: 35px; padding-bottom: 35px;">
                                    <a href="" target="_blank" ">
                                    <img src="cid:logo.png" class="email-logo" alt="" />
                                    </a>
                                 
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <!-- === END HEADER === -->  
            
            <!-- === BEGIN BODY === --> 
            <tr class="em_row">
                <td>
                    <table style="max-width: 600px; width: 100% !important;" cellpadding="0" cellspacing="0" border="0" align="center" bgcolor="#FFF6E9">
                        <tbody>
                            <tr>
                                <td valign="top" class="em_main_padding" style="padding: 60px 30px;">
                                    <table align="center" class="em_main_width" style="width: 72.5%;" border="0" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td align="center" valign="middle" style="color: #000000; padding-bottom: 35px; padding-top: 20px;">
                                                    <span class="fs_heading" style="font-size: 28px; line-height: 100%; font-weight: 400;">Dealine tới rồi Phải làm ngay thôi!</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" valign="middle" style="color: #000000; padding-bottom: 20px;">
                                                                                                     
                                                    <span class="fs_normal" style="font-size: 16px; line-height: 20px; font-weight: 400;">Bạn cần thực hiện ${task} vào ${dealine}</span>
                                                </td>
                                            </tr>
                                      
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <!-- === END BODY === -->  

            <!-- === BEGIN FOOTER === -->
            <tr class="em_row">
                <td>
                    <table style="max-width: 600px; width: 100% !important" align="center" bgcolor="#ffffff" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td class="em_footer_padding" style="padding-top: 30px; padding-bottom: 30px;">
                                    <table align="center" width="100%">
                                        <tbody>
                                            <tr>
                                                <td align="center" style="font-size: 12px; font-weight: 400; text-align: center; color: #308085">© 2022 
                                                    <a href="<%- product.link %>" target="_blank" style="color: #308085; font-weight: 400;">Dols</a>
                                                    . All rights reserved.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <!-- === END FOOTER === -->
        </tbody>
     </table>
  </body>
</html>
      `,
      attachments: [{
        filename: 'logo.png',
        path: 'https://firebasestorage.googleapis.com/v0/b/dols-a767c.appspot.com/o/images%2Flogo%20lightt.pngrc-upload-1670742588085-5?alt=media&token=ffe7f319-2af9-40de-acf0-696ad259b2ff',
        cid: "logo.png"
    }]
    };
    transporter.sendMail(mainOptions, (err,infor)=>{
        if(err){
            throw new SystemError(MessageError.SOMETHING_WRONG)
        }else{
            console.log(infor);
            
        }
    });
  }


  async sendMailForgotPass(email: string, pass: string): Promise<void> {
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
      subject: "MẬT KHẨU RESET MỚI",
      text: "Hãy sử dụng mã phía dưới để xác thực",
      html: `
      
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
    <meta name="format-detection" content="telephone=no" />

    <style type="text/css">
        body {
        -webkit-text-size-adjust: 100% !important;
        -ms-text-size-adjust: 100% !important;
        -webkit-font-smoothing: antialiased !important;
        }
        .email-logo{
            width: 100px;
            height: auto;
        }
        img {
        border: 0 !important;
        outline: none !important;
        }
        p {
        margin: 0px !important;
        padding: 0px !important;
        }
        table {
        border-collapse: collapse;
        }
        table * {
            font-family: Arial, sans-serif;
        }
        td, a, span {
        border-collapse: collapse;
        mso-line-height-rule: exactly;
        }
        td[class="em_main_padding"] {
            padding: 60px 30px !important;
        }
        td[class="em_text_pb"]{
            padding-bottom: 20px;
        }
    </style>
    <style media="only screen and (max-width:480px)" type="text/css">
        @media only screen and (max-width:480px) {
            td[class="em_main_padding"] {
            padding: 30px 30px !important;
            }
            td[class="em_footer_padding"] {
            padding: 15px 30px !important;
            }
            td[class="em_header_padding"] {
            padding: 20px 30px !important;
            }
            td[class="em_text_pb"]{
                padding-bottom: 15px;
            }
            span[class="fs_heading"] {
                font-size: 20px !important;
            }
            span[class="fs_normal"] {
                font-size: 14px !important;
            }
            table[class="em_main_width"] {
                width: 100%;
            }
        }
    </style>
  </head>
  <body style="margin:0px; padding:20px 0px; background:#E5E5E5;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 50px;">
        <tbody>
            <!-- === BEGIN HEADER === -->  
            <tr class="em_row">
                <td>
                    <table style="max-width: 600px; width: 100% !important;" cellpadding="0" cellspacing="0" border="0" align="center" bgcolor="#ffffff">
                        <tbody>
                            <tr>
                                <td class="em_header_padding" valign="middle" align="center" style="width: 100%; padding-top: 35px; padding-bottom: 35px;">
                                    <a href="" target="_blank" ">
                                    <img src="cid:logo.png" class="email-logo" alt="" />
                                    </a>
                                 
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <!-- === END HEADER === -->  
            
            <!-- === BEGIN BODY === --> 
            <tr class="em_row">
                <td>
                    <table style="max-width: 600px; width: 100% !important;" cellpadding="0" cellspacing="0" border="0" align="center" bgcolor="#FFF6E9">
                        <tbody>
                            <tr>
                                <td valign="top" class="em_main_padding" style="padding: 60px 30px;">
                                    <table align="center" class="em_main_width" style="width: 72.5%;" border="0" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td align="center" valign="middle" style="color: #000000; padding-bottom: 35px; padding-top: 20px;">
                                                    <span class="fs_heading" style="font-size: 28px; line-height: 100%; font-weight: 400;">Hãy sử dụng mật khẩu mới để đăng nhập vào Dols</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" valign="middle" style="color: #000000; padding-bottom: 20px;">
                                                                                                     
                                                    <span class="fs_normal" style="font-size: 16px; line-height: 20px; font-weight: 400;">Mật khẩu mới của bạn là ${pass}</span>
                                                </td>
                                            </tr>
                                      
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <!-- === END BODY === -->  

            <!-- === BEGIN FOOTER === -->
            <tr class="em_row">
                <td>
                    <table style="max-width: 600px; width: 100% !important" align="center" bgcolor="#ffffff" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td class="em_footer_padding" style="padding-top: 30px; padding-bottom: 30px;">
                                    <table align="center" width="100%">
                                        <tbody>
                                            <tr>
                                                <td align="center" style="font-size: 12px; font-weight: 400; text-align: center; color: #308085">© 2022 
                                                    <a href="<%- product.link %>" target="_blank" style="color: #308085; font-weight: 400;">Dols</a>
                                                    . All rights reserved.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <!-- === END FOOTER === -->
        </tbody>
     </table>
  </body>
</html>
      `,
      attachments: [{
        filename: 'logo.png',
        path: 'https://firebasestorage.googleapis.com/v0/b/dols-a767c.appspot.com/o/images%2Flogo%20lightt.pngrc-upload-1670742588085-5?alt=media&token=ffe7f319-2af9-40de-acf0-696ad259b2ff',
        cid: "logo.png"
    }]
    };
    transporter.sendMail(mainOptions, (err,infor)=>{
        if(err){
            throw new SystemError(MessageError.SOMETHING_WRONG)
        }else{
            console.log(infor);
            
        }
    });
  }
}
