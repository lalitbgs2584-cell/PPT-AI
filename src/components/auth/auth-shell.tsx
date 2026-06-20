import { Link } from '@tanstack/react-router'
import type { ReactNode } from 'react'

import { AuthBrandPanel } from './auth-brand-panel'

interface AuthShellProps {
  children: ReactNode
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="dark relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(203,163,89,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_28%),linear-gradient(180deg,#09090b_0%,#050505_100%)] font-sans text-neutral-100 selection:bg-[var(--primary)] selection:text-neutral-950">
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.03]" />
      <div className="pointer-events-none absolute left-1/2 top-[-14rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[var(--primary)]/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-[-10rem] right-[-6rem] h-[24rem] w-[24rem] rounded-full bg-white/5 blur-[140px]" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-6 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
        <AuthBrandPanel />

        <div className="mx-auto w-full max-w-md animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Link
              to="/"
              className="font-heading text-2xl font-bold tracking-tight text-white"
            >
              Aura<span className="font-light text-[var(--primary)]">.</span>
            </Link>
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
              AI Premium Deck Maker
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
