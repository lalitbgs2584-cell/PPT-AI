import { Toaster as Sonner } from 'sonner'
import type { ToasterProps } from 'sonner'
import {
  CheckCircleIcon,
  InfoIcon,
  WarningIcon,
  XCircleIcon,
  SpinnerIcon,
} from '@phosphor-icons/react'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="top-center"
      className="toaster group"
      icons={{
        success: (
          <CheckCircleIcon
            className="size-4 text-[var(--primary)]"
            weight="bold"
          />
        ),
        info: <InfoIcon className="size-4 text-neutral-400" weight="bold" />,
        warning: (
          <WarningIcon className="size-4 text-amber-500" weight="bold" />
        ),
        error: (
          <XCircleIcon className="size-4 text-destructive" weight="bold" />
        ),
        loading: (
          <SpinnerIcon className="size-4 animate-spin text-[var(--primary)]" />
        ),
      }}
      style={
        {
          '--normal-bg': 'rgba(9, 9, 11, 0.72)',
          '--normal-text': 'var(--foreground)',
          '--normal-border': 'var(--border)',
          '--success-bg': 'rgba(9, 9, 11, 0.8)',
          '--success-border':
            'color-mix(in oklch, var(--primary) 32%, var(--border))',
          '--success-text': 'var(--foreground)',
          '--error-bg': 'rgba(9, 9, 11, 0.8)',
          '--error-border':
            'color-mix(in oklch, var(--destructive) 32%, var(--border))',
          '--error-text': 'var(--foreground)',
          '--border-radius': '20px',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            'group toast border border-[var(--normal-border)] bg-[var(--normal-bg)] text-[var(--normal-text)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl px-5 py-4 flex gap-3.5 items-center font-sans transition-all',
          title: 'text-sm font-semibold tracking-tight text-white',
          description: 'text-xs leading-relaxed text-neutral-400',
          actionButton:
            'bg-[var(--primary)] text-neutral-950 hover:bg-[var(--primary)]/90 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
          cancelButton:
            'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white rounded-full px-3 py-1 text-xs font-semibold transition-colors',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
