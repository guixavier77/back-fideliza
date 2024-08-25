import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const main = async () => {
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash('pass', salt)

}

main()
  .catch((err) => {
    console.log('Seeding error: ', err)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
