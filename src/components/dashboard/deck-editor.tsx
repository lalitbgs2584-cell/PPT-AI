import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowLeft as ArrowLeftIcon,
  DownloadSimple as ExportIcon,
  Sparkle as SparkleIcon,
  CaretUp as UpIcon,
  CaretDown as DownIcon,
  Plus as PlusIcon,
  Trash as TrashIcon,
  Layout as LayoutIcon,
  TextT as TextIcon,
  GridNine as GridIcon,
  MagnifyingGlassPlus as ZoomIcon,
  CloudCheck as CloudIcon,
} from '@phosphor-icons/react'
import type { Deck, Slide, BrandKit } from './types'
import { toast } from 'sonner'

interface DeckEditorProps {
  deck: Deck
  brandKit: BrandKit
  onUpdateDeck: (updatedDeck: Deck) => void
}

export function DeckEditor({ deck, brandKit, onUpdateDeck }: DeckEditorProps) {
  const [activeSlideId, setActiveSlideId] = useState(deck.slides[0]?.id || '')
  const [showGridLines, setShowGridLines] = useState(true)

  const activeSlide = deck.slides.find((s) => s.id === activeSlideId)

  // Update slide property in state
  const handleUpdateSlide = (updatedSlide: Slide) => {
    const updatedSlides = deck.slides.map((s) =>
      s.id === updatedSlide.id ? updatedSlide : s,
    )
    onUpdateDeck({
      ...deck,
      slides: updatedSlides,
    })
  }

  // AI Action: Simplify Text
  const handleAISimplify = () => {
    if (!activeSlide) return
    toast.loading('AI is rewriting text for brevity...')

    setTimeout(() => {
      toast.dismiss()
      const simplifiedBullets =
        activeSlide.bullets?.map((b) => {
          if (b.length > 50) {
            return b.substring(0, 47) + '...'
          }
          return b
        }) || []

      handleUpdateSlide({
        ...activeSlide,
        bullets: simplifiedBullets,
      })
      toast.success('Slide content simplified successfully!')
    }, 1000)
  }

  // AI Action: Match Brand Colors
  const handleMatchBrand = () => {
    toast.success(
      `Theme palette aligned with ${brandKit.logoText}'s active guidelines!`,
    )
  }

  // Add a new slide
  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      title: 'Slide Header Title',
      subtitle: 'Slide description details',
      layoutType: 'split',
      bullets: [
        'Premium asymmetric layout outline detail',
        'Grid spacing matching Noto Serif parameters',
        'Third responsive point description',
      ],
    }
    const updatedSlides = [...deck.slides, newSlide]
    onUpdateDeck({
      ...deck,
      slides: updatedSlides,
      slideCount: updatedSlides.length,
    })
    setActiveSlideId(newSlide.id)
    toast.success('New slide added')
  }

  // Delete slide
  const handleDeleteSlide = (id: string) => {
    if (deck.slides.length <= 1) {
      toast.error('Decks must have at least 1 slide')
      return
    }
    const updatedSlides = deck.slides.filter((s) => s.id !== id)
    onUpdateDeck({
      ...deck,
      slides: updatedSlides,
      slideCount: updatedSlides.length,
    })
    if (activeSlideId === id) {
      setActiveSlideId(updatedSlides[0]?.id || '')
    }
    toast.success('Slide removed')
  }

  // Reorder slide up/down
  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= deck.slides.length) return

    const updatedSlides = [...deck.slides]
    const temp = updatedSlides[index]
    updatedSlides[index] = updatedSlides[newIndex]
    updatedSlides[newIndex] = temp

    onUpdateDeck({
      ...deck,
      slides: updatedSlides,
    })
  }

  // PowerPoint Export Action
  const handleExport = () => {
    toast.loading('Compiling vector PowerPoint package (.pptx)...')
    setTimeout(() => {
      toast.dismiss()
      toast.success(
        `Deck "${deck.title}" exported successfully as vector PPTX!`,
      )
    }, 1500)
  }

  return (
    <div className="flex h-full flex-col bg-neutral-950">
      {/* Editor top toolbar */}
      <header className="flex h-16 w-full items-center justify-between border-b border-white/5 bg-neutral-900/60 px-6 shrink-0 select-none">
        <div className="flex items-center gap-4">
          <Link
            to="/home"
            search={{ screen: 'library' }}
            className="p-2 rounded-full border border-white/10 bg-white/[0.01] text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="size-4" />
          </Link>
          <div className="flex flex-col">
            {/* Inline editable deck title */}
            <input
              type="text"
              value={deck.title}
              onChange={(e) => onUpdateDeck({ ...deck, title: e.target.value })}
              className="font-heading text-lg font-semibold text-white bg-transparent border-none outline-none focus:border-b focus:border-white/20 px-1 w-64 md:w-80 transition-colors"
            />
            <div className="flex items-center gap-2 pl-1 mt-0.5 select-none">
              <CloudIcon className="size-3.5 text-green-500" weight="fill" />
              <span className="text-[10px] text-neutral-400 font-mono">
                Saved in Cloud • {deck.slideCount} slides
              </span>
            </div>
          </div>
        </div>

        {/* Primary gold gradient export button */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#CBA359] to-[#B58D43] px-5 py-3 text-xs font-semibold text-neutral-950 shadow-[0_0_20px_rgba(203,163,89,0.2)] transition-all hover:bg-[var(--primary)]/90 hover:scale-[1.01]"
        >
          <ExportIcon className="size-4 stroke-[2.5px]" />
          <span>Export PPTX</span>
        </button>
      </header>

      {/* Editor Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Slide Sidebar (Thumbnails) */}
        <aside className="w-56 border-r border-white/5 bg-neutral-900/10 p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.24em] text-neutral-500 select-none">
              Slide Outline
            </div>

            <div className="space-y-3">
              {deck.slides.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => setActiveSlideId(s.id)}
                  className={`group relative flex flex-col gap-2 rounded-xl border p-3 cursor-pointer select-none transition-all duration-300 ${
                    activeSlideId === s.id
                      ? 'border-[var(--primary)]/50 bg-[var(--primary)]/5 shadow-[0_0_20px_rgba(203,163,89,0.06)]'
                      : 'border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Miniature representation */}
                  <div className="aspect-[16/10] w-full rounded-lg border border-white/5 bg-neutral-950 p-2 flex flex-col justify-between overflow-hidden shadow-inner">
                    <div className="h-[2px] w-1/3 bg-neutral-800 rounded-sm" />
                    <div className="space-y-1.5 my-auto">
                      <div className="h-[2px] w-[85%] bg-neutral-800 rounded-sm" />
                      <div className="h-[2px] w-[50%] bg-neutral-850 rounded-sm" />
                    </div>
                    <div className="h-[2px] w-1/4 bg-neutral-800 rounded-sm self-end" />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                    <span className={activeSlideId === s.id ? 'text-[var(--primary)] font-semibold' : ''}>
                      Slide {idx + 1}
                    </span>

                    {/* Quick actions on thumbnail */}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMoveSlide(idx, 'up')
                        }}
                        disabled={idx === 0}
                        className="p-0.5 hover:text-white disabled:opacity-30"
                      >
                        <UpIcon className="size-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMoveSlide(idx, 'down')
                        }}
                        disabled={idx === deck.slides.length - 1}
                        className="p-0.5 hover:text-white disabled:opacity-30"
                      >
                        <DownIcon className="size-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteSlide(s.id)
                        }}
                        className="p-0.5 hover:text-destructive"
                      >
                        <TrashIcon className="size-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Slide CTA */}
          <button
            onClick={handleAddSlide}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 bg-white/[0.01] py-3 text-xs font-medium text-neutral-400 hover:text-white hover:border-white/20 transition-all select-none"
          >
            <PlusIcon className="size-3.5" />
            <span>Add Slide</span>
          </button>
        </aside>

        {/* Central WYSIWYG Canvas with Dot Matrix grid overlay */}
        <div className="flex-1 bg-neutral-950 p-10 flex flex-col items-center justify-center overflow-y-auto relative bg-[radial-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:24px_24px]">
          {activeSlide ? (
            <div className="w-full max-w-3xl flex flex-col gap-4">
              {/* Slide Presentation Frame */}
              <div
                style={
                  {
                    fontFamily:
                      brandKit.fontHeading === 'Playfair Display'
                        ? "'Playfair Display', serif"
                        : brandKit.fontHeading === 'Inter'
                          ? "'Inter', sans-serif"
                          : "'Noto Serif Variable', serif",
                  }
                }
                className="relative aspect-[16/10] w-full rounded-2xl border border-white/10 bg-neutral-900 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] p-10 flex flex-col justify-between overflow-hidden group/slide"
              >
                {/* Asymmetric layout line guides overlay if grid toggled */}
                {showGridLines && (
                  <div className="absolute inset-0 pointer-events-none z-0 border border-[var(--primary)]/5 flex justify-between select-none">
                    <div className="w-[1.5px] h-full bg-[var(--primary)]/[0.02]" />
                    <div className="w-[1.5px] h-full bg-[var(--primary)]/[0.02]" />
                  </div>
                )}

                {/* Gloss line */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[var(--primary)]/50 to-transparent z-10" />

                {/* Decorative brand line dynamically matches selected color */}
                <div
                  style={{ backgroundColor: brandKit.primaryColor }}
                  className="absolute left-0 top-0 bottom-0 w-1 opacity-80 z-10"
                />

                {/* Canvas header details */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4 text-[10px] tracking-widest text-neutral-400 uppercase font-mono z-10 select-none">
                  <span>{brandKit.logoText || 'Aura AI'}</span>
                  <span>Active Segment Studio</span>
                </div>

                {/* Dynamic Presentation Layout Templates */}
                <div className="my-auto space-y-6 z-10">
                  {activeSlide.layoutType === 'hero' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                      <div className="md:col-span-2 space-y-4">
                        <span className="inline-flex rounded-full border border-[var(--primary)] px-3 py-1 text-[9px] font-semibold text-[var(--primary)] uppercase tracking-wider select-none">
                          Key Metric Focus
                        </span>
                        <div className="relative group/field rounded-lg border border-transparent hover:border-white/10 focus-within:border-[var(--primary)]/30 focus-within:bg-neutral-950/20 p-2 transition-all">
                          <textarea
                            value={activeSlide.title}
                            onChange={(e) =>
                              handleUpdateSlide({
                                ...activeSlide,
                                title: e.target.value,
                              })
                            }
                            rows={2}
                            className="w-full bg-transparent border-none outline-none font-heading text-3xl font-semibold text-white leading-tight resize-none"
                          />
                          <span className="absolute top-1.5 right-1.5 opacity-0 group-hover/field:opacity-100 transition-opacity text-[8px] text-neutral-500 font-mono select-none">
                            Title Layer
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-start border-l border-white/10 pl-6 space-y-1">
                        <span
                          style={{ color: brandKit.primaryColor }}
                          className="font-heading text-5xl font-light leading-none"
                        >
                          {activeSlide.stats?.number || '$2.4M'}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-sans">
                          {activeSlide.stats?.label || 'Total value generated'}
                        </span>
                      </div>
                    </div>
                  )}

                  {activeSlide.layoutType === 'split' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col justify-center space-y-4">
                        <div className="relative group/field rounded-lg border border-transparent hover:border-white/10 focus-within:border-[var(--primary)]/30 focus-within:bg-neutral-950/20 p-2 transition-all">
                          <textarea
                            value={activeSlide.title}
                            onChange={(e) =>
                              handleUpdateSlide({
                                ...activeSlide,
                                title: e.target.value,
                              })
                            }
                            rows={3}
                            className="w-full bg-transparent border-none outline-none font-heading text-2xl font-medium text-white leading-snug resize-none"
                          />
                          <span className="absolute top-1.5 right-1.5 opacity-0 group-hover/field:opacity-100 transition-opacity text-[8px] text-neutral-500 font-mono select-none">
                            Title Layer
                          </span>
                        </div>
                        {activeSlide.subtitle && (
                          <div className="relative group/field rounded-lg border border-transparent hover:border-white/10 focus-within:border-[var(--primary)]/30 focus-within:bg-neutral-950/20 p-1.5 transition-all">
                            <input
                              type="text"
                              value={activeSlide.subtitle}
                              onChange={(e) =>
                                handleUpdateSlide({
                                  ...activeSlide,
                                  subtitle: e.target.value,
                                })
                              }
                              className="w-full bg-transparent border-none outline-none text-xs text-neutral-400 font-sans"
                            />
                            <span className="absolute top-1 right-1 opacity-0 group-hover/field:opacity-100 transition-opacity text-[8px] text-neutral-500 font-mono select-none">
                              Sub-Layer
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-3 font-sans">
                        {activeSlide.bullets?.map((bullet, bIdx) => (
                          <div
                            key={bIdx}
                            className="flex gap-2.5 items-start text-xs leading-relaxed text-neutral-300 relative group/field rounded-lg border border-transparent hover:border-white/10 focus-within:border-[var(--primary)]/30 focus-within:bg-neutral-950/20 p-2 transition-all"
                          >
                            <span
                              style={{ color: brandKit.primaryColor }}
                              className="text-base leading-none select-none"
                            >
                              •
                            </span>
                            <textarea
                              value={bullet}
                              onChange={(e) => {
                                const newBullets = [
                                  ...(activeSlide.bullets || []),
                                ]
                                newBullets[bIdx] = e.target.value
                                handleUpdateSlide({
                                  ...activeSlide,
                                  bullets: newBullets,
                                })
                              }}
                              rows={2}
                              className="flex-1 bg-transparent border-none outline-none resize-none leading-relaxed"
                            />
                            <span className="absolute top-1 right-1 opacity-0 group-hover/field:opacity-100 transition-opacity text-[7px] text-neutral-500 font-mono select-none">
                              Bullet Layer {bIdx + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSlide.layoutType === 'grid' && (
                    <div className="space-y-6">
                      <div className="relative group/field rounded-lg border border-transparent hover:border-white/10 focus-within:border-[var(--primary)]/30 focus-within:bg-neutral-950/20 p-2 transition-all">
                        <textarea
                          value={activeSlide.title}
                          onChange={(e) =>
                            handleUpdateSlide({
                              ...activeSlide,
                              title: e.target.value,
                            })
                          }
                          rows={2}
                          className="w-full bg-transparent border-none outline-none font-heading text-2xl font-semibold text-white leading-tight resize-none"
                        />
                        <span className="absolute top-1.5 right-1.5 opacity-0 group-hover/field:opacity-100 transition-opacity text-[8px] text-neutral-500 font-mono select-none">
                          Title Layer
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                        {activeSlide.bullets?.map((bullet, bIdx) => (
                          <div
                            key={bIdx}
                            className="border border-white/5 bg-white/[0.01] rounded-xl p-4 flex flex-col gap-2 shadow-sm relative group/field hover:border-white/10 transition-all focus-within:border-[var(--primary)]/30"
                          >
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--primary)] select-none">
                              0{bIdx + 1} / Outline
                            </span>
                            <textarea
                              value={bullet}
                              onChange={(e) => {
                                const newBullets = [
                                  ...(activeSlide.bullets || []),
                                ]
                                newBullets[bIdx] = e.target.value
                                handleUpdateSlide({
                                  ...activeSlide,
                                  bullets: newBullets,
                                })
                              }}
                              rows={3}
                              className="w-full bg-transparent border-none outline-none text-[11px] leading-relaxed text-neutral-300 resize-none"
                            />
                            <span className="absolute bottom-2 right-2 opacity-0 group-hover/field:opacity-100 transition-opacity text-[7px] text-neutral-500 font-mono select-none">
                              Card Layer
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSlide.layoutType === 'title' && (
                    <div className="space-y-4 text-center max-w-xl mx-auto py-8">
                      <span className="inline-flex rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-widest text-[var(--primary)] select-none">
                        Opening Segment
                      </span>
                      <div className="relative group/field rounded-lg border border-transparent hover:border-white/10 focus-within:border-[var(--primary)]/30 focus-within:bg-neutral-950/20 p-2 transition-all">
                        <textarea
                          value={activeSlide.title}
                          onChange={(e) =>
                            handleUpdateSlide({
                              ...activeSlide,
                              title: e.target.value,
                            })
                          }
                          rows={2}
                          className="w-full bg-transparent border-none outline-none font-heading text-4xl font-bold text-white text-center leading-tight resize-none"
                        />
                        <span className="absolute top-1.5 right-1.5 opacity-0 group-hover/field:opacity-100 transition-opacity text-[8px] text-neutral-500 font-mono select-none">
                          Title Layer
                        </span>
                      </div>
                      {activeSlide.subtitle && (
                        <div className="relative group/field rounded-lg border border-transparent hover:border-white/10 focus-within:border-[var(--primary)]/30 focus-within:bg-neutral-950/20 p-1.5 transition-all">
                          <input
                            type="text"
                            value={activeSlide.subtitle}
                            onChange={(e) =>
                              handleUpdateSlide({
                                ...activeSlide,
                                subtitle: e.target.value,
                              })
                            }
                            className="w-full bg-transparent border-none outline-none text-sm text-neutral-400 text-center font-sans"
                          />
                          <span className="absolute top-1 right-1 opacity-0 group-hover/field:opacity-100 transition-opacity text-[8px] text-neutral-500 font-mono select-none">
                            Sub-Layer
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Canvas footer metadata details */}
                <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[9px] text-neutral-500 font-mono select-none">
                  <span>
                    Slide Template Layout: {activeSlide.layoutType.toUpperCase()}
                  </span>
                  <span>Press slide elements to edit directly</span>
                </div>
              </div>

              {/* Bottom Canvas Toolbar */}
              <div className="flex items-center justify-between px-2 text-[10px] text-neutral-400 font-mono select-none">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowGridLines(!showGridLines)}
                    className={`flex items-center gap-1.5 p-1 rounded-md transition-colors ${
                      showGridLines ? 'text-[var(--primary)] font-semibold' : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    <GridIcon className="size-3.5" />
                    <span>Grid: {showGridLines ? 'Active' : 'Muted'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <ZoomIcon className="size-3.5" />
                  <span>Fit Canvas (76%)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 text-center p-8 select-none">
              <h3 className="font-heading text-lg font-semibold text-white">
                No active slide
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Select a slide from the sidebar to begin.
              </p>
            </div>
          )}
        </div>

        {/* Right Sidebar Toolbar for AI and design configurations */}
        <aside className="w-64 border-l border-white/5 bg-neutral-900/20 p-5 flex flex-col gap-6 shrink-0 overflow-y-auto select-none">
          {/* AI Copilot actions */}
          <div className="space-y-4">
            <div className="text-[9px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
              AI Actions
            </div>

            <button
              onClick={handleAISimplify}
              className="flex w-full items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left text-xs text-neutral-200 transition-all hover:bg-white/[0.05] hover:border-white/15"
            >
              <SparkleIcon className="size-4 text-[var(--primary)] animate-pulse" />
              <div className="flex flex-col">
                <span className="font-semibold text-white">
                  Simplify slide text
                </span>
                <span className="text-[9px] text-neutral-400">
                  Rewrites long bullets to fit layout
                </span>
              </div>
            </button>

            <button
              onClick={handleMatchBrand}
              className="flex w-full items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-left text-xs text-neutral-200 transition-all hover:bg-white/[0.05] hover:border-white/15"
            >
              <LayoutIcon className="size-4 text-[var(--primary)]" />
              <div className="flex flex-col">
                <span className="font-semibold text-white">
                  Match Brand Kit
                </span>
                <span className="text-[9px] text-neutral-400">
                  Align design tokens dynamically
                </span>
              </div>
            </button>
          </div>

          <div className="h-px w-full bg-white/5" />

          {/* Design Layout Customizations */}
          {activeSlide && (
            <div className="space-y-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.24em] text-neutral-500 flex items-center gap-1.5">
                <TextIcon className="size-3.5" />
                <span>Layout template</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'title', label: 'Title Slide' },
                  { id: 'split', label: 'Asymmetric Split' },
                  { id: 'grid', label: 'Three Grid' },
                  { id: 'hero', label: 'Metric Hero' },
                ].map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() =>
                      handleUpdateSlide({
                        ...activeSlide,
                        layoutType: layout.id as any,
                      })
                    }
                    className={`rounded-xl border p-2.5 text-center text-[10px] font-semibold leading-relaxed transition-all ${
                      activeSlide.layoutType === layout.id
                        ? 'border-[var(--primary)]/60 bg-[var(--primary)]/10 text-[var(--primary)] shadow-sm'
                        : 'border-white/5 bg-white/[0.01] text-neutral-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    {layout.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
