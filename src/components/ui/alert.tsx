import * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border border-oklch(0.92 0.004 286.32) px-4 py-3 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4 dark:border-oklch(1 0 0 / 10%)",
  {
    variants: {
      variant: {
        default:
          'bg-oklch(1 0 0) text-oklch(0.141 0.005 285.823) dark:bg-oklch(0.21 0.006 285.885) dark:text-oklch(0.985 0 0)',
        destructive:
          'bg-oklch(1 0 0) text-oklch(0.577 0.245 27.325) *:data-[slot=alert-description]:text-oklch(0.577 0.245 27.325)/90 *:[svg]:text-current dark:bg-oklch(0.21 0.006 285.885) dark:text-oklch(0.704 0.191 22.216) dark:*:data-[slot=alert-description]:text-oklch(0.704 0.191 22.216)/90',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-oklch(0.141 0.005 285.823) dark:[&_a]:hover:text-oklch(0.985 0 0)',
        className,
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-sm text-balance text-oklch(0.552 0.016 285.938) md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-oklch(0.141 0.005 285.823) [&_p:not(:last-child)]:mb-4 dark:text-oklch(0.705 0.015 286.067) dark:[&_a]:hover:text-oklch(0.985 0 0)',
        className,
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-action"
      className={cn('absolute top-2.5 right-3', className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
