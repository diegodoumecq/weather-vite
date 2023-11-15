import { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from "react";
import { Trash2Icon } from "lucide-react";

import { cn, forwardRef } from "~/shared";

export interface CardProps extends ComponentPropsWithoutRef<"div"> {
  loading?: boolean;
  className?: string;
  onClose?: () => void;
  children?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, loading, onClose, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative rounded-md border border-white/20 bg-gray-900/60 p-4 shadow-sm md:p-6",
        loading && "animate-pulse bg-gray-700",
        className,
      )}
      {...props}
    >
      {onClose && (
        <div className="absolute right-[-1rem] top-[-1rem] ">
          <button
            className="rounded-full p-1 hover:bg-white/20 focus:ring-white"
            onClick={onClose}
          >
            <Trash2Icon></Trash2Icon>
          </button>
        </div>
      )}
      {children}
    </div>
  ),
);

export const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4 text-neutral-400", className)}
    {...props}
  />
));

export const CardTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "flex flex-row items-center gap-2 text-sm font-semibold leading-none tracking-tight md:text-base md:font-medium",
      className,
    )}
    {...props}
  />
));

export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold md:text-lg", className)}
    {...props}
  />
));

export const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-auto flex items-center pt-0 text-xs md:text-sm",
      className,
    )}
    {...props}
  />
));

export interface WeatherCardProps extends Omit<CardProps, "title"> {
  icon: ReactNode;
  title: ReactNode;
  footer?: ReactNode;
}

export const WeatherCard = ({
  children,
  icon,
  title,
  footer,
  className,
  ...props
}: WeatherCardProps) => {
  return (
    <Card
      className={cn("flex h-48 flex-col justify-between", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle>
          {icon}
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>
      <CardFooter>
        <p>{footer}</p>
      </CardFooter>
    </Card>
  );
};
