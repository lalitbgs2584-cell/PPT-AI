import { Link } from '@tanstack/react-router'
import {
  FolderIcon,
  PaletteIcon,
  GearIcon,
  SignOutIcon,
  PlusIcon,
  UserIcon,
} from '@phosphor-icons/react'

import { cn } from '#/lib/utils'

interface DashboardUser {
  name?: string | null
  email?: string | null
  image?: string | null
}

interface DashboardSession {
  user: DashboardUser
}

interface DashboardSidebarProps {
  session?: DashboardSession | null
  onSignOut: () => void
}

const navItems = [
  {
    label: 'Library',
    icon: FolderIcon,
    search: { screen: 'library' } as const,
  },
  {
    label: 'Brand Kit',
    icon: PaletteIcon,
    search: { screen: 'brandkit' } as const,
  },
  {
    label: 'Settings',
    icon: GearIcon,
    search: { screen: 'settings' } as const,
  },
]

export function DashboardSidebar({ session, onSignOut }: DashboardSidebarProps) {
  return (
    <aside className="flex w-full flex-col justify-between border-b border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.018),rgba(255,255,255,0.008))] text-neutral-100 lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:h-screen lg:w-[264px] lg:min-w-[264px] lg:max-w-[264px] lg:border-b-0 lg:border-r lg:overflow-y-auto">
      <div className="flex flex-col gap-5 p-4">
        <Link
          to="/home"
          search={{ screen: 'library' }}
          className="flex items-center gap-3 rounded-[1.5rem] border border-white/6 bg-white/[0.02] px-4 py-3.5 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
        >
          <div className="flex size-11 items-center justify-center rounded-2xl border border-[var(--primary)]/18 bg-[var(--primary)]/10 text-[var(--primary)]">
            <span className="font-heading text-lg font-semibold">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl font-semibold tracking-tight text-white">
              Aura
            </span>
            <span className="text-[10px] uppercase tracking-[0.26em] text-neutral-500">
              Design workspace
            </span>
          </div>
        </Link>

        <Link
          to="/home"
          search={{ screen: 'prompt' }}
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-full border border-[var(--primary)]/18 bg-[var(--primary)]/10 px-4 py-3 text-sm font-semibold text-[var(--primary)] transition-all hover:border-[var(--primary)]/26 hover:bg-[var(--primary)]/14',
          )}
        >
          <PlusIcon className="size-4 stroke-[3px]" />
          <span>New deck</span>
        </Link>

        <nav className="flex flex-col gap-1.5 pt-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to="/home"
              search={item.search}
              activeOptions={{ exact: false, includeSearch: true }}
              className="group flex items-center gap-3 rounded-[1.25rem] px-4 py-3 text-sm font-medium text-neutral-400 transition-colors hover:bg-white/[0.03] hover:text-white"
              activeProps={{
                className:
                  'bg-white/[0.05] text-white ring-1 ring-inset ring-[var(--primary)]/18',
              }}
            >
              <item.icon className="size-5 shrink-0 text-neutral-500 transition-colors group-hover:text-[var(--primary)]" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/6 p-4">
        <div className="rounded-[1.5rem] border border-white/6 bg-white/[0.02] p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-white/8 bg-white/[0.04] text-[var(--primary)]">
              {session?.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || 'User avatar'}
                  className="size-full object-cover"
                />
              ) : (
                <UserIcon className="size-5" />
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {session?.user.name || 'User Account'}
              </p>
              <p className="truncate text-xs text-neutral-500">
                {session?.user.email || 'user@aura.ai'}
              </p>
            </div>
          </div>

          <button
            onClick={onSignOut}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/[0.05] hover:text-white"
          >
            <SignOutIcon className="size-4" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
