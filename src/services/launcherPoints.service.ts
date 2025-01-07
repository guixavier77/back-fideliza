import { PrismaClient } from "@prisma/client";
import { validateAward } from "../../validators/awards-validator";
import { AwardCreate } from "../models/awards";
import UploadService from "./upload.service";
import { LauncherPoints } from "../models/launcherPoints";
import { validateLauncherByCpf } from "../../validators/launcherPoints-validator";

const prisma = new PrismaClient();



class LauncherPointsService {

    async sendPointsPerCpf(launcher: LauncherPoints): Promise<any> { 
        const validate = validateLauncherByCpf(launcher);
        if (validate.error) throw new Error(validate.error.details[0].message);
        const {promotionId, cpf} = validate.value;
        await this.processPoints(promotionId,cpf);
    }

    async sendPointsPerCode(qrCodeId: number, cpf: string): Promise<any> { 
        const {qr_code: qrCodeDB} = prisma;
        const qrCode = await qrCodeDB.findUnique({ where: { id: qrCodeId}});  
        if(!qrCode && qrCode.read) throw new Error('User not found');
        await this.processPoints(qrCode.promotionId ,cpf);  
        await this.validateQRCode(qrCode.id);

    }

    
    async generateQRCode(promotionId: number, userId: number): Promise<any> { 
        const { qr_code: qrCodeDB } = prisma;
    
        console.log(userId);
        const lastQRCode = await qrCodeDB.findFirst({
            where: {
                promotionId: promotionId,
                userId: userId,
                read: false
            },
        });
    
        if (lastQRCode) return lastQRCode;
    
        const qrCode = await qrCodeDB.create({
            data: {
                promotionId,
                userId,            },
        });
    
        return qrCode;
    }

    private async validateQRCode(qrCodeId: number): Promise<any> { 
        const { qr_code: qrCodeDB } = prisma;

        const qrCode = await qrCodeDB.update({
            where:{id: qrCodeId},
            data: {
                read: true,
            },
        });
    
        return qrCode;
    }


    private async processPoints(promotionId: number, cpf: string): Promise<any>{
        const {promotions: promotionsDB, users: usersDB, promotions_users_point: promotionsUsersPointsDB, promotion_winners: promotionsWinnersDB} = prisma;

        const user = await usersDB.findUnique({ where: {cpf: cpf }})
        if(!user) throw new Error('User not found');    
        const promotion = await promotionsDB.findUnique({ where: {id: promotionId }})
        if(!promotion) throw new Error('Promotion not found');    

        
        const userInPromotionExists = await promotionsUsersPointsDB.findUnique({
            where: {
                userId_promotionId: { userId: user.id, promotionId },
            },
        });

        if(userInPromotionExists && userInPromotionExists.points === userInPromotionExists.maxPoints) throw new Error('The user has already completed this promotion.')
        const pointsToClient = (userInPromotionExists?.points ?? 0) + promotion.pointsPerPurchase > promotion.points ? promotion.points : userInPromotionExists.points + promotion.pointsPerPurchase

        if(userInPromotionExists){
            await promotionsUsersPointsDB.update({
                where: { id: userInPromotionExists.id },
                data: { points: pointsToClient },
            });

            if(pointsToClient === promotion.points){
                await promotionsWinnersDB.create({
                    data: {
                        userId: user.id,
                        promotionId
                    }
                });
                
            }
        } else {
            await promotionsUsersPointsDB.create({
                data: {
                    userId: user.id,
                    promotionId,
                    points: promotion.pointsPerPurchase,
                    maxPoints: promotion.points
                }
            })
        }
    }






}

export default LauncherPointsService;
