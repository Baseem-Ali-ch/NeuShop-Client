import * as React from "react";

import { cn } from "@/lib/user/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indicatorClassName?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, indicatorClassName, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-full w-full flex-1 bg-gray-900 dark:bg-gray-400 transition-all",
            indicatorClassName
          )}
          style={{
            transform: `translateX(-${100 - ((value || 0) / max) * 100}%)`,
          }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
