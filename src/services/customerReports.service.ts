import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();



class CustomerReportsService {

    async historyParticipationPromotions(userId: number) {
      const {promotions_users_point: promotionsUsersPointDB } = prisma;
      const data = await promotionsUsersPointDB.findMany({
        where: {userId},
        include: {

          promotions: {
            select: {
              active: true,
              name: true,
              stores: {
                select: {
                  name: true
                }
              }
            }
          },
        }
      })

      return data.map((history) => ({
        points: history.points,
        maxPoints: history.maxPoints,
        promotionName: history.promotions.name,
        active: history.promotions.active,
        storeName: history.promotions.stores.name,
      }));
    }


    async historyRewardPoints(userId: number) {
      const {promotions_users_history: promotionsUsersHistoryDB } = prisma;

      const data = await promotionsUsersHistoryDB.findMany({
        where: {userId},
        include: {

          promotions: {
            select: {
              name: true,
              pointsPerPurchase: true,
              created_at: true,
            }
          },
        }
      })

      return data.map((history) => ({
        title: 'RESGATOOU!!',
        created_at: history.promotions.created_at,
        message:`Resgatou ${history.promotions.pointsPerPurchase} pontos`
      }));

    }

    async getClientsByStore(storeId: number){
      const {promotions_users_point: promotionsUsersPointDB } = prisma;

      const data = await promotionsUsersPointDB.findMany({
        where: {
          promotions: {
              storeId: storeId
          }
        }, 
        distinct: ['userId'],
        select: {
          userId: true,
          users: {
            select: {
              id: true,
              name: true,
              email: true,
              cpf: true,
              phone: true,
              active: true,
              role: true,
              birthDate: true,
            }
          }
        }

      })


      return data;

    }
    

}

export default CustomerReportsService;
