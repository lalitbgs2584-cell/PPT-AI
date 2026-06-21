import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '#/generated/prisma/client'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

declare global {
  var __prisma: PrismaClient | undefined
}

const basePrisma = globalThis.__prisma || new PrismaClient({ adapter })

const RETRYABLE_CODES = ['P1017', 'P1001', 'P1002']

export const prisma = basePrisma.$extends({
  query: {
    $allOperations: async ({ args, query }) => {
      try {
        return await query(args)
      } catch (err: any) {
        if (RETRYABLE_CODES.includes(err?.code)) {
          return await query(args)
        }
        throw err
      }
    },
  },
})

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = basePrisma
}