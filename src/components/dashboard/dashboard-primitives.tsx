import type { ReactNode } from 'react'

import { cn } from '#/lib/utils'

interface DashboardPageProps {
  children: ReactNode
  className?: string
}

interface DashboardHeaderProps {
  eyebrow?: string
  title: string
  description: string
  actions?: ReactNode
  className?: string
}

interface DashboardPanelProps {
  children: ReactNode
  className?: string
}

interface DashboardEmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
  className?: string
}

export function DashboardPage({ children, className }: DashboardPageProps) {
  return (
    <div
      className={cn(
        'relative h-full overflow-y-auto bg-neutral-950 text-neutral-100',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(203,163,89,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.02),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.03]" />
      <div className="relative mx-auto flex min-h-full w-full max-w-7xl flex-col gap-6 px-6 py-6 md:px-8 lg:px-10">
        {children}
      </div>
    </div>
  )
}

export function DashboardHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
}: DashboardHeaderProps) {
  return (
    <section
      className={cn(
        'flex flex-col gap-5 border-b border-white/8 pb-5 lg:flex-row lg:items-end lg:justify-between',
        className,
      )}
    >
      <div className="space-y-3">
        {eyebrow ? (
          <div className="inline-flex w-fit items-center rounded-full border border-[var(--primary)]/18 bg-[var(--primary)]/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">
            {eyebrow}
          </div>
        ) : null}
        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-400">
            {description}
          </p>
        </div>
      </div>

      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </section>
  )
}

export function DashboardPanel({ children, className }: DashboardPanelProps) {
  return (
    <div
      className={cn(
        'rounded-[1.75rem] border border-white/8 bg-white/[0.025] shadow-[0_24px_80px_-48px_rgba(0,0,0,0.9)] backdrop-blur-xl',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function DashboardEmptyState({
  icon,
  title,
  description,
  action,
  className,
}: DashboardEmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/[0.015] px-8 py-14 text-center',
        className,
      )}
    >
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-[var(--primary)]/18 bg-[var(--primary)]/8 text-[var(--primary)]">
        {icon}
      </div>
      <h3 className="font-heading text-xl font-semibold text-white">
        {title}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-400">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
