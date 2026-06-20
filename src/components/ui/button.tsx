import * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-4xl border border-oklch(0.92 0.004 286.32) border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-oklch(0.705 0.015 286.067) focus-visible:ring-[3px] focus-visible:ring-oklch(0.705 0.015 286.067)/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-oklch(0.577 0.245 27.325) aria-invalid:ring-[3px] aria-invalid:ring-oklch(0.577 0.245 27.325)/20 dark:aria-invalid:border-oklch(0.577 0.245 27.325)/50 dark:aria-invalid:ring-oklch(0.577 0.245 27.325)/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 dark:border-oklch(1 0 0 / 10%) dark:focus-visible:border-oklch(0.552 0.016 285.938) dark:focus-visible:ring-oklch(0.552 0.016 285.938)/50 dark:aria-invalid:border-oklch(0.704 0.191 22.216) dark:aria-invalid:ring-oklch(0.704 0.191 22.216)/20 dark:dark:aria-invalid:border-oklch(0.704 0.191 22.216)/50 dark:dark:aria-invalid:ring-oklch(0.704 0.191 22.216)/40",
  {
    variants: {
      variant: {
        default:
          'bg-oklch(0.21 0.006 285.885) text-oklch(0.985 0 0) hover:bg-oklch(0.21 0.006 285.885)/80 dark:bg-oklch(0.92 0.004 286.32) dark:text-oklch(0.21 0.006 285.885) dark:hover:bg-oklch(0.92 0.004 286.32)/80',
        outline:
          'border-oklch(0.92 0.004 286.32) bg-oklch(0.92 0.004 286.32)/30 hover:bg-oklch(0.92 0.004 286.32)/50 hover:text-oklch(0.141 0.005 285.823) aria-expanded:bg-oklch(0.967 0.001 286.375) aria-expanded:text-oklch(0.141 0.005 285.823) dark:border-oklch(1 0 0 / 10%) dark:bg-oklch(1 0 0 / 15%)/30 dark:hover:bg-oklch(1 0 0 / 15%)/50 dark:hover:text-oklch(0.985 0 0) dark:aria-expanded:bg-oklch(0.274 0.006 286.033) dark:aria-expanded:text-oklch(0.985 0 0)',
        secondary:
          'bg-oklch(0.967 0.001 286.375) text-oklch(0.21 0.006 285.885) hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-oklch(0.967 0.001 286.375) aria-expanded:text-oklch(0.21 0.006 285.885) dark:bg-oklch(0.274 0.006 286.033) dark:text-oklch(0.985 0 0) dark:aria-expanded:bg-oklch(0.274 0.006 286.033) dark:aria-expanded:text-oklch(0.985 0 0)',
        ghost:
          'hover:bg-oklch(0.967 0.001 286.375) hover:text-oklch(0.141 0.005 285.823) aria-expanded:bg-oklch(0.967 0.001 286.375) aria-expanded:text-oklch(0.141 0.005 285.823) dark:hover:bg-oklch(0.967 0.001 286.375)/50 dark:hover:bg-oklch(0.274 0.006 286.033) dark:hover:text-oklch(0.985 0 0) dark:aria-expanded:bg-oklch(0.274 0.006 286.033) dark:aria-expanded:text-oklch(0.985 0 0) dark:dark:hover:bg-oklch(0.274 0.006 286.033)/50',
        destructive:
          'bg-oklch(0.577 0.245 27.325)/10 text-oklch(0.577 0.245 27.325) hover:bg-oklch(0.577 0.245 27.325)/20 focus-visible:border-oklch(0.577 0.245 27.325)/40 focus-visible:ring-oklch(0.577 0.245 27.325)/20 dark:bg-oklch(0.577 0.245 27.325)/20 dark:hover:bg-oklch(0.577 0.245 27.325)/30 dark:focus-visible:ring-oklch(0.577 0.245 27.325)/40 dark:bg-oklch(0.704 0.191 22.216)/10 dark:text-oklch(0.704 0.191 22.216) dark:hover:bg-oklch(0.704 0.191 22.216)/20 dark:focus-visible:border-oklch(0.704 0.191 22.216)/40 dark:focus-visible:ring-oklch(0.704 0.191 22.216)/20 dark:dark:bg-oklch(0.704 0.191 22.216)/20 dark:dark:hover:bg-oklch(0.704 0.191 22.216)/30 dark:dark:focus-visible:ring-oklch(0.704 0.191 22.216)/40',
        link: 'text-oklch(0.21 0.006 285.885) underline-offset-4 hover:underline dark:text-oklch(0.92 0.004 286.32)',
      },
      size: {
        default:
          'h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5',
        xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: 'h-8 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        lg: 'h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
        icon: 'size-9',
        'icon-xs': "size-6 [&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
