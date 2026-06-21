import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { authClient } from '#/lib/auth-client'
import { DashboardLayout } from '#/components/dashboard/dashboard-layout'
import { ensureSession } from '#/lib/auth.functions'

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayoutRoute,
  beforeLoad: async () => {
    const session = await ensureSession()
    return {
      session
    }
  }
})

function DashboardLayoutRoute() {
  const navigate = useNavigate()
  const { session } = Route.useRouteContext()
  const { data: clientSession, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && !clientSession) {
      navigate({ to: '/signin' })
    }
  }, [clientSession, isPending, navigate])

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-neutral-400">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans text-[var(--primary)] font-semibold animate-pulse">
            Loading Aura...
          </span>
        </div>
      </div>
    )
  }

  if (!clientSession) {
    return null
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}