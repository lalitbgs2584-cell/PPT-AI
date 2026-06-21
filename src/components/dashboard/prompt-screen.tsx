import { useEffect, useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowLeft as ArrowLeftIcon,
  ChatCircle as ChatIcon,
  CheckCircle as CheckIcon,
  Sparkle as SparkleIcon,
  TextAa as TextIcon,
} from '@phosphor-icons/react'

import { Slider } from '#/components/ui/slider'
import {
  DashboardHeader,
  DashboardPage,
  DashboardPanel,
} from './dashboard-primitives'
import {
  LAYOUT_OPTIONS,
  SLIDE_COUNT_DEFAULT,
  SLIDE_COUNT_MAX,
  SLIDE_COUNT_MIN,
  SLIDE_STYLES,
  TONE_OPTIONS,
} from '#/features/presentation/constants/presentation-constants'
import type {
  SlideLayout,
  SlideStyle,
  SlideTone,
} from '#/features/presentation/constants/presentation-constants'
import { PRESENTATION_TEMPLATES } from '#/features/presentation/constants/presentation-template'

interface PromptScreenProps {
  onGenerate: (prompt: string, format: string) => void
}

const activeTemplateByDefault = 'investor-pitch'

function previewLines(content: string) {
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3)
}

function accentClass(style: SlideStyle) {
  switch (style) {
    case 'minimal':
      return 'from-white/14 via-white/8 to-transparent'
    case 'professional':
      return 'from-[var(--primary)]/70 via-[var(--primary)]/20 to-transparent'
    case 'creative':
      return 'from-cyan-300/70 via-fuchsia-400/20 to-transparent'
    case 'bold':
      return 'from-amber-300/80 via-[var(--primary)]/28 to-transparent'
  }

  return 'from-white/14 via-white/8 to-transparent'
}

function MetaChip({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-neutral-400">
      {children}
    </span>
  )
}

function ToggleGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div className="space-y-2.5">
      <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.value === value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                active
                  ? 'border-[var(--primary)]/24 bg-[var(--primary)]/10 text-white shadow-[0_0_0_1px_rgba(203,163,89,0.08)]'
                  : 'border-white/8 bg-white/[0.02] text-neutral-400 hover:border-white/12 hover:bg-white/[0.04] hover:text-white'
              }`}
            >
              {active ? <CheckIcon className="size-3.5 text-[var(--primary)]" /> : null}
              <span>{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TemplateRibbonCard({
  id,
  label,
  content,
  slides,
  style,
  tone,
  layout,
  active,
  onSelect,
}: {
  id: string
  label: string
  content: string
  slides: number
  style: SlideStyle
  tone: SlideTone
  layout: SlideLayout
  active: boolean
  onSelect: (id: string) => void
}) {
  const preview = previewLines(content)

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(id)}
      className={`group relative min-w-[290px] snap-start overflow-hidden rounded-[1.5rem] border p-4 text-left transition-all md:min-w-[320px] ${
        active
          ? 'border-[var(--primary)]/26 bg-[var(--primary)]/8 shadow-[0_20px_60px_-36px_rgba(203,163,89,0.55)]'
          : 'border-white/8 bg-white/[0.02] hover:-translate-y-0.5 hover:border-white/12 hover:bg-white/[0.03]'
      }`}
    >
      <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${accentClass(style)}`} />

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="font-heading text-lg font-semibold tracking-tight text-white">
            {label}
          </div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
            {slides} slides
          </div>
        </div>
        <div
          className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] ${
            active
              ? 'border border-[var(--primary)]/20 bg-[var(--primary)]/10 text-[var(--primary)]'
              : 'border border-white/8 bg-white/[0.03] text-neutral-500'
          }`}
        >
          {active ? 'Selected' : 'Preview'}
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-[1.15rem] border border-white/8 bg-neutral-950/80 p-3">
          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-neutral-500">
            <span>Style</span>
            <span>{style}</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-2 rounded-full bg-[var(--primary)]/70" />
            <div className="h-2 w-5/6 rounded-full bg-white/10" />
            <div className="h-2 w-3/5 rounded-full bg-white/10" />
          </div>
        </div>

        <div className="space-y-1.5">
          {preview.map((line) => (
            <p key={line} className="truncate text-xs leading-relaxed text-neutral-400">
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <MetaChip>{style}</MetaChip>
        <MetaChip>{tone}</MetaChip>
        <MetaChip>{layout}</MetaChip>
      </div>
    </button>
  )
}

export function PromptScreen({ onGenerate }: PromptScreenProps) {
  const [prompt, setPrompt] = useState('')
  const [slides, setSlides] = useState(SLIDE_COUNT_DEFAULT)
  const [style, setStyle] = useState<SlideStyle>('professional')
  const [tone, setTone] = useState<SlideTone>('formal')
  const [layout, setLayout] = useState<SlideLayout>('balanced')
  const [activeTemplateId, setActiveTemplateId] = useState(
    activeTemplateByDefault,
  )

  const activeTemplate = useMemo(
    () =>
      PRESENTATION_TEMPLATES.find((template) => template.id === activeTemplateId) ??
      PRESENTATION_TEMPLATES[0],
    [activeTemplateId],
  )

  useEffect(() => {
    setSlides(activeTemplate.slides)
    setStyle(activeTemplate.style)
    setTone(activeTemplate.tone)
    setLayout(activeTemplate.layout)
  }, [activeTemplate])

  const generatedFormat = `${activeTemplate.label} | ${slides} slides | ${style}/${tone}/${layout}`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return
    onGenerate(prompt, generatedFormat)
  }

  const quickSuggestions = [
    'A polished investor deck for a design-led productivity startup',
    'A clean executive review for Q3 performance and next-quarter goals',
    'A persuasive product launch outline for a new AI workspace',
  ]

  return (
    <DashboardPage>
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/home"
          search={{ screen: 'library' }}
          className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-4 py-2.5 text-sm text-neutral-400 transition-colors hover:border-white/12 hover:bg-white/[0.04] hover:text-white"
        >
          <ArrowLeftIcon className="size-3.5" />
          <span>Back to library</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <MetaChip>Dark editorial</MetaChip>
          <MetaChip>Fixed composition</MetaChip>
          <MetaChip>Template-led</MetaChip>
        </div>
      </div>

      <DashboardHeader
        eyebrow="Presentation studio"
        title="Build the story before you build the slides"
        description="A calmer composer for shaping the brief, setting the tone, and picking a visual direction without the UI feeling overstuffed."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        <DashboardPanel className="overflow-hidden p-6 md:p-8 lg:p-10">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/18 bg-[var(--primary)]/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">
                <SparkleIcon className="size-3.5" />
                <span>New deck</span>
              </div>
              <div className="space-y-3">
                <h2 className="font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  A quieter workspace, with stronger hierarchy.
                </h2>
                <p className="max-w-2xl text-sm leading-relaxed text-neutral-400">
                  The goal is to feel premium and measured. The writing surface is
                  larger, the controls are more deliberate, and the whole page breathes
                  more.
                </p>
              </div>
            </div>

            <div className="space-y-4 rounded-[1.8rem] border border-white/8 bg-white/[0.02] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                    Presentation brief
                  </label>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                    Paste notes, outline the goal, or write the rough idea here.
                  </p>
                </div>
                <div className="rounded-full border border-white/8 bg-neutral-950/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                  {prompt.length} chars
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-white/8 bg-neutral-950/70 p-2 transition-colors focus-within:border-[var(--primary)]/28">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your presentation topic, paste your notes, or outline your key points..."
                  rows={10}
                  className="min-h-[260px] w-full resize-none rounded-[1.15rem] border-0 bg-transparent p-5 text-[15px] leading-relaxed text-neutral-100 outline-none placeholder:text-neutral-500"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Markdown supported</span>
                <span>Built for clean, structured input</span>
              </div>
            </div>

            <div className="space-y-4 rounded-[1.8rem] border border-white/8 bg-white/[0.02] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                    Slide count
                  </label>
                  <div className="mt-1 text-2xl font-semibold text-white">
                    {slides}
                  </div>
                </div>
                <div className="rounded-full border border-white/8 bg-neutral-950/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                  {SLIDE_COUNT_MIN} - {SLIDE_COUNT_MAX}
                </div>
              </div>

              <Slider
                min={SLIDE_COUNT_MIN}
                max={SLIDE_COUNT_MAX}
                value={[slides]}
                onValueChange={(value) => setSlides(value[0] ?? slides)}
                className="mt-2"
              />

              <div className="grid gap-5 lg:grid-cols-3">
                <ToggleGroup
                  label="Style"
                  options={SLIDE_STYLES}
                  value={style}
                  onChange={setStyle}
                />
                <ToggleGroup
                  label="Tone"
                  options={TONE_OPTIONS}
                  value={tone}
                  onChange={setTone}
                />
                <ToggleGroup
                  label="Layout"
                  options={LAYOUT_OPTIONS}
                  value={layout}
                  onChange={setLayout}
                />
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={!prompt.trim()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--primary)]/18 bg-[var(--primary)]/10 px-5 py-4 text-sm font-semibold text-[var(--primary)] transition-colors hover:border-[var(--primary)]/26 hover:bg-[var(--primary)]/14 disabled:cursor-not-allowed disabled:opacity-45"
            >
              <SparkleIcon className="size-4 stroke-[2px]" />
              <span>Create deck direction</span>
            </button>

            <div className="space-y-4 border-t border-white/6 pt-6">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                <ChatIcon className="size-4 text-neutral-500" />
                <span>Quick starts</span>
              </div>

              <div className="grid gap-2.5">
                {quickSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setPrompt(suggestion)}
                    className="group rounded-[1.3rem] border border-white/6 bg-white/[0.02] px-4 py-3 text-left transition-colors hover:border-[var(--primary)]/20 hover:bg-[var(--primary)]/6"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-[var(--primary)] transition-colors group-hover:bg-[var(--primary)]/10">
                        <TextIcon className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm leading-relaxed text-neutral-300 transition-colors group-hover:text-white">
                          {suggestion}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                          Tap to load into the brief
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DashboardPanel>

        <div className="space-y-6">
          <DashboardPanel className="overflow-hidden p-6 md:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/18 bg-[var(--primary)]/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">
                  <SparkleIcon className="size-3.5" />
                  <span>Featured template</span>
                </div>
                <div className="space-y-2">
                  <h2 className="font-heading text-3xl font-semibold tracking-tight text-white">
                    {activeTemplate.label}
                  </h2>
                  <p className="max-w-xl text-sm leading-relaxed text-neutral-400">
                    The active direction is shown like a stage, not a settings panel.
                    That keeps the page feeling studio-like and premium.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-right">
                <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                  Slides
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {activeTemplate.slides}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(203,163,89,0.12),transparent_50%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))] p-5">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                <span>Deck stage</span>
                <span>
                  {activeTemplate.style} / {activeTemplate.tone}
                </span>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-[1.08fr_0.92fr]">
                <div className="relative overflow-hidden rounded-[1.7rem] border border-white/8 bg-neutral-950/85 p-5">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--primary)]/70 to-transparent" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="inline-flex rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--primary)]">
                        Spotlight
                      </div>
                      <h3 className="font-heading text-2xl font-semibold tracking-tight text-white">
                        {activeTemplate.label}
                      </h3>
                    </div>
                    <div className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                      {activeTemplate.layout}
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="h-2 w-20 rounded-full bg-[var(--primary)]/80" />
                    <div className="space-y-2.5">
                      <div className="h-3.5 w-[88%] rounded-full bg-white/12" />
                      <div className="h-3.5 w-[74%] rounded-full bg-white/10" />
                      <div className="h-3.5 w-[60%] rounded-full bg-white/10" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <div className="h-14 rounded-2xl border border-white/8 bg-white/[0.03]" />
                      <div className="h-14 rounded-2xl border border-white/8 bg-[var(--primary)]/10" />
                      <div className="h-14 rounded-2xl border border-white/8 bg-white/[0.03]" />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <MetaChip>{activeTemplate.style}</MetaChip>
                    <MetaChip>{activeTemplate.tone}</MetaChip>
                    <MetaChip>{activeTemplate.layout}</MetaChip>
                  </div>
                </div>

                <div className="space-y-3 rounded-[1.7rem] border border-white/8 bg-white/[0.02] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                        Template excerpt
                      </p>
                      <h4 className="mt-1 font-heading text-lg font-semibold text-white">
                        What this feels like
                      </h4>
                    </div>
                    <div className="rounded-full border border-[var(--primary)]/18 bg-[var(--primary)]/8 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--primary)]">
                      curated
                    </div>
                  </div>

                  <div className="space-y-3 rounded-[1.4rem] border border-white/8 bg-neutral-950/75 p-4">
                    {previewLines(activeTemplate.content).map((line, index) => (
                      <div
                        key={line}
                        className={`rounded-2xl border px-4 py-3 ${
                          index === 0
                            ? 'border-[var(--primary)]/18 bg-[var(--primary)]/8'
                            : 'border-white/8 bg-white/[0.02]'
                        }`}
                      >
                        <p className="text-sm leading-relaxed text-neutral-300">
                          {line}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-3 text-center">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                        Style
                      </div>
                      <div className="mt-1 text-sm font-semibold text-white">
                        {activeTemplate.style}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-3 text-center">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                        Tone
                      </div>
                      <div className="mt-1 text-sm font-semibold text-white">
                        {activeTemplate.tone}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-3 text-center">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                        Layout
                      </div>
                      <div className="mt-1 text-sm font-semibold text-white">
                        {activeTemplate.layout}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DashboardPanel>

          <DashboardPanel className="p-5 md:p-6">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                  Template ribbon
                </p>
                <h3 className="font-heading text-xl font-semibold text-white">
                  Choose a visual direction
                </h3>
              </div>
              <div className="rounded-full border border-white/8 bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                {PRESENTATION_TEMPLATES.length} templates
              </div>
            </div>

            <div className="mt-5 flex gap-4 overflow-x-auto pb-2 pr-2 snap-x snap-mandatory">
              {PRESENTATION_TEMPLATES.map((template) => (
                <TemplateRibbonCard
                  key={template.id}
                  {...template}
                  active={template.id === activeTemplate.id}
                  onSelect={setActiveTemplateId}
                />
              ))}
            </div>
          </DashboardPanel>
        </div>
      </div>
    </DashboardPage>
  )
}
