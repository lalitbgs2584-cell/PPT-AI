import { Outlet, createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { authClient } from '#/lib/auth-client'
import { DashboardLayout } from '#/components/dashboard/dashboard-layout'

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayoutRoute,
})

function DashboardLayoutRoute() {
  const navigate = useNavigate()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && !session) {
      navigate({ to: '/signin' })
    }
  }, [session, isPending, navigate])

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

  if (!session) {
    return null
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}
