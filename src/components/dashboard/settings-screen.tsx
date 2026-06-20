import { useState } from 'react'
import { authClient } from '#/lib/auth-client'
import { toast } from 'sonner'

import {
  DashboardHeader,
  DashboardPage,
  DashboardPanel,
} from './dashboard-primitives'

export function SettingsScreen() {
  const { data: session } = authClient.useSession()
  const [name, setName] = useState(session?.user.name || '')
  const [email] = useState(session?.user.email || '')

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Profile settings updated successfully!')
  }

  return (
    <DashboardPage>
      <DashboardHeader
        eyebrow="Account"
        title="Account settings"
        description="Manage profile details and a few workspace preferences in one quiet place."
      />

      <div className="mx-auto w-full max-w-3xl">
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <DashboardPanel className="space-y-6 p-6 md:p-7">
            <div className="space-y-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                Personal information
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-neutral-400">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-2xl border border-white/8 bg-neutral-900/55 px-4 py-3 text-sm text-neutral-100 outline-none transition-colors focus:border-[var(--primary)]/28"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-neutral-400">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full cursor-not-allowed rounded-2xl border border-white/8 bg-neutral-900/35 px-4 py-3 text-sm text-neutral-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-white/6 pt-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                Preferences
              </div>

              <div className="mt-4 space-y-3">
                <label className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm text-neutral-300">
                  <span>Enable asymmetric grid snapping</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="size-4 rounded accent-[var(--primary)]"
                  />
                </label>

                <label className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm text-neutral-300">
                  <span>Default presentation format (16:9 widescreen)</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="size-4 rounded accent-[var(--primary)]"
                  />
                </label>
              </div>
            </div>
          </DashboardPanel>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/8 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/12 hover:bg-white/[0.05]"
          >
            Save personal preferences
          </button>
        </form>
      </div>
    </DashboardPage>
  )
}
