import { cn } from '@/lib/utils'

function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-oklch(0.967 0.001 286.375) px-1 font-sans text-xs font-medium text-oklch(0.552 0.016 285.938) select-none in-data-[slot=tooltip-content]:bg-oklch(1 0 0)/20 in-data-[slot=tooltip-content]:text-oklch(1 0 0) dark:in-data-[slot=tooltip-content]:bg-oklch(1 0 0)/10 [&_svg:not([class*='size-'])]:size-3 dark:bg-oklch(0.274 0.006 286.033) dark:text-oklch(0.705 0.015 286.067) dark:in-data-[slot=tooltip-content]:bg-oklch(0.141 0.005 285.823)/20 dark:in-data-[slot=tooltip-content]:text-oklch(0.141 0.005 285.823) dark:dark:in-data-[slot=tooltip-content]:bg-oklch(0.141 0.005 285.823)/10",
        className,
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
