import { createFileRoute } from '@tanstack/react-router'
import { AuthForm } from './auth-form'

export const Route = createFileRoute('/_auth/signin')({
  component: SignInRoute,
})

function SignInRoute() {
  return <AuthForm mode="signin" />
}
