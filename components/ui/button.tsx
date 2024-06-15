import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-slate-50 shadow hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        destructive:
          "bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline:
          "border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary:
          "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost:
          "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
        customBig1:
          "bg-custom-2 text-custom-5 text-wrap font-semibold hover:bg-custom-6 hover:text-custom-3",
        customBig2:
          "bg-custom-3 text-custom-5 text-wrap font-semibold hover:bg-custom-6 hover:text-custom-3",
        customBig3:
          "bg-custom-7 text-custom-2 text-wrap font-semibold hover:bg-custom-6 hover:text-custom-3",
        customBig4:
          "bg-custom-8 text-custom-3 text-wrap font-semibold hover:bg-custom-6 hover:text-custom-3",
        customBig5:
          "bg-custom-9 text-custom-1 text-wrap font-semibold hover:bg-custom-6 hover:text-custom-3",
        customBig6:
          "bg-custom-4 text-custom-5 text-wrap font-semibold hover:bg-custom-6 hover:text-custom-3",
        customBig7:
          "bg-custom-5 text-custom-3 text-wrap font-semibold hover:bg-custom-6 hover:text-custom-3",
        customSm1:
          "px-4 py-2 bg-custom-3 text-custom-6 rounded hover:bg-custom-6 hover:text-custom-3 font-medium",
        customSm2:
          "px-4 py-2 bg-custom-3 text-custom-6 rounded hover:bg-custom-5 hover:text-custom-9 font-medium",
        customSmIcon:
          "text-xl bg-custom-3 text-custom-6 rounded hover:bg-custom-6 hover:text-custom-3 font-medium",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        big1: "h-60 w-40 text-2xl rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
