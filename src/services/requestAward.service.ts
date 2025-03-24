import { PrismaClient } from "@prisma/client";
import UploadService from "./upload.service";


class RequestAwardService {
  private prisma = new PrismaClient()
  async request(userId: number, promotionId: number): Promise<void> {
    
    const {request_award} = this.prisma;

    await request_award.create({
      data: {
        promotionId,
        userId
      }
    })
  } 

}

export default RequestAwardService;
