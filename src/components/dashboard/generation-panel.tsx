import { CheckCircle as CheckIcon, Sparkle as SparkleIcon } from '@phosphor-icons/react'

import { DashboardPanel } from './dashboard-primitives'

interface GenerationPanelProps {
  prompt: string
  format: string
  step: number
}

const steps = [
  {
    label: 'Structuring outline',
    desc: 'Parsing the prompt into a focused slide hierarchy.',
  },
  {
    label: 'Balancing layout',
    desc: 'Tuning spacing, hierarchy, and visual rhythm.',
  },
  {
    label: 'Applying brand tone',
    desc: 'Finalizing typography and palette alignment.',
  },
]

export function GenerationPanel({ prompt, format, step }: GenerationPanelProps) {
  const progress = Math.min(((step + 1) / steps.length) * 100, 100)

  return (
    <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
      <DashboardPanel className="p-6 md:p-7">
        <div className="flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/18 bg-[var(--primary)]/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">
                <SparkleIcon className="size-3.5" />
                <span>Generating deck</span>
              </div>
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-white">
                Designing your deck
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-neutral-400">
                We are shaping the outline for a {format} deck and keeping the
                result aligned with the same calm editorial theme.
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-right">
              <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                Progress
              </p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {Math.min(step + 1, steps.length)}/{steps.length}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-neutral-500">
              <span>Prompt excerpt</span>
              <span>{format}</span>
            </div>
            <p className="rounded-2xl border border-white/6 bg-neutral-900/55 px-4 py-3 text-sm leading-relaxed text-neutral-300">
              {prompt ? `"${prompt}"` : 'Waiting for prompt...'}
            </p>
          </div>

          <div className="space-y-3">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
              <div
                className="h-full rounded-full bg-[var(--primary)] transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-2">
              {steps.map((item, idx) => {
                const isDone = step > idx
                const isActive = step === idx

                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.015] px-4 py-3 transition-colors"
                  >
                    <div
                      className={`mt-0.5 flex size-6 items-center justify-center rounded-full border ${
                        isDone || isActive
                          ? 'border-[var(--primary)]/25 bg-[var(--primary)]/10 text-[var(--primary)]'
                          : 'border-white/10 bg-white/[0.02] text-neutral-500'
                      }`}
                    >
                      {isDone ? (
                        <CheckIcon className="size-3.5" weight="fill" />
                      ) : (
                        <span className="text-[10px] font-semibold">{idx + 1}</span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div
                        className={`text-sm font-semibold tracking-tight ${
                          isActive ? 'text-white' : 'text-neutral-300'
                        }`}
                      >
                        {item.label}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-1 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                      {isDone ? 'Done' : isActive ? 'Working' : 'Pending'}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </DashboardPanel>

      <DashboardPanel className="p-6 md:p-7">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-500">
                Slide preview
              </p>
              <h3 className="mt-1 font-heading text-xl font-semibold text-white">
                Quiet composition
              </h3>
            </div>
            <div className="rounded-full border border-white/8 bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-neutral-500">
              16:9
            </div>
          </div>

          <div className="mt-5 grid flex-1 gap-4">
            {[0, 1, 2].map((idx) => {
              const isFilled = step > idx
              const isActive = step === idx

              return (
                <div
                  key={idx}
                  className={`rounded-[1.5rem] border p-4 transition-all ${
                    isFilled
                      ? 'border-white/8 bg-neutral-900/70'
                      : isActive
                        ? 'border-[var(--primary)]/22 bg-white/[0.02]'
                        : 'border-white/5 bg-white/[0.01] opacity-45'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.22em] text-neutral-500">
                    <span>Slide 0{idx + 1}</span>
                    <span>{isFilled ? 'Ready' : isActive ? 'Drafting' : 'Queued'}</span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div
                      className={`h-2 rounded-full ${
                        isFilled || isActive
                          ? 'bg-[var(--primary)]/70'
                          : 'bg-white/10'
                      }`}
                    />
                    <div className="h-2 w-4/5 rounded-full bg-white/10" />
                    <div className="h-2 w-3/5 rounded-full bg-white/10" />
                    <div className="h-2 w-2/3 rounded-full bg-white/10" />
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                    <span>Aura editorial system</span>
                    <span>Clean</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </DashboardPanel>
    </div>
  )
}
