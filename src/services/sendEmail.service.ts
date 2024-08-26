
import { PrismaClient } from "@prisma/client";
import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';
import { validateStore } from "../../validators/stores-validator";
import { EmailConfirmRegister } from "../models/email";


class SendEmailService {
    private transporter: Transporter<SentMessageInfo>

    constructor() {
        this.transporter = createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: '',
        }
        });
    }

    async confirmRegister(email: string): Promise<any> { 
        
        
        const mailOptions = {
            from: `Confirmação de Registro <>`,
            to: [email],
            subject: `Confirmação de Registro`,
            html: `
            <div style="font-family: 'Century Gothic', sans-serif; background-color: #f9f9f9; padding: 30px; color: #333;">
                <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
                    <div style="background-color: #C90B0B; padding: 20px; text-align: center;">
                        <h1 style="color: #fff; margin: 0;">Bem-vindo à FidelizaBadaro!</h1>
                    </div>
                    <div style="padding: 20px;">
                        <p>Olá,</p>
                        <p>Estamos muito felizes em recebê-lo na nossa plataforma de fidelidade!</p>
                        <p>Você agora faz parte da nossa comunidade e pode começar a aproveitar todos os benefícios e recompensas que nossos parceiro oferecem.</p>
                        <p>Atenciosamente,<br>FidelizaBadaro</p>
                    </div>
                    <div style="background-color: #1D1D1D; color: #fff; text-align: center; padding: 10px;">
                        <p style="margin: 0;">&copy; 2024 FidelizaBadaro. Todos os direitos reservados.</p>
                    </div>
                </div>
            </div>
            `,
        };
        

    this.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error(error);
        }
        });
    }


}

export default SendEmailService;

