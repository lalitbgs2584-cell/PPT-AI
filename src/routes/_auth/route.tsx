import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="dark relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,rgba(203,163,89,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_28%),linear-gradient(180deg,#09090b_0%,#050505_100%)] text-neutral-100 selection:bg-[var(--primary)] selection:text-neutral-950 font-sans">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
      <div className="absolute left-1/2 top-[-14rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[var(--primary)]/10 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10rem] right-[-6rem] h-[24rem] w-[24rem] rounded-full bg-white/5 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-10 px-6 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
        <section className="hidden lg:flex flex-col justify-center gap-8 pr-8">
          <Link
            to="/"
            className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-neutral-300 uppercase backdrop-blur-sm"
          >
            Aura Presentation Studio
          </Link>

          <div className="max-w-2xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
              Social access only
            </p>
            <h1 className="font-heading text-5xl font-bold tracking-tight text-white leading-[1.02]">
              A calmer way to enter your workspace.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-neutral-400">
              Keep the experience elegant. Sign in or create an account with a
              provider that matches the premium feel of the rest of the app.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_16px_50px_-24px_rgba(0,0,0,0.7)] backdrop-blur-sm">
              <div className="text-sm font-semibold text-white">Fast access</div>
              <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                No extra fields. One click gets you in.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--primary)]/20 bg-[var(--primary)]/[0.08] p-4 shadow-[0_16px_50px_-24px_rgba(0,0,0,0.7)] backdrop-blur-sm">
              <div className="text-sm font-semibold text-white">Brand aligned</div>
              <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                Same gold-on-charcoal tone as the landing page.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_16px_50px_-24px_rgba(0,0,0,0.7)] backdrop-blur-sm">
              <div className="text-sm font-semibold text-white">Top-level toast</div>
              <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                Redirect feedback appears above the page.
              </p>
            </div>
          </div>

          <div className="max-w-2xl rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-[0_24px_90px_-30px_rgba(0,0,0,0.85)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="text-xs uppercase tracking-[0.26em] text-[var(--primary)]">
                  What you get
                </div>
                <div className="mt-1 text-xl font-semibold text-white">
                  Premium access without visual clutter
                </div>
              </div>
              <div className="rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
                Aura
              </div>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-neutral-400 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-4">
                Secure auth
              </div>
              <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-4">
                Polished motion
              </div>
              <div className="rounded-2xl border border-white/10 bg-neutral-950/60 p-4">
                Product-grade tone
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto w-full max-w-md animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Link to="/" className="font-heading text-2xl font-bold tracking-tight text-white">
              Aura<span className="text-[var(--primary)] font-light">.</span>
            </Link>
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
              AI Premium Deck Maker
            </span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
