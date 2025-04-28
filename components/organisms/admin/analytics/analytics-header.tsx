"use client";

import { useState } from "react";
import { Calendar, Download, FileSpreadsheet, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/molecules/date-picker-with-range";
import { cn } from "@/lib/user/utils";
import { format } from "date-fns";

interface AnalyticsHeaderProps {
  dateRange: DateRange;
  setDateRange: (range: DateRange & { preset?: string }) => void;
  compareMode: boolean;
  setCompareMode: (value: boolean) => void;
}

export default function AnalyticsHeader({
  dateRange,
  setDateRange,
  compareMode,
  setCompareMode,
}: AnalyticsHeaderProps) {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const presets = [
    { label: "Today", value: "today", days: 0 },
    { label: "Yesterday", value: "yesterday", days: 1 },
    { label: "Last 7 days", value: "last7Days", days: 7 },
    { label: "Last 30 days", value: "last30Days", days: 30 },
    { label: "This month", value: "thisMonth", days: 0, type: "month" },
    { label: "Last month", value: "lastMonth", days: 0, type: "lastMonth" },
  ];

  const handlePresetClick = (preset: any) => {
    const today = new Date();
    let from = new Date();
    let to = new Date();

    if (preset.type === "month") {
      from = new Date(today.getFullYear(), today.getMonth(), 1);
      to = today;
    } else if (preset.type === "lastMonth") {
      const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
      const year =
        today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
      from = new Date(year, lastMonth, 1);
      to = new Date(year, lastMonth + 1, 0);
    } else {
      from = new Date(today);
      if (preset.value === "yesterday") {
        from.setDate(from.getDate() - 1);
        to = new Date(from);
      } else {
        from.setDate(from.getDate() - preset.days);
      }
    }

    setDateRange({ from, to, preset: preset.value });
  };

  const getActiveDateRangeText = () => {
    if (!dateRange.from || !dateRange.to) return "Select date range";

    const preset = presets.find((p) => p.value === dateRange.preset);
    if (preset) return preset.label;

    return `${format(dateRange.from, "MMM d, yyyy")} - ${format(
      dateRange.to,
      "MMM d, yyyy"
    )}`;
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-100">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">
              Comprehensive insights into your store's performance
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto justify-start sm:justify-between gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{getActiveDateRangeText()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[240px]">
                {presets.map((preset) => (
                  <DropdownMenuItem
                    key={preset.value}
                    className={cn(
                      "cursor-pointer",
                      dateRange.preset === preset.value && "bg-muted"
                    )}
                    onClick={() => handlePresetClick(preset)}
                  >
                    {preset.label}
                  </DropdownMenuItem>
                ))}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-normal mt-1"
                    >
                      Custom Range
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DatePickerWithRange
                      dateRange={dateRange}
                      onChange={(range) =>
                        setDateRange({ ...range, preset: undefined })
                      }
                    />
                  </PopoverContent>
                </Popover>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="compare-mode"
                  checked={compareMode}
                  onCheckedChange={setCompareMode}
                />
                <Label htmlFor="compare-mode" className="cursor-pointer">
                  Compare
                </Label>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Popover open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-medium">Schedule Report</h4>
                    <div className="space-y-2">
                      <Label htmlFor="report-name">Report Name</Label>
                      <input
                        id="report-name"
                        className="w-full p-2 border rounded-md"
                        placeholder="Monthly Performance"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Frequency</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Daily", "Weekly", "Monthly"].map((freq) => (
                          <Button
                            key={freq}
                            variant="outline"
                            className="w-full"
                            size="sm"
                          >
                            {freq}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Recipients</Label>
                      <input
                        className="w-full p-2 border rounded-md"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsScheduleOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => setIsScheduleOpen(false)}>
                        Schedule
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
