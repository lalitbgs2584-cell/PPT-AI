import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma as db } from './db'
import { env } from '#/config/env'
import {tanstackStartCookies} from "better-auth/tanstack-start"

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [env.CLIENT_URL],
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins:[tanstackStartCookies()]
})
