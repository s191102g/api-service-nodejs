"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
let MailService = class MailService {
    async sendMailVertify(email, activeKey) {
        var transporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            auth: {
                user: "dolsservicess@gmail.com",
                pass: "afxzatllrwoikkdk",
            },
        });
        var mainOptions = {
            from: "UMALL_SERVICE",
            to: `${email}`,
            subject: "XÁC THỰC NGƯỜI DÙNG",
            text: "Hãy sử dụng mã phía dưới để xác thực",
            html: `<p>Mã xác thực của bạn  là : ${activeKey}</p>`,
        };
        transporter.sendMail(mainOptions);
    }
};
MailService = tslib_1.__decorate([
    (0, typedi_1.Service)("mail.service")
], MailService);
exports.MailService = MailService;
