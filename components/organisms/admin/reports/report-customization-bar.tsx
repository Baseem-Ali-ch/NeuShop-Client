"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import {
  setGroupBy,
  setViewMode,
  toggleFilterPanel,
} from "@/store/slices/reportsSlice";
import {
  Filter,
  BarChart3,
  Table2,
  Download,
  Save,
  Clock,
  FileSpreadsheet,
  FileText,
  FileImage,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/user/utils";

interface ReportCustomizationBarProps {
  onExport: () => void;
}

export default function ReportCustomizationBar({
  onExport,
}: ReportCustomizationBarProps) {
  const dispatch = useDispatch();
  const { groupBy, viewMode, showFilterPanel } = useSelector(
    (state: RootState) => state.reports
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 bg-muted/40 border rounded-lg">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className={cn(showFilterPanel && "bg-muted")}
          onClick={() => dispatch(toggleFilterPanel())}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Group by:</span>
          <Select
            value={groupBy}
            onValueChange={(value) => dispatch(setGroupBy(value))}
          >
            <SelectTrigger className="h-9 w-[130px]">
              <SelectValue placeholder="Select grouping" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-none border-r h-9 px-3",
              viewMode === "chart" && "bg-muted"
            )}
            onClick={() => dispatch(setViewMode("chart"))}
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-none h-9 px-3",
              viewMode === "table" && "bg-muted"
            )}
            onClick={() => dispatch(setViewMode("table"))}
          >
            <Table2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onExport}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExport}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Excel
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExport}>
              <FileText className="h-4 w-4 mr-2" />
              PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExport}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Google Sheets
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExport}>
              <FileImage className="h-4 w-4 mr-2" />
              Image
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>

        <Button variant="outline" size="sm">
          <Clock className="h-4 w-4 mr-2" />
          Schedule
        </Button>
      </div>
    </div>
  );
}
