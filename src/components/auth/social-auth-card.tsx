import { Link } from '@tanstack/react-router'
import {
  ArrowRightIcon,
  GithubLogoIcon,
  GoogleLogoIcon,
} from '@phosphor-icons/react'
import { useState } from 'react'
import { toast } from 'sonner'

import { authClient } from '#/lib/auth-client'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'

type AuthMode = 'signin' | 'signup'

interface SocialAuthCardProps {
  mode: AuthMode
  redirectURL?: string
}

const providerButtons = [
  {
    provider: 'google' as const,
    icon: GoogleLogoIcon,
    title: 'Google',
    description: 'Best for quick access and synced identity.',
  },
  {
    provider: 'github' as const,
    icon: GithubLogoIcon,
    title: 'GitHub',
    description: 'Best for builder workflows and dev accounts.',
  },
]

function getModeCopy(mode: AuthMode) {
  if (mode === 'signin') {
    return {
      badge: 'Sign in',
      title: 'Sign in to your workspace',
      description:
        'Use a social provider to get back into your decks, drafts, and exports.',
      buttonCopy: 'Sign in with',
      footerNote: 'Choose a provider to continue.',
      alternateLabel: 'Need a new account?',
      alternateTo: '/signup',
    }
  }

  return {
    badge: 'Create account',
    title: 'Create your account',
    description:
      'Pick a social provider to create a new account and start building right away.',
    buttonCopy: 'Sign up with',
    footerNote: 'Use a provider to create your account.',
    alternateLabel: 'Already have an account?',
    alternateTo: '/signin',
  }
}

export function SocialAuthCard({
  mode,
  redirectURL = '/home',
}: SocialAuthCardProps) {
  const [activeProvider, setActiveProvider] = useState<
    'google' | 'github' | null
  >(null)
  const copy = getModeCopy(mode)

  const handleSocialSignIn = async (provider: 'google' | 'github') => {
    setActiveProvider(provider)
    try {
      toast.loading(
        `${copy.buttonCopy} ${provider === 'google' ? 'Google' : 'GitHub'}...`,
      )
      await authClient.signIn.social({
        provider,
        callbackURL: redirectURL,
        fetchOptions: {
          onError: (err: any) => {
            toast.dismiss()
            toast.error(err?.message || `Failed to continue with ${provider}.`)
            setActiveProvider(null)
          },
        },
      })
    } catch (err: any) {
      toast.dismiss()
      toast.error(err?.message || `Failed to continue with ${provider}.`)
      setActiveProvider(null)
    }
  }

  return (
    <Card className="relative overflow-hidden border-white/10 bg-neutral-950/72 shadow-[0_30px_100px_-28px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/70 to-transparent" />
      <div className="absolute -right-10 top-12 h-32 w-32 rounded-full bg-[var(--primary)]/10 blur-3xl" />
      <CardHeader className="space-y-4 border-b border-white/10 pb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex w-fit items-center rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--primary)]">
            Aura Auth
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
            {copy.badge}
          </div>
        </div>
        <div className="space-y-3">
          <CardTitle className="text-3xl font-semibold tracking-tight text-white">
            {copy.title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed text-neutral-400">
            {copy.description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-6">
        <div className="mb-4 space-y-1">
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
            Choose a provider
          </div>
          <div className="text-sm text-neutral-400">
            One click, same polished experience.
          </div>
        </div>

        {providerButtons.map((providerButton) => {
          const Icon = providerButton.icon
          return (
            <Button
              key={providerButton.provider}
              type="button"
              variant="outline"
              className="group relative h-auto w-full justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left text-neutral-100 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.9)] transition-all hover:-translate-y-0.5 hover:border-[var(--primary)]/35 hover:bg-white/[0.06]"
              onClick={() => handleSocialSignIn(providerButton.provider)}
              disabled={activeProvider !== null}
            >
              <span className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-neutral-950/70 text-[var(--primary)] transition-transform group-hover:scale-[1.03]">
                  <Icon className="size-6" weight="fill" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-white">
                    {copy.buttonCopy} {providerButton.title}
                  </span>
                  <span className="mt-1 text-xs leading-relaxed text-neutral-500">
                    {providerButton.description}
                  </span>
                </span>
              </span>
              <ArrowRightIcon className="size-4 text-neutral-500 transition-all group-hover:translate-x-0.5 group-hover:text-[var(--primary)]" />
            </Button>
          )
        })}
      </CardContent>

      <CardFooter className="flex flex-col gap-4 pt-2">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-neutral-400">{copy.footerNote}</p>
          <p className="text-xs text-neutral-500">
            {copy.alternateLabel}{' '}
            <Link
              to={copy.alternateTo}
              className="font-medium text-white underline decoration-[var(--primary)]/60 underline-offset-4 transition-colors hover:text-[var(--primary)]"
            >
              {mode === 'signin' ? 'Create account' : 'Sign in'}
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}
