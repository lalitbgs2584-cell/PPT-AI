import * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-oklch(0.92 0.004 286.32) border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-oklch(0.705 0.015 286.067) focus-visible:ring-[3px] focus-visible:ring-oklch(0.705 0.015 286.067)/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-oklch(0.577 0.245 27.325) aria-invalid:ring-oklch(0.577 0.245 27.325)/20 dark:aria-invalid:ring-oklch(0.577 0.245 27.325)/40 [&>svg]:pointer-events-none [&>svg]:size-3! dark:border-oklch(1 0 0 / 10%) dark:focus-visible:border-oklch(0.552 0.016 285.938) dark:focus-visible:ring-oklch(0.552 0.016 285.938)/50 dark:aria-invalid:border-oklch(0.704 0.191 22.216) dark:aria-invalid:ring-oklch(0.704 0.191 22.216)/20 dark:dark:aria-invalid:ring-oklch(0.704 0.191 22.216)/40',
  {
    variants: {
      variant: {
        default:
          'bg-oklch(0.21 0.006 285.885) text-oklch(0.985 0 0) [a]:hover:bg-oklch(0.21 0.006 285.885)/80 dark:bg-oklch(0.92 0.004 286.32) dark:text-oklch(0.21 0.006 285.885) dark:[a]:hover:bg-oklch(0.92 0.004 286.32)/80',
        secondary:
          'bg-oklch(0.967 0.001 286.375) text-oklch(0.21 0.006 285.885) [a]:hover:bg-oklch(0.967 0.001 286.375)/80 dark:bg-oklch(0.274 0.006 286.033) dark:text-oklch(0.985 0 0) dark:[a]:hover:bg-oklch(0.274 0.006 286.033)/80',
        destructive:
          'bg-oklch(0.577 0.245 27.325)/10 text-oklch(0.577 0.245 27.325) focus-visible:ring-oklch(0.577 0.245 27.325)/20 dark:bg-oklch(0.577 0.245 27.325)/20 dark:focus-visible:ring-oklch(0.577 0.245 27.325)/40 [a]:hover:bg-oklch(0.577 0.245 27.325)/20 dark:bg-oklch(0.704 0.191 22.216)/10 dark:text-oklch(0.704 0.191 22.216) dark:focus-visible:ring-oklch(0.704 0.191 22.216)/20 dark:dark:bg-oklch(0.704 0.191 22.216)/20 dark:dark:focus-visible:ring-oklch(0.704 0.191 22.216)/40 dark:[a]:hover:bg-oklch(0.704 0.191 22.216)/20',
        outline:
          'border-oklch(0.92 0.004 286.32) bg-oklch(0.92 0.004 286.32)/30 text-oklch(0.141 0.005 285.823) [a]:hover:bg-oklch(0.967 0.001 286.375) [a]:hover:text-oklch(0.552 0.016 285.938) dark:border-oklch(1 0 0 / 10%) dark:bg-oklch(1 0 0 / 15%)/30 dark:text-oklch(0.985 0 0) dark:[a]:hover:bg-oklch(0.274 0.006 286.033) dark:[a]:hover:text-oklch(0.705 0.015 286.067)',
        ghost:
          'hover:bg-oklch(0.967 0.001 286.375) hover:text-oklch(0.552 0.016 285.938) dark:hover:bg-oklch(0.967 0.001 286.375)/50 dark:hover:bg-oklch(0.274 0.006 286.033) dark:hover:text-oklch(0.705 0.015 286.067) dark:dark:hover:bg-oklch(0.274 0.006 286.033)/50',
        link: 'text-oklch(0.21 0.006 285.885) underline-offset-4 hover:underline dark:text-oklch(0.92 0.004 286.32)',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'span'

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
