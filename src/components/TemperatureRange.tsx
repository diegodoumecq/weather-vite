import { RefObject, useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn, forwardRef } from "~/shared";

interface SliderProps {
  className?: string;
  min: number;
  max: number;
  minStepsBetweenThumbs?: number;
  formatLabel?: (value: number) => string;
  value?: number[] | readonly number[];
  onValueChange?: (values: number[]) => void;
}

export const TemperatureRange = forwardRef(
  (
    {
      className,
      min,
      max,
      formatLabel,
      value,
      onValueChange,
      ...props
    }: SliderProps,
    ref,
  ) => {
    const initialValue = Array.isArray(value) ? value : [min, max];
    const [localValues, setLocalValues] = useState(initialValue);

    const handleValueChange = (newValues: number[]) => {
      setLocalValues(newValues);
      if (onValueChange) {
        onValueChange(newValues);
      }
    };

    return (
      <SliderPrimitive.Root
        ref={ref as RefObject<HTMLDivElement>}
        min={min}
        max={max}
        value={localValues}
        onValueChange={handleValueChange}
        disabled={true}
        className={cn(
          "relative flex w-full max-w-[17rem] touch-none select-none items-center md:max-w-[8rem]",
          className,
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow select-none overflow-hidden rounded-full bg-gray-500/20">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-gradient-to-l from-yellow-200 to-blue-300" />
        </SliderPrimitive.Track>
      </SliderPrimitive.Root>
    );
  },
);
