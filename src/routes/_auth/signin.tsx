import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { authClient } from '#/lib/auth-client'
import { AuthForm } from './auth-form'

export const Route = createFileRoute('/_auth/signin')({
  component: SignInRoute,
})

function SignInRoute() {
  

  return <AuthForm mode="signin" redirectURL="/home" />
}
