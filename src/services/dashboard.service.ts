import { PrismaClient } from "@prisma/client";
import SendEmailService from "./sendEmail.service";
const sendEmailService = new SendEmailService();
class DashboardService {
  private prisma = new PrismaClient();


  async getTotalClients(storeId: number) {
    const { users: usersDB } = this.prisma;
    try {
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
    } catch (error) {
      console.error('Error getting total clients:', error);
      throw error;
    }
  }


  async getTotalPromotions(storeId: number) {
    const { promotions: promotionsDB } = this.prisma;
    try {
      const result = await promotionsDB.groupBy({
        by: ['active'],
        where: { storeId },
        _count: { id: true }
      });

      const totalActives = result.find(r => r.active === true)?._count.id || 0;
      const totalInactives = result.find(r => r.active === false)?._count.id || 0;

      return { totalActives, totalInactives };
    } catch (error) {
      console.error('Error getting total promotions:', error);
      throw error;
    }
  }

  async getTopPromotions(storeId: number, limit: number = 5) {
    const { promotions: promotionsDB } = this.prisma;
    try {
      const promotions = await promotionsDB.findMany({
        where: { storeId },
        include: {
          _count: {
            select: { promotions_users_point: true }
          }
        },
        orderBy: {
          promotions_users_point: {
            _count: 'desc'
          }
        },
        take: limit
      });

      return promotions.map(promo => ({
        id: promo.id,
        title: promo.name,
        totalParticipants: promo._count.promotions_users_point
      }));
    } catch (error) {
      console.error('Error getting top promotions:', error);
      throw error;
    }
  }
// Método para pegar os top usuários ou operadores
async getTop(storeId: number, key: string) {
  console.log('GET TOP');
  const { promotions_users_history: historyDB, promotions: promotionsDB, users: usersDB } = this.prisma;

  try {
    // Buscando o histórico de promoções com os pontos agregados e as informações do usuário em uma única consulta
    const history = await historyDB.findMany({
      where: {
        promotions: { storeId }
      },
      include: {
        promotions: {
          select: { id: true, pointsPerPurchase: true }
        },
        user: { // Incluindo dados do usuário para evitar outra consulta
          select: { id: true, name: true, email: true }
        }
      }
    });

    // Mapeando as promoções e somando os pontos por usuário
    const userPointsMap: Record<number, number> = {};

    history.forEach(record => {
      const points = record.promotions.pointsPerPurchase || 0;
      const userId = record[key];

      if (userId) { // Verifica se o usuário existe
        if (!userPointsMap[userId]) {
          userPointsMap[userId] = 0;
        }
        userPointsMap[userId] += points;
      }
    });

    // Ordenando e pegando os 5 primeiros
    const sortedUsers = Object.entries(userPointsMap)
      .map(([userId, totalPoints]) => ({ userId: parseInt(userId), totalPoints }))
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, 5);

    // Pegando os dados dos usuários de uma vez
    const users = await usersDB.findMany({
      where: {
        id: { in: sortedUsers.map(client => client.userId) }
      },
      select: { id: true, name: true, email: true }
    });

    // Retornando a lista com o rank e dados do usuário
    return sortedUsers.map((client, index) => {
      const user = users.find(u => u.id === client.userId);
      return {
        rank: index + 1,
        [key]: user?.id,
        name: user?.name,
        email: user?.email,
        totalPoints: client.totalPoints
      };
    });
  } catch (error) {
    console.error('Error getting top clients/operators:', error);
    throw error;
  }
}


  // Método para pegar tudo de uma vez
  async getAll(storeId: number) {
    try {
      const [totalClients, totalPromotions, topPromotions, topClients, topOperators] = await Promise.all([
        this.getTotalClients(storeId),
        this.getTotalPromotions(storeId),
        this.getTopPromotions(storeId),
        this.getTop(storeId, 'userId'),
        this.getTop(storeId, 'operatorId'),
      ]);
      return {
        totalClients,
        totalPromotionsActive: totalPromotions.totalActives,
        totalPromotionsInactive: totalPromotions.totalInactives,
        topPromotions,
        topClients,
        topOperators
      };
    } catch (error) {
      console.error('Error getting all data:', error);
      throw error;
    }
  }
}

export default DashboardService;



