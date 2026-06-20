import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Cards as CardsIcon,
  Plus as PlusIcon,
  Sparkle as SparkleIcon,
  MagnifyingGlass as SearchIcon,
} from '@phosphor-icons/react'

import { DeckCard } from './deck-card'
import {
  DashboardEmptyState,
  DashboardHeader,
  DashboardPage,
  DashboardPanel,
} from './dashboard-primitives'
import type { Deck } from './types'

interface DeckLibraryProps {
  decks: Deck[]
  onDeleteDeck: (id: string) => void
}

export function DeckLibrary({ decks, onDeleteDeck }: DeckLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'title'>('newest')
  const [starredDecks, setStarredDecks] = useState<Record<string, boolean>>({
    'seed-vc-pitch': true,
  })

  const toggleStar = (id: string) => {
    setStarredDecks((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filteredDecks = decks.filter(
    (deck) =>
      deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sortedDecks = [...filteredDecks].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }

    return a.title.localeCompare(b.title)
  })

  return (
    <DashboardPage>
      <DashboardHeader
        eyebrow="Premium workspace"
        title="Your workspace"
        description="Review, refine, and open presentation decks in a quieter, more editorial layout."
        actions={
          <Link
            to="/home"
            search={{ screen: 'prompt' }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--primary)]/18 bg-[var(--primary)]/10 px-5 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:border-[var(--primary)]/26 hover:bg-[var(--primary)]/14"
          >
            <PlusIcon className="size-4 stroke-[3px]" />
            <span>New deck</span>
          </Link>
        }
      />

      <DashboardPanel className="p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search decks"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/8 bg-neutral-900/55 py-3 pl-11 pr-4 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-500 focus:border-[var(--primary)]/30"
            />
          </div>

          <div className="flex items-center gap-3 text-sm text-neutral-400">
            <span className="whitespace-nowrap">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'title')}
              className="rounded-full border border-white/8 bg-neutral-900/55 px-4 py-2.5 text-sm text-neutral-100 outline-none transition-colors focus:border-[var(--primary)]/30"
            >
              <option value="newest">Newest first</option>
              <option value="title">Alphabetical</option>
            </select>
          </div>
        </div>
      </DashboardPanel>

      {sortedDecks.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sortedDecks.map((deck) => (
            <DeckCard
              key={deck.id}
              deck={deck}
              starred={Boolean(starredDecks[deck.id])}
              onToggleStar={toggleStar}
              onDelete={onDeleteDeck}
            />
          ))}
        </div>
      ) : (
        <DashboardEmptyState
          icon={<CardsIcon className="size-8" />}
          title="No decks found"
          description={
            searchQuery
              ? "We couldn't find any decks matching that search."
              : 'Create your first deck and the library will appear here.'
          }
          action={
            !searchQuery ? (
              <Link
                to="/home"
                search={{ screen: 'prompt' }}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/18 bg-[var(--primary)]/10 px-5 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:border-[var(--primary)]/26 hover:bg-[var(--primary)]/14"
              >
                <SparkleIcon className="size-4" />
                <span>Create first deck</span>
              </Link>
            ) : null
          }
        />
      )}
    </DashboardPage>
  )
}
