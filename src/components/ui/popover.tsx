"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = ({children}: {children: React.ReactNode}) => {
  const [open, setOpen] = React.useState(false)
  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      {children}
    </PopoverPrimitive.Root>
  )
}

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <PopoverPrimitive.Trigger 
    ref={ref} 
    {...props}
    className={cn(
      // Hide trigger when popover opens
      "data-[state=open]:opacity-0",
      "data-[state=open]:pointer-events-none",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      // Animation duration
      "duration-200",
      // Smooth transition
      "transition-opacity duration-150",
      className
    )}
  >
    {children}
  </PopoverPrimitive.Trigger>
))
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", side = "bottom", sideOffset = 0, alignOffset = 0, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      side={side}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      className={cn(
        // Base styles
        "z-50 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden",
        // Animations
        `data-[state=open]:animate-in data-[state=closed]:animate-out -translate-x-[${alignOffset}px] -translate-y-[${sideOffset}px]`,
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        // Animation duration
        "duration-200",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }