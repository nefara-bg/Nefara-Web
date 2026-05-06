import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-display font-bold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        // Primary CTA — teal accent
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-[hsl(var(--primary-strong))] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-8px_hsl(var(--primary)/0.5)]",
        // Dark navy CTA — for hero secondary / dark sections
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[hsl(var(--secondary)/0.88)] hover:-translate-y-0.5 shadow-sm",
        // Outline — bordered, light bg, hover -> teal border
        outline:
          "border border-border bg-transparent text-foreground hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary-strong))] hover:bg-[hsl(var(--primary)/0.05)]",
        // Ghost — quiet, hover bg only
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--foreground)/0.04)]",
        // Light ghost for use on dark sections
        ghostLight:
          "border border-white/15 bg-transparent text-white/75 hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))]",
        // Link
        link:
          "text-[hsl(var(--primary-strong))] underline-offset-4 hover:underline",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // Hero blueprint buttons — transparent with teal border, no radius
        hero:
          "rounded-none border border-[hsl(var(--primary)/0.65)] bg-transparent text-foreground hover:bg-[hsl(var(--primary)/0.06)]",
      },
      size: {
        default: "h-10 px-5 text-sm",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-7 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
