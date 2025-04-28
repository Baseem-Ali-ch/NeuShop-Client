"use client";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/user/utils";
import type { DateRange } from "react-day-picker";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

interface PerformanceOverviewProps {
  dateRange: DateRange;
  compareMode: boolean;
}

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  prefix?: string;
  suffix?: string;
  loading?: boolean;
}

function MetricCard({
  title,
  value,
  change,
  prefix,
  suffix,
  loading = false,
}: MetricCardProps) {
  return (
    <Card className="bg-white shadow-sm border border-gray-100 overflow-hidden">
      <CardContent className="p-6">
        {loading ? (
          <div className="space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : (
          <>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">
              {prefix}
              {value}
              {suffix}
            </h3>
            <div className="flex items-center mt-1">
              <div
                className={cn(
                  "text-xs font-medium flex items-center",
                  change > 0
                    ? "text-green-600"
                    : change < 0
                    ? "text-red-600"
                    : "text-gray-500"
                )}
              >
                {change > 0 ? (
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                ) : change < 0 ? (
                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                ) : null}
                {Math.abs(change)}%
              </div>
              <span className="text-xs text-muted-foreground ml-1">
                vs previous period
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function PerformanceOverview({
  dateRange,
  compareMode,
}: PerformanceOverviewProps) {
  // In a real application, this data would come from an API call based on the date range
  // For this example, we'll use mock data from Redux
  const { loading } = useSelector((state: RootState) => state.ui);

  const metrics = [
    {
      title: "Revenue",
      value: "128,450",
      change: 12.5,
      prefix: "$",
      suffix: "",
    },
    {
      title: "Orders",
      value: "1,643",
      change: 8.2,
      prefix: "",
      suffix: "",
    },
    {
      title: "Average Order Value",
      value: "78.18",
      change: 3.7,
      prefix: "$",
      suffix: "",
    },
    {
      title: "Conversion Rate",
      value: "3.2",
      change: -0.8,
      prefix: "",
      suffix: "%",
    },
    {
      title: "Visitors",
      value: "51,238",
      change: 15.3,
      prefix: "",
      suffix: "",
    },
    {
      title: "Cart Abandonment",
      value: "68.4",
      change: -2.1,
      prefix: "",
      suffix: "%",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">
        Performance Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            prefix={metric.prefix}
            suffix={metric.suffix}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
}
