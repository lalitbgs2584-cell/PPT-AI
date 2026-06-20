import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Sparkles,
  Play,
  Check,
  Layout,
  Type,
  Maximize2,
  Share2,
  History,
  FileDown,
} from 'lucide-react'
import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [activeProofSlide, setActiveProofSlide] = useState(0)

  // Handle nav solidifying on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const proofSlides = [
    {
      tab: 'Investor Pitch',
      title: 'The Next Era of Venture Capital',
      subtitle: 'Series A Capital Allocation & Growth Thesis',
      theme: 'Minimalist Editorial',
      content: (
        <div className="flex h-full flex-col justify-between p-8 text-neutral-200">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4 text-xs font-medium uppercase tracking-wider text-neutral-400">
            <span>Aura Capital Partners</span>
            <span>Confidential — Q3 2026</span>
          </div>
          <div className="my-auto space-y-6">
            <span className="inline-flex rounded-full border border-[var(--primary)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
              Growth Thesis
            </span>
            <h1 className="font-heading text-4xl font-semibold tracking-tight text-white md:text-5xl leading-tight">
              Scaling through decentralized venture architecture
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-neutral-400">
              We build companies in weeks rather than quarters, leveraging high-fidelity design standards and automated engineering guardrails.
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-neutral-800 pt-4 text-xs text-neutral-500">
            <span>Slide 01 / 12</span>
            <span>www.auracapital.io</span>
          </div>
        </div>
      ),
    },
    {
      tab: 'Agency Proposal',
      title: 'Digital Experience Transformation',
      subtitle: 'Brand Strategy & Identity Framework',
      theme: 'High Contrast Typographic',
      content: (
        <div className="grid h-full grid-cols-1 md:grid-cols-2 text-neutral-200">
          <div className="flex flex-col justify-between border-r border-neutral-800 p-8">
            <div className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              02 / The Challenge
            </div>
            <div className="my-auto space-y-4">
              <h2 className="font-heading text-3xl font-medium tracking-tight text-white leading-snug">
                Traditional brands are losing equity in silent markets.
              </h2>
            </div>
            <div className="text-xs text-neutral-500">Aura Creative Agency</div>
          </div>
          <div className="grid grid-rows-3 border-t border-neutral-800 md:border-t-0">
            <div className="border-b border-neutral-800 p-6 flex flex-col justify-center">
              <span className="text-xs font-medium text-[var(--primary)] uppercase tracking-wider">
                Problem
              </span>
              <p className="mt-1 text-sm text-neutral-400">
                Information overload makes standard brand messaging invisible.
              </p>
            </div>
            <div className="border-b border-neutral-800 p-6 flex flex-col justify-center">
              <span className="text-xs font-medium text-[var(--primary)] uppercase tracking-wider">
                Our Solution
              </span>
              <p className="mt-1 text-sm text-neutral-400">
                Bespoke design systems that communicate value through restraint.
              </p>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <span className="text-xs font-medium text-[var(--primary)] uppercase tracking-wider">
                Impact
              </span>
              <p className="mt-1 text-sm text-neutral-400">
                Average +42% user retention and premium perception uplift.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      tab: 'Keynote Talk',
      title: 'The Art of Simplification',
      subtitle: 'Design System Keynote',
      theme: 'Statement/Impact Grid',
      content: (
        <div className="flex h-full flex-col justify-between p-8 text-neutral-200">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>Keynote Presentation</span>
            <span>Visual Literacy</span>
          </div>
          <div className="my-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[var(--primary)]">
                Core Principle
              </span>
              <h2 className="font-heading text-4xl font-semibold text-white tracking-tight">
                Simplicity is the ultimate sophistication.
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end border-l border-neutral-800 pl-6 md:pl-0 md:border-l-0 md:border-r md:pr-6">
              <span className="font-heading text-7xl font-light text-[var(--primary)] leading-none">
                84%
              </span>
              <span className="mt-2 text-xs uppercase tracking-wider text-neutral-400 text-left md:text-right">
                of clients prefer minimalist pitches
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-neutral-800 pt-4 text-xs text-neutral-500">
            <span>Slide 05</span>
            <span>Aura Design Systems</span>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="dark bg-neutral-950 text-neutral-100 min-h-screen selection:bg-[var(--primary)] selection:text-neutral-950 font-sans relative overflow-x-hidden">
      {/* Background Subtle Grain Texture Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none z-50" />

      {/* Hero Soft Glow / Bloom Effect */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[var(--primary)]/10 blur-[160px] pointer-events-none" />

      {/* Navigation */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-neutral-950/85 backdrop-blur-md border-b border-neutral-900 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2">
            <span className="font-heading text-2xl font-bold tracking-tight text-white">
              Aura<span className="text-[var(--primary)] font-light">.</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-400">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              Process
            </a>
            <a href="#proof" className="hover:text-white transition-colors">
              Gallery
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-neutral-950 rounded-full font-medium text-sm transition-all shadow-[0_0_20px_rgba(203,163,89,0.15)]"
              asChild
            >
              <a href="#">Start free</a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-36 max-w-7xl mx-auto px-6 flex flex-col items-center relative">
        <div className="text-center max-w-3xl space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
          <div className="inline-flex items-center space-x-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-4 py-1.5 text-xs text-neutral-300 font-medium">
            <Sparkles className="size-3.5 text-[var(--primary)] animate-pulse" />
            <span>Introducing Aura AI Deck Maker</span>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] md:leading-[1.05]">
            Decks that don't <br />
            look AI-made<span className="text-[var(--primary)]">.</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Outline your thoughts and let Aura output executive-ready, high-end layouts. Built for founders, consultants, and leaders who refuse ugly templates.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-neutral-950 rounded-full font-medium px-8 w-full sm:w-auto shadow-[0_0_30px_rgba(203,163,89,0.2)]"
              asChild
            >
              <a href="#">Generate your deck</a>
            </Button>
            <a
              href="#demo"
              className="group flex items-center space-x-2 text-sm font-semibold text-neutral-300 hover:text-white transition-colors py-2 px-4"
            >
              <Play className="size-4 text-[var(--primary)] fill-[var(--primary)]" />
              <span>Watch 1-min demo</span>
            </a>
          </div>
        </div>

        {/* 3D Slide Fan Representation */}
        <div className="mt-16 md:mt-24 w-full max-w-5xl relative aspect-[16/9] flex items-center justify-center group">
          {/* Soft back glow */}
          <div className="absolute inset-0 bg-[var(--primary)]/5 blur-[120px] rounded-full pointer-events-none transform -translate-y-8" />

          {/* Left Slide Mockup (Angled Back) */}
          <div className="absolute left-[5%] md:left-[10%] w-[55%] aspect-[16/10] bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl transition-all duration-700 ease-out transform -rotate-12 translate-x-4 -translate-y-8 scale-90 opacity-60 group-hover:-rotate-[15deg] group-hover:-translate-x-4 group-hover:-translate-y-12 select-none overflow-hidden hidden md:block">
            <div className="absolute inset-0 bg-neutral-950/40 z-10" />
            <div className="w-full h-full scale-[0.85] origin-center opacity-85">
              {proofSlides[0].content}
            </div>
          </div>

          {/* Right Slide Mockup (Angled Back) */}
          <div className="absolute right-[5%] md:right-[10%] w-[55%] aspect-[16/10] bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl transition-all duration-700 ease-out transform rotate-12 -translate-x-4 -translate-y-8 scale-90 opacity-60 group-hover:rotate-[15deg] group-hover:translate-x-4 group-hover:translate-y-12 select-none overflow-hidden hidden md:block">
            <div className="absolute inset-0 bg-neutral-950/40 z-10" />
            <div className="w-full h-full scale-[0.85] origin-center opacity-85">
              {proofSlides[1].content}
            </div>
          </div>

          {/* Center Main Slide Mockup (Floating Front) */}
          <div className="relative w-[90%] md:w-[70%] aspect-[16/10] bg-neutral-900 border border-neutral-800/80 rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out transform group-hover:-translate-y-4 group-hover:scale-[1.02] overflow-hidden z-20">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--primary)]/60 to-transparent" />
            <div className="w-full h-full">
              {proofSlides[2].content}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 border-t border-neutral-900 bg-neutral-950/50 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[var(--primary)] font-semibold">
              The Process
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white">
              From raw thought to elite layout
            </h2>
            <p className="text-neutral-400">
              No templates. No placeholder shapes. Just gorgeous typography and grids.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col space-y-6 p-6 rounded-2xl border border-neutral-900 bg-neutral-900/20 backdrop-blur-sm relative group hover:border-neutral-800 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--primary)]">01 / CONCEPT</span>
                <span className="text-xs text-neutral-500 uppercase">Input</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-white">
                Provide an outline or prompt
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Paste your rough meeting notes, product outline, or pitch ideas. Aura accepts nested hierarchies, raw bullets, or plain essays.
              </p>
              <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-950 p-4 aspect-[16/10] flex flex-col justify-between text-left text-xs font-mono text-neutral-500 select-none">
                <span className="text-green-500"># Input Outline</span>
                <div className="space-y-1.5">
                  <div className="h-1.5 w-[85%] bg-neutral-800 rounded" />
                  <div className="h-1.5 w-[90%] bg-neutral-800 rounded" />
                  <div className="h-1.5 w-[65%] bg-neutral-800 rounded pl-4" />
                  <div className="h-1.5 w-[50%] bg-neutral-800 rounded pl-4" />
                </div>
                <span className="text-[var(--primary)] cursor-pulse">_ Generating structured layout</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col space-y-6 p-6 rounded-2xl border border-neutral-900 bg-neutral-900/20 backdrop-blur-sm relative group hover:border-neutral-800 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--primary)]">02 / STRUCTURE</span>
                <span className="text-xs text-neutral-500 uppercase">Processing</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-white">
                AI designs & builds context
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Instead of wrapping elements in pre-designed templates, Aura parses semantic hierarchy, formats custom grids, and selects Noto Serif pairings.
              </p>
              <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-950 p-4 aspect-[16/10] flex flex-col justify-center items-center text-center space-y-2 select-none">
                <div className="p-2.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 animate-spin duration-3000">
                  <Sparkles className="size-5" />
                </div>
                <span className="text-xs font-medium text-neutral-400">Layout Optimization Active</span>
                <span className="text-[10px] text-neutral-600 font-mono">1.18px asymmetric grid lines aligned</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col space-y-6 p-6 rounded-2xl border border-neutral-900 bg-neutral-900/20 backdrop-blur-sm relative group hover:border-neutral-800 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--primary)]">03 / DELIVER</span>
                <span className="text-xs text-neutral-500 uppercase">Export</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-white">
                Export-ready presentation
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Walk away with vector-perfect layouts. Export directly to PowerPoint (PPTX), vector PDF, or share via a premium web link.
              </p>
              <div className="mt-4 rounded-xl border border-neutral-800 bg-neutral-950 p-4 aspect-[16/10] flex flex-col justify-between text-xs select-none">
                <div className="flex items-center justify-between border-b border-neutral-900 pb-2 text-[10px] text-neutral-400 uppercase tracking-wider font-semibold">
                  <span>Export Deck</span>
                  <span className="text-green-500">Ready</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-1.5 rounded bg-neutral-900/60 border border-neutral-800">
                    <span className="text-neutral-300">Editable PowerPoint (.pptx)</span>
                    <FileDown className="size-3.5 text-[var(--primary)]" />
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded bg-neutral-900/60 border border-neutral-800">
                    <span className="text-neutral-300">High-Res Print PDF (.pdf)</span>
                    <FileDown className="size-3.5 text-[var(--primary)]" />
                  </div>
                </div>
                <span className="text-[10px] text-neutral-600 font-mono text-center">Output generated in 4.2 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof of Quality Section (Dynamic Showcase) */}
      <section id="proof" className="py-24 relative max-w-7xl mx-auto px-6">
        {/* Decorative backdrop glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[var(--primary)]/5 blur-[120px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[var(--primary)] font-semibold">
              Live Gallery
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              See the design quality yourself
            </h2>
            <p className="text-neutral-400">
              Interactive slides designed by Aura's core engine. Select an industry theme below to test layout variance and clean structure.
            </p>
          </div>

          {/* Theme switcher tab list */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-neutral-900 border border-neutral-800">
            {proofSlides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setActiveProofSlide(index)}
                className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                  activeProofSlide === index
                    ? 'bg-neutral-800 text-white shadow-md'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {slide.tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Slide Viewer Frame */}
        <div className="relative border border-neutral-800 bg-neutral-900 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden aspect-[16/10] w-full max-w-4xl mx-auto">
          {/* Top subtle gloss line */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Active slide content */}
          <div className="w-full h-full transition-all duration-500 ease-in-out">
            {proofSlides[activeProofSlide].content}
          </div>

          {/* Bottom layout metadata info */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center space-x-2 rounded-md bg-neutral-950/70 backdrop-blur border border-neutral-800/60 px-3 py-1.5 text-[11px] font-mono text-neutral-400">
            <span>Theme: {proofSlides[activeProofSlide].theme}</span>
            <span className="text-neutral-600">|</span>
            <span className="text-[var(--primary)]">Grid active</span>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 border-t border-neutral-900 bg-neutral-950/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[var(--primary)] font-semibold">
              The Engine
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white">
              Every detail, considered
            </h2>
            <p className="text-neutral-400 text-sm">
              We ditched template-based algorithms to build a layout system that thinks like a designer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="bg-neutral-900/10 border-neutral-900 hover:border-neutral-800 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 space-y-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                  <Layout className="size-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white">
                  Asymmetric layout generator
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Avoids template symmetry. Aura automatically creates visual anchors on the page through deliberate whitespace, varying element widths, and balanced grid margins.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="bg-neutral-900/10 border-neutral-900 hover:border-neutral-800 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 space-y-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                  <Type className="size-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white">
                  Serif typography pairings
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  We match Noto Serif with high-quality body systems like Public Sans. We lock in tight kerning and generous line heights to preserve editorial publishing aesthetics.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="bg-neutral-900/10 border-neutral-900 hover:border-neutral-800 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 space-y-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                  <Maximize2 className="size-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white">
                  Responsive design frames
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Aura generated slides render perfectly across standard desktop projectors, massive mobile screens, web browsers, or standard printed formats.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="bg-neutral-900/10 border-neutral-900 hover:border-neutral-800 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 space-y-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                  <Share2 className="size-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white">
                  PowerPoint editable exports
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Export slides to editable PowerPoint objects. No flat backgrounds — change text layers, alter vector shapes, or re-arrange grids inside Microsoft Office or Keynote.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="bg-neutral-900/10 border-neutral-900 hover:border-neutral-800 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 space-y-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                  <History className="size-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white">
                  Semantic version control
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Rewind or branch versions of your design outline. Instantly apply color schema changes globally across all historical slides in one click.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="bg-neutral-900/10 border-neutral-900 hover:border-neutral-800 transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8 space-y-4">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                  <Sparkles className="size-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white">
                  Brand identity lock
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Lock in your brand colors, fonts, and assets. Aura restricts layout variations to only combinations that maintain strict compliance with your design system.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Strip */}
      <section className="py-20 border-y border-neutral-900 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-2 max-w-xs text-left">
            <h3 className="font-heading text-2xl font-semibold text-white">Trusted by builders</h3>
            <p className="text-xs text-neutral-500">
              Leading founders and consultants rely on Aura to save design cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
            <div className="space-y-4 border-l border-neutral-800 pl-6">
              <p className="text-sm italic text-neutral-300 font-light">
                "Our Seed deck generated by Aura raised $2.4M. The investors specifically commented on how structured and clean the visual layout was. They couldn't tell it was AI."
              </p>
              <div className="text-xs">
                <span className="font-semibold text-white">Marcus Vance</span>
                <span className="text-neutral-500"> — Founder, Helius Labs</span>
              </div>
            </div>

            <div className="space-y-4 border-l border-neutral-800 pl-6">
              <p className="text-sm italic text-neutral-300 font-light">
                "Standard AI slide makers feel childish. Aura matches the typographic hierarchy I'd build in InDesign. Essential for our client proposals."
              </p>
              <div className="text-xs">
                <span className="font-semibold text-white">Elena Rostova</span>
                <span className="text-neutral-500"> — Principal, Strategy Group</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-6 relative">
        {/* Soft background glow */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-10%] w-[600px] h-[300px] rounded-full bg-[var(--primary)]/5 blur-[120px] pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[var(--primary)] font-semibold">
            Subscription
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white">
            Simple, honest pricing
          </h2>
          <p className="text-neutral-400">
            Start generating slides for free. Upgrade as your pitch frequency increases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-8">
          {/* Tier 1 - Free */}
          <div className="flex flex-col justify-between p-8 rounded-2xl border border-neutral-900 bg-neutral-900/10 backdrop-blur-sm relative group hover:border-neutral-850 transition-all">
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-xl font-semibold text-neutral-300">Starter</h3>
                <p className="text-xs text-neutral-500 mt-1">For occasional pitches and outlines.</p>
              </div>

              <div className="flex items-baseline">
                <span className="font-heading text-5xl font-bold text-white">$0</span>
                <span className="text-neutral-500 text-xs ml-2">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-neutral-400 border-t border-neutral-900 pt-6">
                <li className="flex items-center space-x-2">
                  <Check className="size-3.5 text-neutral-600" />
                  <span>3 presentation generation credits</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="size-3.5 text-neutral-600" />
                  <span>Access to standard layout grids</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="size-3.5 text-neutral-600" />
                  <span>PDF downloads</span>
                </li>
                <li className="flex items-center space-x-2 text-neutral-600 line-through">
                  <span>PowerPoint (.pptx) editable export</span>
                </li>
              </ul>
            </div>

            <Button variant="outline" className="w-full mt-8 rounded-full border-neutral-800 text-white hover:bg-neutral-900">
              Get Started
            </Button>
          </div>

          {/* Tier 2 - Pro */}
          <div className="flex flex-col justify-between p-8 rounded-2xl border border-[var(--primary)]/60 bg-neutral-900/20 backdrop-blur-sm relative group shadow-[0_0_40px_rgba(203,163,89,0.05)] transition-all">
            <div className="absolute top-4 right-4 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 px-2.5 py-0.5 text-[10px] font-semibold text-[var(--primary)] tracking-wider uppercase">
              Recommended
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-xl font-semibold text-white">Professional</h3>
                <p className="text-xs text-neutral-400 mt-1">For active presenters, consultants, and agencies.</p>
              </div>

              <div className="flex items-baseline">
                <span className="font-heading text-5xl font-bold text-white">$24</span>
                <span className="text-neutral-500 text-xs ml-2">/ month</span>
              </div>

              <ul className="space-y-3 text-xs text-neutral-300 border-t border-neutral-900 pt-6">
                <li className="flex items-center space-x-2">
                  <Check className="size-3.5 text-[var(--primary)]" />
                  <span>Unlimited slide deck generation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="size-3.5 text-[var(--primary)]" />
                  <span>PowerPoint (.pptx) vector export</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="size-3.5 text-[var(--primary)]" />
                  <span>Custom brand identity configuration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="size-3.5 text-[var(--primary)]" />
                  <span>Priority GPU generation queue</span>
                </li>
              </ul>
            </div>

            <Button className="w-full mt-8 rounded-full bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-neutral-950 font-semibold shadow-md">
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl border border-neutral-900 bg-gradient-to-r from-neutral-950 via-neutral-900/40 to-neutral-950 p-12 md:p-20 text-center overflow-hidden">
          {/* Subtle gold bloom backdrop */}
          <div className="absolute inset-0 bg-[var(--primary)]/[0.03] blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Create slides that command respect
            </h2>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
              Save hours formatting borders and fonts. Input your outline and get a designer-level deck in seconds.
            </p>
            <div className="pt-4">
              <Button
                size="lg"
                className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-neutral-950 rounded-full font-semibold px-8 shadow-lg"
                asChild
              >
                <a href="#">Create a presentation</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-900 bg-neutral-950/70 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <span className="font-heading text-lg font-bold text-white">
              Aura<span className="text-[var(--primary)] font-light">.</span>
            </span>
            <span>© 2026 Aura AI Inc. All rights reserved.</span>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
