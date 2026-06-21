import type {
  SlideLayout,
  SlideStyle,
  SlideTone,
} from './presentation-constants'

export type PresentationTemplate = {
  id: string
  label: string
  content: string
  slides: number
  style: SlideStyle
  tone: SlideTone
  layout: SlideLayout
}

export const PRESENTATION_TEMPLATES: PresentationTemplate[] = [
  {
    id: 'executive-brief',
    label: 'Executive Brief',
    content: `Quarterly business update

Key points:
- Revenue trend is steady
- Focus on operational clarity
- Keep stakeholders aligned`,
    slides: 6,
    style: 'minimal',
    tone: 'formal',
    layout: 'balanced',
  },
  {
    id: 'product-launch',
    label: 'Product Launch',
    content: `Introducing Nova Flow

Highlights:
- Faster onboarding
- Rich visual storytelling
- Clear conversion path`,
    slides: 9,
    style: 'creative',
    tone: 'persuasive',
    layout: 'visual',
  },
  {
    id: 'investor-pitch',
    label: 'Investor Pitch',
    content: `Seed round narrative

Why now:
- Strong market momentum
- Clear category wedge
- Repeatable growth motion`,
    slides: 12,
    style: 'bold',
    tone: 'persuasive',
    layout: 'visual',
  },
  {
    id: 'quarterly-review',
    label: 'Quarterly Review',
    content: `Q3 performance review

Focus areas:
- Delivery velocity
- Team capacity
- Budget discipline`,
    slides: 7,
    style: 'minimal',
    tone: 'informative',
    layout: 'bullet-points',
  },
  {
    id: 'workshop-agenda',
    label: 'Workshop Agenda',
    content: `Strategy workshop agenda

Sections:
- Framing the problem
- Collaboration exercise
- Next-step alignment`,
    slides: 8,
    style: 'professional',
    tone: 'informative',
    layout: 'text-heavy',
  },
  {
    id: 'case-study',
    label: 'Case Study',
    content: `Customer story deck

Narrative:
- Before / after contrast
- Measurable outcome
- Confident proof points`,
    slides: 10,
    style: 'creative',
    tone: 'formal',
    layout: 'balanced',
  },
  {
    id: 'training-playbook',
    label: 'Training Playbook',
    content: `Internal training guide

Modules:
- Core concepts
- Step-by-step workflow
- Practical examples`,
    slides: 11,
    style: 'professional',
    tone: 'informative',
    layout: 'bullet-points',
  },
  {
    id: 'conference-keynote',
    label: 'Conference Keynote',
    content: `Keynote opening slide

Message:
- Clear opening statement
- Big visual anchor
- Short supporting copy`,
    slides: 14,
    style: 'bold',
    tone: 'formal',
    layout: 'visual',
  },
]
