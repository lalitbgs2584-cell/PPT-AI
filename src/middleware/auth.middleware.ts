import { createMiddleware } from "@tanstack/react-start";
import { isLoginPath, isPublicPath } from "../lib/auth-path";
import { getSession } from "#/lib/auth.functions";
import { redirect } from "@tanstack/react-router";
import {  getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "#/lib/auth";


export const authMiddleware = createMiddleware({ type: 'request' }).server(
    async ({ request, next }) => {
        const { pathname } = new URL(request.url)

        // Pure public paths (not login pages) don't need a session check at all
        if (isPublicPath(pathname) && !isLoginPath(pathname)) {
            return next()
        }

        const session = await getSession()

        if (isLoginPath(pathname) && session) {
            throw redirect({ to: "/home" })
        }

        if (!isPublicPath(pathname) && !session) {
            throw redirect({ to: "/signin" })
        }
        if (!session) {
            throw redirect({ to: '/signin' })
        }
        return next({ context: { session } })
    }
)

export const authFnMiddleware = createMiddleware({type:'function'}).server(
    async({next}) =>{
        const headers = getRequestHeaders()
        const session = await auth.api.getSession({headers})

        if(!session){
            throw redirect({to: '/signin'})
        }
        return next({context:{session}})
    }
)