'use client'

import * as React from 'react'
import { Menubar as MenubarPrimitive } from 'radix-ui'

import { cn } from '@/lib/utils'
import { CheckIcon, CaretRightIcon } from '@phosphor-icons/react'

function Menubar({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      className={cn(
        'flex h-9 items-center rounded-4xl border border-oklch(0.92 0.004 286.32) p-1 dark:border-oklch(1 0 0 / 10%)',
        className,
      )}
      {...props}
    />
  )
}

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return (
    <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
  )
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn(
        'flex items-center rounded-xl px-2 py-0.75 text-sm font-medium outline-hidden select-none hover:bg-oklch(0.967 0.001 286.375) aria-expanded:bg-oklch(0.967 0.001 286.375) dark:hover:bg-oklch(0.274 0.006 286.033) dark:aria-expanded:bg-oklch(0.274 0.006 286.033)',
        className,
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = 'start',
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content>) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-48 origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-2xl bg-oklch(1 0 0) p-1 text-oklch(0.141 0.005 285.823) shadow-2xl ring-1 ring-oklch(0.141 0.005 285.823)/5 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 dark:bg-oklch(0.21 0.006 285.885) dark:text-oklch(0.985 0 0) dark:ring-oklch(0.985 0 0)/5',
          className,
        )}
        {...props}
      />
    </MenubarPortal>
  )
}

function MenubarItem({
  className,
  inset,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/menubar-item relative flex cursor-default items-center gap-2.5 rounded-xl px-3 py-2 text-sm outline-hidden select-none focus:bg-oklch(0.967 0.001 286.375) focus:text-oklch(0.21 0.006 285.885) not-data-[variant=destructive]:focus:**:text-oklch(0.21 0.006 285.885) data-inset:pl-9.5 data-[variant=destructive]:text-oklch(0.577 0.245 27.325) data-[variant=destructive]:focus:bg-oklch(0.577 0.245 27.325)/10 data-[variant=destructive]:focus:text-oklch(0.577 0.245 27.325) dark:data-[variant=destructive]:focus:bg-oklch(0.577 0.245 27.325)/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive! dark:focus:bg-oklch(0.274 0.006 286.033) dark:focus:text-oklch(0.985 0 0) dark:not-data-[variant=destructive]:focus:**:text-oklch(0.985 0 0) dark:data-[variant=destructive]:text-oklch(0.704 0.191 22.216) dark:data-[variant=destructive]:focus:bg-oklch(0.704 0.191 22.216)/10 dark:data-[variant=destructive]:focus:text-oklch(0.704 0.191 22.216) dark:dark:data-[variant=destructive]:focus:bg-oklch(0.704 0.191 22.216)/20",
        className,
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      data-inset={inset}
      className={cn(
        'relative flex cursor-default items-center gap-2.5 rounded-xl py-2 pr-3 pl-9.5 text-sm outline-hidden select-none focus:bg-oklch(0.967 0.001 286.375) focus:text-oklch(0.21 0.006 285.885) focus:**:text-oklch(0.21 0.006 285.885) data-inset:pl-9.5 data-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 dark:focus:bg-oklch(0.274 0.006 286.033) dark:focus:text-oklch(0.985 0 0) dark:focus:**:text-oklch(0.985 0 0)',
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-3 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({
  className,
  children,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-2.5 rounded-xl py-2 pr-3 pl-9.5 text-sm outline-hidden select-none focus:bg-oklch(0.967 0.001 286.375) focus:text-oklch(0.21 0.006 285.885) focus:**:text-oklch(0.21 0.006 285.885) data-inset:pl-9.5 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 dark:focus:bg-oklch(0.274 0.006 286.033) dark:focus:text-oklch(0.985 0 0) dark:focus:**:text-oklch(0.985 0 0)",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-3 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
        <MenubarPrimitive.ItemIndicator>
          <CheckIcon />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        'px-3.5 py-2.5 text-xs text-oklch(0.552 0.016 285.938) data-inset:pl-9.5 dark:text-oklch(0.705 0.015 286.067)',
        className,
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn(
        '-mx-1 my-1 h-px bg-oklch(0.92 0.004 286.32)/50 dark:bg-oklch(1 0 0 / 10%)/50',
        className,
      )}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        'ml-auto text-xs tracking-widest text-oklch(0.552 0.016 285.938) group-focus/menubar-item:text-oklch(0.21 0.006 285.885) dark:text-oklch(0.705 0.015 286.067) dark:group-focus/menubar-item:text-oklch(0.985 0 0)',
        className,
      )}
      {...props}
    />
  )
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-2 rounded-xl px-3 py-2 text-sm outline-none select-none focus:bg-oklch(0.967 0.001 286.375) focus:text-oklch(0.21 0.006 285.885) data-inset:pl-9.5 data-open:bg-oklch(0.967 0.001 286.375) data-open:text-oklch(0.21 0.006 285.885) [&_svg:not([class*='size-'])]:size-4 dark:focus:bg-oklch(0.274 0.006 286.033) dark:focus:text-oklch(0.985 0 0) dark:data-open:bg-oklch(0.274 0.006 286.033) dark:data-open:text-oklch(0.985 0 0)",
        className,
      )}
      {...props}
    >
      {children}
      <CaretRightIcon className="ml-auto size-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent>) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        'z-50 min-w-32 origin-(--radix-menubar-content-transform-origin) overflow-hidden rounded-2xl bg-oklch(1 0 0) p-1 text-oklch(0.141 0.005 285.823) shadow-2xl ring-1 ring-oklch(0.141 0.005 285.823)/5 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 dark:bg-oklch(0.21 0.006 285.885) dark:text-oklch(0.985 0 0) dark:ring-oklch(0.985 0 0)/5',
        className,
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
