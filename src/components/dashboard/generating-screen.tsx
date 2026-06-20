import { useEffect, useState } from 'react'

import { DashboardPage } from './dashboard-primitives'
import { GenerationPanel } from './generation-panel'

interface GeneratingScreenProps {
  prompt: string
  format: string
  onComplete: () => void
}

export function GeneratingScreen({
  prompt,
  format,
  onComplete,
}: GeneratingScreenProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= 2) {
          clearInterval(interval)
          setTimeout(() => {
            onComplete()
          }, 650)
          return prev
        }

        return prev + 1
      })
    }, 1200)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <DashboardPage className="flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <GenerationPanel prompt={prompt} format={format} step={step} />
      </div>
    </DashboardPage>
  )
}
