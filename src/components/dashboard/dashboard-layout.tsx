import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

import { authClient } from '#/lib/auth-client'
import { DashboardSidebar } from './dashboard-sidebar'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate()
  const { data: session } = authClient.useSession()

  const handleSignOut = async () => {
    try {
      toast.loading('Signing out...')
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.dismiss()
            toast.success('Signed out successfully')
            navigate({ to: '/signin' })
          },
        },
      })
    } catch (err: any) {
      toast.dismiss()
      toast.error('Failed to sign out')
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-950 font-sans text-neutral-100">
      <DashboardSidebar session={session} onSignOut={handleSignOut} />
      <main className="min-w-0 bg-neutral-950 lg:ml-[264px] lg:h-screen lg:overflow-hidden">
        {children}
      </main>
    </div>
  )
}
