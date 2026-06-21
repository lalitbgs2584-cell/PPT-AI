'use server'
import { auth } from "./auth"
import { redirect } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { getRequestHeaders } from '@tanstack/react-start/server';


export const getSession = createServerFn({ method: 'GET' }).handler(async () => {
    const headers = await getRequestHeaders()
    return auth.api.getSession({ headers })
})

export const ensureSession = createServerFn({ method: 'GET' }).handler(async () => {
    const headers = await getRequestHeaders()
    const session = await auth.api.getSession({ headers })

    if (!session) {
        throw redirect({ to: '/signin' })
    }
    return session
})