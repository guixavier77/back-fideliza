import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



class OperatorsReportsService {


    async historyLauncherPoints(userId: number) {
      const {promotions_users_history: promotionsUsersHistoryDB } = prisma;
      const data = await promotionsUsersHistoryDB.findMany({
        where: {operatorId: userId},
        include: {
          promotions: {
            select: {
              name: true,
              pointsPerPurchase: true,
              created_at: true,
            }
          },
          user: {
            select: {
              name: true,
            }
          }
        }
      })

      return data.map((history) => ({
        title: 'LANÇOOU!!',
        created_at: history.promotions.created_at,
        message:`Lançou ${history.promotions.pointsPerPurchase} pontos para ${history.user.name}`
      }));

    }
    

}

export default OperatorsReportsService;
