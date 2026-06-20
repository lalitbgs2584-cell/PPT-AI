import { Outlet, createFileRoute } from '@tanstack/react-router'

import { AuthShell } from '#/components/auth/auth-shell'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <AuthShell>
      <Outlet />
    </AuthShell>
  )
}
