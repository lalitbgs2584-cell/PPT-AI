import { createFileRoute } from '@tanstack/react-router'

import { DashboardWorkspace } from '#/components/dashboard/dashboard-workspace'

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

export const Route = createFileRoute('/_dashboard/home')({
  validateSearch: (search: Record<string, unknown>): HomeSearch => {
    return {
      screen: (search.screen as any) || 'library',
      deckId: (search.deckId as string) || undefined,
    }
  },
  component: HomeRoute
})

function HomeRoute() {
  const search = Route.useSearch()

  return <DashboardWorkspace screen={search.screen} deckId={search.deckId} />
}
