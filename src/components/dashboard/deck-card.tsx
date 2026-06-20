import { Link } from '@tanstack/react-router'
import {
  ArrowRightIcon,
  CalendarIcon,
  CardsIcon,
  StarIcon,
  TrashIcon,
} from '@phosphor-icons/react'

import { cn } from '#/lib/utils'
import type { Deck } from './types'

interface DeckCardProps {
  deck: Deck
  starred: boolean
  onToggleStar: (deckId: string) => void
  onDelete: (deckId: string) => void
  className?: string
}

export function DeckCard({
  deck,
  starred,
  onToggleStar,
  onDelete,
  className,
}: DeckCardProps) {
  return (
    <article
      className={cn(
        'group overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/[0.02] shadow-[0_18px_60px_-36px_rgba(0,0,0,0.85)] transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/18 hover:bg-white/[0.035]',
        className,
      )}
    >
      <Link
        to="/home"
        search={{ screen: 'editor', deckId: deck.id }}
        className="block border-b border-white/6 p-5"
      >
        <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-neutral-500">
          <span>Project preview</span>
          <span>{deck.slideCount} slides</span>
        </div>

        <div className="mt-4 rounded-[1.25rem] border border-white/6 bg-neutral-900/70 p-4">
          <div className="flex h-full min-h-[14rem] flex-col justify-between gap-5">
            <div className="space-y-4">
              <span className="inline-flex w-fit rounded-full border border-[var(--primary)]/18 bg-[var(--primary)]/8 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">
                Workspace deck
              </span>

              <div className="space-y-3">
                <h4 className="font-heading text-xl font-semibold leading-tight text-white line-clamp-2">
                  {deck.slides[0]?.title || deck.title}
                </h4>
                <div className="space-y-2">
                  <div className="h-[2px] w-[88%] rounded-full bg-white/10" />
                  <div className="h-[2px] w-[64%] rounded-full bg-[var(--primary)]/65" />
                  <div className="h-[2px] w-[48%] rounded-full bg-white/10" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-neutral-500">
              <span>{deck.createdAt}</span>
              <span className="inline-flex items-center gap-1 text-neutral-300">
                Open deck
                <ArrowRightIcon className="size-3" />
              </span>
            </div>
          </div>
        </div>
      </Link>

      <div className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0">
          <Link
            to="/home"
            search={{ screen: 'editor', deckId: deck.id }}
            className="block truncate font-heading text-lg font-semibold text-white transition-colors hover:text-[var(--primary)]"
          >
            {deck.title}
          </Link>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-neutral-400">
            {deck.description}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={() => onToggleStar(deck.id)}
            className="inline-flex size-10 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.02] text-neutral-400 transition-colors hover:border-white/12 hover:bg-white/[0.05] hover:text-white"
            aria-label={`${starred ? 'Unstar' : 'Star'} ${deck.title}`}
            title={starred ? 'Remove star' : 'Mark as favorite'}
          >
            <StarIcon
              className="size-4"
              weight={starred ? 'fill' : 'regular'}
              color={starred ? 'var(--primary)' : 'currentColor'}
            />
          </button>

          <button
            onClick={() => onDelete(deck.id)}
            className="inline-flex size-10 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.02] text-neutral-400 transition-colors hover:border-white/12 hover:bg-white/[0.05] hover:text-destructive"
            aria-label={`Delete ${deck.title}`}
            title="Delete project"
          >
            <TrashIcon className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 border-t border-white/6 px-5 py-3 text-xs text-neutral-500">
        <span className="flex items-center gap-1.5">
          <CardsIcon className="size-4 text-neutral-400" />
          {deck.slideCount} slides
        </span>
        <span className="flex items-center gap-1.5">
          <CalendarIcon className="size-4 text-neutral-400" />
          {deck.createdAt}
        </span>
      </div>
    </article>
  )
}
