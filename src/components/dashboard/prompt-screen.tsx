import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowLeft as ArrowLeftIcon,
  ChatCircle as ChatIcon,
  Sparkle as SparkleIcon,
} from '@phosphor-icons/react'

import {
  DashboardHeader,
  DashboardPage,
  DashboardPanel,
} from './dashboard-primitives'

interface PromptScreenProps {
  onGenerate: (prompt: string, format: string) => void
}

export function PromptScreen({ onGenerate }: PromptScreenProps) {
  const [prompt, setPrompt] = useState('')
  const [format, setFormat] = useState('investor pitch')

  const formats = [
    { id: 'investor pitch', label: 'Investor Pitch' },
    { id: 'conference talk', label: 'Conference Talk' },
    { id: 'internal review', label: 'Internal Review' },
  ]

  const suggestions = [
    'A Series A pitch deck for a carbon-offset credit tracking platform on a blockchain',
    'A product keynote outlining a new layout-matching design engine for designers',
    'An internal Q3 performance review for Aura SaaS showing 42% retention uplift',
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return
    onGenerate(prompt, format)
  }

  return (
    <DashboardPage>
      <div className="flex items-center justify-between">
        <Link
          to="/home"
          search={{ screen: 'library' }}
          className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-4 py-2.5 text-sm text-neutral-400 transition-colors hover:border-white/12 hover:bg-white/[0.04] hover:text-white"
        >
          <ArrowLeftIcon className="size-3.5" />
          <span>Back to library</span>
        </Link>
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-1 items-center">
        <DashboardPanel className="w-full p-6 md:p-8 lg:p-10">
          <div className="space-y-8">
            <DashboardHeader
              eyebrow="New deck"
              title="What are we building today?"
              description="Provide a concept, outline, or rough brief and let Aura shape the deck structure."
            />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                  Select format
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {formats.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFormat(f.id)}
                      className={`rounded-full border px-4 py-2.5 text-xs font-semibold tracking-wide transition-colors ${
                        format === f.id
                          ? 'border-[var(--primary)]/22 bg-[var(--primary)]/10 text-[var(--primary)]'
                          : 'border-white/8 bg-white/[0.02] text-neutral-400 hover:border-white/12 hover:text-white'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                  Outline or prompt
                </label>
                <div className="rounded-[1.5rem] border border-white/8 bg-neutral-900/55 p-2 transition-colors focus-within:border-[var(--primary)]/28">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Paste a brief here..."
                    rows={6}
                    className="w-full resize-none rounded-[1.1rem] border-0 bg-transparent p-4 text-sm leading-relaxed text-neutral-100 outline-none placeholder:text-neutral-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!prompt.trim()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--primary)]/18 bg-[var(--primary)]/10 px-5 py-4 text-sm font-semibold text-[var(--primary)] transition-colors hover:border-[var(--primary)]/26 hover:bg-[var(--primary)]/14 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <SparkleIcon className="size-4 stroke-[2px]" />
                <span>Generate deck outlines</span>
              </button>
            </form>

            <div className="space-y-4 border-t border-white/6 pt-6">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                <ChatIcon className="size-4 text-neutral-500" />
                <span>Try a suggestion</span>
              </div>
              <div className="grid gap-2.5">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setPrompt(suggestion)}
                    className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3 text-left text-sm leading-relaxed text-neutral-400 transition-colors hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/6 hover:text-white"
                  >
                    "{suggestion}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DashboardPanel>
      </div>
    </DashboardPage>
  )
}
