import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight } from "lucide-react"

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
        // Slide — bordered pill with a teal icon square that slides to the
        // right edge on hover. Renders its own inner markup; size is ignored,
        // set width via className.
        slide:
          "group relative inline-flex items-center overflow-hidden rounded-xl h-10 border border-border bg-background px-3",
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

// Inner markup for the `slide` variant: an absolutely-positioned teal square
// that slides from the left to the right edge on hover, plus the label.
function SlideContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="absolute left-1 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-primary transition-all duration-500 group-hover:left-[calc(100%-0.25rem)] group-hover:-translate-x-full group-hover:rotate-[360deg]">
        <ArrowRight className="h-4 w-4 shrink-0 text-white" />
      </span>
      <span className="relative z-0 w-full pl-10 text-center text-sm font-semibold text-foreground transition-all duration-500 group-hover:pl-0 group-hover:pr-10">
        {children}
      </span>
    </>
  )
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    // The slide variant defines its own height/width, so opt out of `size`.
    const classes = cn(
      buttonVariants({ variant, size: variant === "slide" ? null : size, className })
    )

    if (variant === "slide") {
      // With asChild the single child (e.g. a Link) must wrap the slide markup
      // so the hover `group` styles and the href live on the same element.
      if (asChild) {
        const child = React.Children.only(children) as React.ReactElement<{
          children?: React.ReactNode
        }>
        return (
          <Comp className={classes} ref={ref} {...props}>
            {React.cloneElement(
              child,
              undefined,
              <SlideContent>{child.props.children}</SlideContent>
            )}
          </Comp>
        )
      }
      return (
        <Comp className={classes} ref={ref} {...props}>
          <SlideContent>{children}</SlideContent>
        </Comp>
      )
    }

    return (
      <Comp className={classes} ref={ref} {...props}>
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
