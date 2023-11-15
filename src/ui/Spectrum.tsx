import { ComponentPropsWithoutRef, ElementRef } from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn, forwardRef } from "~/shared";

const style = {
  background:
    "linear-gradient(90deg, rgba(58,110,180,1) 0%, rgba(126,212,87,1) 20%, rgba(248,212,73,1) 40%, rgba(235,77,96,1) 60%, rgba(178,34,34,1) 100%)",
};

export const Spectrum = forwardRef<
  ElementRef<typeof ProgressPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2.5 w-full overflow-hidden rounded-full",
      className,
    )}
    style={style}
    {...props}
  >
    {!!value && (
      <ProgressPrimitive.Indicator
        className="h-2.5 w-2.5 flex-1 rounded-full bg-white/80 ring-1 ring-black/50  transition-all"
        style={{ marginLeft: `${value}%` }}
      />
    )}
  </ProgressPrimitive.Root>
));
