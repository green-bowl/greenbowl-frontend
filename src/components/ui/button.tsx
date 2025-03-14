import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:bg-content-tertiary text-content-quarternary [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default:
          "bg-foundation-primary text-foundation-secondary shadow  dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
        bottom: "bg-foundation-primary text-foundation-secondary w-full ",
        destructive:
          "bg-red-500 text-neutral-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "border border-neutral-200 bg-white shadow-sm hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        secondary:
          "bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
        ghost:
          "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
        none:""
      },
      size: {
        default: "h-14 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-4 rounded-md px-8",
        icon: "h-9 w-9",
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
  loading?: boolean;
  LoaderClassname?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      disabled,
      variant,
      loading = false,
      size,
      asChild = false,
      children,
      LoaderClassname,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <>
        {variant === "bottom" ? (
          <div
            className={cn(
              "fixed pr-8 md:pr-0 w-full max-w-[35.4rem] bottom-20 z-30",
              className
            )}
          >
            <Comp
              className={cn(buttonVariants({ variant, size, className }))}
              ref={ref}
              disabled={loading || disabled}
              {...props}
            >
              {loading && (
                <Loader2
                  className={`h-5 w-5  animate-spin text-muted ${LoaderClassname}`}
                />
              )}
              {loading ? "" : children}
            </Comp>
          </div>
        ) : (
          <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            disabled={loading || disabled}
            {...props}
          >
            {loading && (
              <Loader2
                className={`h-5 w-5  animate-spin text-muted ${LoaderClassname}`}
              />
            )}
            {loading ? "" : children}
          </Comp>
        )}
      </>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
