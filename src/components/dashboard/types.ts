export interface Slide {
  id: string
  title: string
  subtitle?: string
  layoutType: 'title' | 'grid' | 'split' | 'hero'
  bullets?: string[]
  stats?: { number: string; label: string }
}

export interface Deck {
  id: string
  title: string
  description: string
  slideCount: number
  createdAt: string
  slides: Slide[]
}

export interface BrandKit {
  logoText: string
  primaryColor: string
  fontHeading: 'Noto Serif Variable' | 'Playfair Display' | 'Inter'
  fontSans: 'Public Sans Variable' | 'Roboto' | 'Outfit'
}

