
import { createTransport, SentMessageInfo, Transporter } from 'nodemailer';


class SendEmailService {
    private transporter: Transporter<SentMessageInfo>

    constructor() {
        this.transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
        });
    }

    async confirmRegister(email: string): Promise<any> { 
        const mailOptions = {
            from: `Confirmação de Registro <>`,
            to: [email],
            subject: `Confirmação de Registro`,
            html: `
            <div style="font-family: 'Century Gothic', sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">
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

    async resetPassword(email: string, resetLink: string): Promise<any> { 
        const mailOptions = {
            from: `Recuperação de Senha <>`,
            to: [email],
            subject: `Recupere sua senha`,
            html: `
            <div style="font-family: 'Century Gothic', sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">
                <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
                    <div style="background-color: #C90B0B; padding: 20px; text-align: center;">
                        <h1 style="color: #fff; margin: 0;">RECUPERAÇÃO DE SENHA</h1>
                    </div>
                    <div style="padding: 20px;">
                        <p>Olá,</p>
                        <p>Recebemos uma solicitação para redefinir sua senha. Caso tenha sido você, clique no botão abaixo para criar uma nova senha:</p>
                        <p style="text-align: center;">
                            <a href="${resetLink}" style="display: inline-block; padding: 12px 20px; font-size: 16px; color: #fff; background-color: #C90B0B; text-decoration: none; border-radius: 5px;">Redefinir Senha</a>
                        </p>
                        <p><strong>Importante:</strong> Este link é válido por apenas 1 hora. Caso expire, será necessário solicitar uma nova redefinição de senha.</p>
                        <p>Se você não solicitou essa alteração, ignore este email. Sua senha permanecerá a mesma.</p>
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

    async confirmPasswordChange(email: string): Promise<any> { 
        const mailOptions = {
            from: `Segurança da Conta <>`,
            to: [email],
            subject: `Senha Alterada com Sucesso`,
            html: `
            <div style="font-family: 'Century Gothic', sans-serif; background-color: #f9f9f9; padding: 20px; color: #333;">
                <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
                    <div style="background-color: #C90B0B; padding: 20px; text-align: center;">
                        <h1 style="color: #fff; margin: 0;">SENHA ALTERADA</h1>
                    </div>
                    <div style="padding: 20px;">
                        <p>Olá,</p>
                        <p>Informamos que sua senha foi alterada com sucesso.</p>
                        <p>Se você realizou essa alteração, não é necessário tomar nenhuma ação adicional.</p>
                        <p><strong>Se você não alterou sua senha, entre em contato imediatamente com o suporte para garantir a segurança da sua conta.</strong></p>
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

