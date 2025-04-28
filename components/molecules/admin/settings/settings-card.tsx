import { Card, type CardProps } from "@/components/ui/card";
import { cn } from "@/lib/user/utils";

export default function SettingsCard({ className, ...props }: CardProps) {
  return (
    <Card
      className={cn(
        "border shadow-sm hover:shadow-md transition-shadow",
        className
      )}
      {...props}
    />
  );
}
