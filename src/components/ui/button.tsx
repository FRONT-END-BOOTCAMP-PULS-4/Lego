import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "border border-[var(--blue-01)] bg-[var(--blue-01)] text-[var(--white)] rounded-md hover:bg-[var(--white)] hover:text-[var(--blue-01)] cursor-pointer",
        outline:
          "border border-[var(--blue-02)] text-[var(--blue-02)] rounded-md hover:bg-[var(--blue-02)] hover:text-[var(--white)] cursor-pointer",
        round:
          "border border-[var(--blue-02)] bg-[var(--blue-02)] text-[var(--white)] rounded-full hover:bg-[var(--white)] hover:border-[var(--blue-02)] hover:text-[var(--blue-02)] cursor-pointer",
        ghost: "!text-[var(--gray-02)] hover:text-[var(--black)] text-bold cursor-pointer",
        gray: "!text-[var(--gray-02)] border border-[var(--gray-01)] text-[var(--gray-01)] rounded-md  cursor-pointer",
      },
      size: {
        default: "text-base py-2 px-[24px] ",
        sm: "text-sm py-1.5 px-4 font-bold ",
        lg: "text-md py-3 px-12 font-bold ",
        // icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
