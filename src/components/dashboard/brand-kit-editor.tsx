import { useState } from 'react'
import {
  Check as CheckIcon,
  CreditCard as CreditCardIcon,
  Palette as PaletteIcon,
  Sparkle as SparkleIcon,
} from '@phosphor-icons/react'
import { toast } from 'sonner'

import {
  DashboardHeader,
  DashboardPage,
  DashboardPanel,
} from './dashboard-primitives'
import type { BrandKit } from './types'

interface BrandKitEditorProps {
  brandKit: BrandKit
  onUpdateBrandKit: (updatedKit: BrandKit) => void
}

export function BrandKitEditor({
  brandKit,
  onUpdateBrandKit,
}: BrandKitEditorProps) {
  const [logoText, setLogoText] = useState(brandKit.logoText)
  const [primaryColor, setPrimaryColor] = useState(brandKit.primaryColor)
  const [fontHeading, setFontHeading] = useState(brandKit.fontHeading)
  const [fontSans, setFontSans] = useState(brandKit.fontSans)

  const themeColors = [
    { name: 'Aura Gold', color: '#CBA359' },
    { name: 'Classic Slate', color: '#64748B' },
    { name: 'Emerald Forest', color: '#10B981' },
    { name: 'Crimson Rose', color: '#F43F5E' },
    { name: 'Midnight Azure', color: '#3B82F6' },
  ]

  const headingOptions = [
    { id: 'Noto Serif Variable', label: 'Noto Serif' },
    { id: 'Playfair Display', label: 'Playfair Display' },
    { id: 'Inter', label: 'Inter' },
  ]

  const sansOptions = [
    { id: 'Public Sans Variable', label: 'Public Sans' },
    { id: 'Roboto', label: 'Roboto' },
    { id: 'Outfit', label: 'Outfit' },
  ]

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateBrandKit({
      logoText,
      primaryColor,
      fontHeading,
      fontSans,
    })
    toast.success('Brand kit settings saved globally!')
  }

  return (
    <DashboardPage>
      <DashboardHeader
        eyebrow="Brand kit"
        title="Brand kit settings"
        description="Keep the typography and palette aligned with the rest of the workspace."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSave} className="space-y-6">
          <DashboardPanel className="space-y-6 p-6 md:p-7">
            <div className="flex items-center gap-2 border-b border-white/6 pb-4">
              <PaletteIcon className="size-5 text-[var(--primary)]" />
              <h3 className="text-sm font-semibold tracking-tight text-white">
                Visual guidelines
              </h3>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                Logo or brand name
              </label>
              <input
                type="text"
                value={logoText}
                onChange={(e) => setLogoText(e.target.value)}
                className="w-full rounded-2xl border border-white/8 bg-neutral-900/55 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors placeholder:text-neutral-500 focus:border-[var(--primary)]/28"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                Brand accent
              </label>
              <div className="flex items-center gap-3">
                <div className="relative size-11 overflow-hidden rounded-2xl border border-white/8">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="absolute inset-0 size-full cursor-pointer border-none p-0 bg-transparent"
                  />
                </div>
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-32 rounded-2xl border border-white/8 bg-neutral-900/55 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors focus:border-[var(--primary)]/28"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {themeColors.map((color) => (
                  <button
                    key={color.color}
                    type="button"
                    onClick={() => setPrimaryColor(color.color)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.02] px-3 py-2 text-xs font-medium text-neutral-400 transition-colors hover:border-white/12 hover:text-white"
                  >
                    <span
                      style={{ backgroundColor: color.color }}
                      className="size-3.5 rounded-full border border-white/10"
                    />
                    <span>{color.name}</span>
                    {primaryColor.toLowerCase() ===
                    color.color.toLowerCase() ? (
                      <CheckIcon className="size-3.5 text-[var(--primary)]" />
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                  Heading font
                </label>
                <div className="space-y-2">
                  {headingOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-colors ${
                        fontHeading === opt.id
                          ? 'border-[var(--primary)]/22 bg-[var(--primary)]/8 text-white'
                          : 'border-white/8 bg-white/[0.02] text-neutral-400 hover:border-white/12 hover:text-white'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <input
                        type="radio"
                        name="fontHeading"
                        value={opt.id}
                        checked={fontHeading === opt.id}
                        onChange={() => setFontHeading(opt.id as BrandKit['fontHeading'])}
                        className="sr-only"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                  Body font
                </label>
                <div className="space-y-2">
                  {sansOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm transition-colors ${
                        fontSans === opt.id
                          ? 'border-[var(--primary)]/22 bg-[var(--primary)]/8 text-white'
                          : 'border-white/8 bg-white/[0.02] text-neutral-400 hover:border-white/12 hover:text-white'
                      }`}
                    >
                      <span>{opt.label}</span>
                      <input
                        type="radio"
                        name="fontSans"
                        value={opt.id}
                        checked={fontSans === opt.id}
                        onChange={() => setFontSans(opt.id as BrandKit['fontSans'])}
                        className="sr-only"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </DashboardPanel>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--primary)]/18 bg-[var(--primary)]/10 px-5 py-3.5 text-sm font-semibold text-[var(--primary)] transition-colors hover:border-[var(--primary)]/26 hover:bg-[var(--primary)]/14"
          >
            <SparkleIcon className="size-4 stroke-[2px]" />
            <span>Apply brand settings</span>
          </button>
        </form>

        <DashboardPanel className="space-y-5 p-6 md:p-7">
          <div className="flex items-center gap-2 border-b border-white/6 pb-4">
            <CreditCardIcon className="size-5 text-neutral-400" />
            <h3 className="text-sm font-semibold tracking-tight text-white">
              Billing & plan
            </h3>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Current plan</span>
              <span className="rounded-full border border-[var(--primary)]/18 bg-[var(--primary)]/8 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--primary)]">
                Professional Pro
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Billing cycle</span>
              <span className="text-white">Monthly ($24)</span>
            </div>

            <div className="flex items-center justify-between border-t border-white/6 pt-4">
              <span className="text-neutral-400">Next renewal</span>
              <span className="font-mono text-neutral-500">July 20, 2026</span>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex w-full items-center justify-center rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm font-medium text-neutral-300 transition-colors hover:border-white/12 hover:bg-white/[0.05] hover:text-white"
          >
            Manage billing portal
          </button>
        </DashboardPanel>
      </div>
    </DashboardPage>
  )
}
