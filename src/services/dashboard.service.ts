import { PrismaClient } from "@prisma/client";
import SendEmailService from "./sendEmail.service";
const sendEmailService = new SendEmailService();

class DashboardService {
    private prisma = new PrismaClient();

    
    async getTotalClients(storeId: number) {
        const { users: usersDB } = this.prisma;
        const totalClients = await usersDB.count({
          where: {
            promotions_users_point: {
              some: {
                promotions: {
                  storeId: storeId
                }
              }
            }
          }
        });  
        return totalClients;
    }

    async getTotalPromotions(storeId: number) {
      const { promotions: promotionsDB } = this.prisma;
    
      const result = await promotionsDB.groupBy({
        by: ['active'],
        where: { storeId },
        _count: { id: true }
      });
    
      const totalActives = result.find(r => r.active === true)?._count.id || 0;
      const totalInactives = result.find(r => r.active === false)?._count.id || 0;
    
      return { totalActives, totalInactives };
    }
    

    async getAll(storeId: number) {
      const [totalClients, totalPromotions] = await Promise.all([
        this.getTotalClients(storeId),
        this.getTotalPromotions(storeId)
      ]);
    
      return {
        totalClients,
        totalPromotionsActive: totalPromotions.totalActives,
        totalPromotionsInactive: totalPromotions.totalInactives
      };
    }
    
      
}

export default DashboardService;

