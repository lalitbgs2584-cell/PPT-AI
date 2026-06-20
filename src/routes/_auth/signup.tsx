import { createFileRoute } from '@tanstack/react-router'
import { AuthForm } from './auth-form'

export const Route = createFileRoute('/_auth/signup')({
  component: SignUpRoute,
})

function SignUpRoute() {
  return <AuthForm mode="signup" />
}
