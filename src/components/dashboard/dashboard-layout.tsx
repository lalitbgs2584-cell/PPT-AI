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
    <div className="flex min-h-screen w-full overflow-hidden bg-neutral-950 text-neutral-100 font-sans">
      <DashboardSidebar session={session} onSignOut={handleSignOut} />
      <main className="flex-1 overflow-hidden bg-neutral-950">{children}</main>
    </div>
  )
}
