import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { BrandKitEditor } from './brand-kit-editor'
import { DeckEditor } from './deck-editor'
import { DeckLibrary } from './deck-library'
import { GeneratingScreen } from './generating-screen'
import { PromptScreen } from './prompt-screen'
import { SettingsScreen } from './settings-screen'
import type { BrandKit, Deck } from './types'

interface HomeSearch {
  screen?:
    | 'library'
    | 'prompt'
    | 'generating'
    | 'editor'
    | 'brandkit'
    | 'settings'
  deckId?: string
}

const seedDecks: Deck[] = [
  {
    id: 'seed-vc-pitch',
    title: 'Aura Capital Series A Pitch',
    description:
      'Pitch deck outlining the Series A growth thesis and decentralized design-system engineering.',
    slideCount: 3,
    createdAt: '2026-06-20',
    slides: [
      {
        id: 'slide-1',
        title: 'Scaling through decentralized venture architecture',
        subtitle: 'Aura Capital Partners â€” Series A Growth Thesis',
        layoutType: 'hero',
        bullets: [
          'Building companies in weeks rather than quarters',
          'Leveraging high-fidelity design standards',
          'Automated engineering and design outline rules',
        ],
        stats: { number: '$2.4M', label: 'capital allocated' },
      },
      {
        id: 'slide-2',
        title: 'The Challenge: Visual Noise',
        subtitle: 'Why current agency deliverables are losing visual equity',
        layoutType: 'split',
        bullets: [
          'Information overload makes standard brand messaging invisible',
          'Bespoke systems communicate value through restraint and whitespace',
          'Average 42% increase in user retention and premium perception',
        ],
      },
      {
        id: 'slide-3',
        title: 'Executive Summary & Impact',
        subtitle: 'Our key performance metrics and future outlook',
        layoutType: 'grid',
        bullets: [
          'Fully automated vector PPTX exports',
          'Noto Serif variable header integration',
          'Strict compliance with brand identity guidelines',
        ],
      },
    ],
  },
]

interface DashboardWorkspaceProps {
  screen?: HomeSearch['screen']
  deckId?: string
}

export function DashboardWorkspace({
  screen = 'library',
  deckId,
}: DashboardWorkspaceProps) {
  const navigate = useNavigate()

  const [decks, setDecks] = useState<Deck[]>([])
  const [brandKit, setBrandKit] = useState<BrandKit>({
    logoText: 'Aura',
    primaryColor: '#CBA359',
    fontHeading: 'Noto Serif Variable',
    fontSans: 'Public Sans Variable',
  })
  const [activePrompt, setActivePrompt] = useState('')
  const [activeFormat, setActiveFormat] = useState('')

  useEffect(() => {
    const storedDecks = localStorage.getItem('aura_decks')
    if (storedDecks) {
      try {
        setDecks(JSON.parse(storedDecks))
      } catch {
        setDecks(seedDecks)
      }
    } else {
      setDecks(seedDecks)
      localStorage.setItem('aura_decks', JSON.stringify(seedDecks))
    }

    const storedKit = localStorage.getItem('aura_brandkit')
    if (storedKit) {
      try {
        setBrandKit(JSON.parse(storedKit))
      } catch {
        // Keep the default kit if stored data is invalid.
      }
    }
  }, [])

  const handleUpdateBrandKit = (updatedKit: BrandKit) => {
    setBrandKit(updatedKit)
    localStorage.setItem('aura_brandkit', JSON.stringify(updatedKit))
  }

  const handleDeleteDeck = (id: string) => {
    const updated = decks.filter((d) => d.id !== id)
    setDecks(updated)
    localStorage.setItem('aura_decks', JSON.stringify(updated))
    toast.success('Project deleted successfully')
  }

  const handleGenerate = (promptText: string, formatText: string) => {
    setActivePrompt(promptText)
    setActiveFormat(formatText)
    navigate({
      to: '/home',
      search: {
        screen: 'generating',
      },
    })
  }

  const handleGenerationComplete = () => {
    const newDeckId = `deck-${Date.now()}`
    let cleanTitle = activePrompt.trim()
    if (cleanTitle.length > 45) {
      cleanTitle = cleanTitle.substring(0, 42) + '...'
    }

    const newDeck: Deck = {
      id: newDeckId,
      title: cleanTitle || 'Untitled Deck Outline',
      description: `AI-generated ${activeFormat} layouts. Prompt: "${activePrompt}"`,
      slideCount: 3,
      createdAt: new Date().toISOString().split('T')[0],
      slides: [
        {
          id: `slide-1-${Date.now()}`,
          title: cleanTitle,
          subtitle: `Executive ${activeFormat} â€¢ Configured by Aura AI`,
          layoutType: 'title',
        },
        {
          id: `slide-2-${Date.now()}`,
          title: 'Core Pillars & Execution Model',
          subtitle:
            'Detailed pillars driving layout density and structural alignment',
          layoutType: 'split',
          bullets: [
            `Designing optimized vectors targeting: "${activePrompt}"`,
            'Implementing symmetric spacing and high-contrast typography tokens',
            'Structuring layout logic in real time based on semantic context',
          ],
        },
        {
          id: `slide-3-${Date.now()}`,
          title: 'Key Metrics & Projected Performance',
          subtitle: 'Expected deliverables matching brand-kit rules',
          layoutType: 'hero',
          bullets: [
            'Zero layout templates used â€” design output is fully asymmetric',
            'Full compatibility with standard Microsoft PowerPoint (PPTX) vector objects',
          ],
          stats: { number: '100%', label: 'editable vectors' },
        },
      ],
    }

    const updated = [newDeck, ...decks]
    setDecks(updated)
    localStorage.setItem('aura_decks', JSON.stringify(updated))

    toast.success('Presentation generated!')

    navigate({
      to: '/home',
      search: {
        screen: 'editor',
        deckId: newDeckId,
      },
    })
  }

  const handleUpdateDeck = (updatedDeck: Deck) => {
    const updated = decks.map((d) =>
      d.id === updatedDeck.id ? updatedDeck : d,
    )
    setDecks(updated)
    localStorage.setItem('aura_decks', JSON.stringify(updated))
  }

  const activeDeck = decks.find((d) => d.id === deckId)

  switch (screen) {
    case 'prompt':
      return <PromptScreen onGenerate={handleGenerate} />
    case 'generating':
      return (
        <GeneratingScreen
          prompt={activePrompt}
          format={activeFormat}
          onComplete={handleGenerationComplete}
        />
      )
    case 'editor':
      if (!activeDeck) {
        return (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center select-none">
            <h3 className="font-heading text-lg font-semibold text-white">
              Project not found
            </h3>
            <p className="mt-1 text-xs text-neutral-400">
              The project you requested is missing or was deleted.
            </p>
          </div>
        )
      }

      return (
        <DeckEditor
          deck={activeDeck}
          brandKit={brandKit}
          onUpdateDeck={handleUpdateDeck}
        />
      )
    case 'brandkit':
      return (
        <BrandKitEditor
          brandKit={brandKit}
          onUpdateBrandKit={handleUpdateBrandKit}
        />
      )
    case 'settings':
      return <SettingsScreen />
    case 'library':
    default:
      return <DeckLibrary decks={decks} onDeleteDeck={handleDeleteDeck} />
  }
}
