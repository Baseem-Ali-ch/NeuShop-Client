"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, LineChart, BarChartIcon, PieChart, Save, Clock, Plus, X } from "lucide-react"
import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"

interface SortableItemProps {
  id: string
  label: string
  onRemove: (id: string) => void
}

function SortableItem({ id, label, onRemove }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="flex items-center p-3 mb-2 bg-white border rounded-md shadow-sm">
      <div {...attributes} {...listeners} className="cursor-grab mr-2">
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>
      <span className="flex-1">{label}</span>
      <button onClick={() => onRemove(id)} className="text-gray-400 hover:text-gray-600">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export default function CustomReports() {
  const [selectedMetrics, setSelectedMetrics] = useState<Array<{ id: string; label: string }>>([
    { id: "revenue", label: "Revenue" },
    { id: "orders", label: "Orders" },
    { id: "aov", label: "Average Order Value" },
  ])

  const [chartType, setChartType] = useState("line")
  const { loading } = useSelector((state: RootState) => state.ui)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setSelectedMetrics((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleRemoveMetric = (id: string) => {
    setSelectedMetrics((metrics) => metrics.filter((metric) => metric.id !== id))
  }

  const availableMetrics = [
    { id: "visitors", label: "Visitors" },
    { id: "conversion", label: "Conversion Rate" },
    { id: "cart_abandonment", label: "Cart Abandonment" },
    { id: "profit", label: "Profit" },
    { id: "margin", label: "Profit Margin" },
  ]

  const handleAddMetric = (metric: { id: string; label: string }) => {
    if (!selectedMetrics.some((m) => m.id === metric.id)) {
      setSelectedMetrics([...selectedMetrics, metric])
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm border border-gray-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Custom Report Builder</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Template
              </Button>
            </div>
          </div>
          <CardDescription>
            Build custom reports by selecting metrics, dimensions, and visualization options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Selected Metrics</h3>
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={selectedMetrics.map((m) => m.id)} strategy={verticalListSortingStrategy}>
                    {selectedMetrics.map((metric) => (
                      <SortableItem key={metric.id} id={metric.id} label={metric.label} onRemove={handleRemoveMetric} />
                    ))}
                  </SortableContext>
                </DndContext>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Available Metrics</h3>
                <div className="space-y-2">
                  {availableMetrics.map((metric) => (
                    <div
                      key={metric.id}
                      className="flex items-center p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleAddMetric(metric)}
                    >
                      <Plus className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Chart Type</h3>
              <div className="grid grid-cols-3 gap-3">
                <div
                  className={`flex flex-col items-center p-3 border rounded-md cursor-pointer ${
                    chartType === "line" ? "bg-primary/10 border-primary" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setChartType("line")}
                >
                  <LineChart className="h-8 w-8 mb-2" />
                  <span className="text-sm">Line</span>
                </div>
                <div
                  className={`flex flex-col items-center p-3 border rounded-md cursor-pointer ${
                    chartType === "bar" ? "bg-primary/10 border-primary" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setChartType("bar")}
                >
                  <BarChartIcon className="h-8 w-8 mb-2" />
                  <span className="text-sm">Bar</span>
                </div>
                <div
                  className={`flex flex-col items-center p-3 border rounded-md cursor-pointer ${
                    chartType === "pie" ? "bg-primary/10 border-primary" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setChartType("pie")}
                >
                  <PieChart className="h-8 w-8 mb-2" />
                  <span className="text-sm">Pie</span>
                </div>
              </div>

              <h3 className="text-sm font-medium mt-4 mb-2">Dimensions</h3>
              <div className="space-y-2">
                <div className="flex items-center p-2 border rounded-md">
                  <input type="checkbox" id="time" className="mr-2" checked />
                  <label htmlFor="time">Time</label>
                </div>
                <div className="flex items-center p-2 border rounded-md">
                  <input type="checkbox" id="product" className="mr-2" />
                  <label htmlFor="product">Product</label>
                </div>
                <div className="flex items-center p-2 border rounded-md">
                  <input type="checkbox" id="category" className="mr-2" />
                  <label htmlFor="category">Category</label>
                </div>
                <div className="flex items-center p-2 border rounded-md">
                  <input type="checkbox" id="channel" className="mr-2" />
                  <label htmlFor="channel">Channel</label>
                </div>
              </div>

              <h3 className="text-sm font-medium mt-4 mb-2">Filters</h3>
              <div className="p-3 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Date Range</span>
                  <select className="text-sm border rounded p-1">
                    <option>Last 30 days</option>
                    <option>Last 7 days</option>
                    <option>This month</option>
                    <option>Custom</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Min. Order Value</span>
                  <input type="text" className="text-sm border rounded p-1 w-20" placeholder="$0" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Preview</h3>
              <div className="border rounded-md p-4 h-[300px] flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="text-4xl text-gray-300 mb-2">
                    {chartType === "line" ? <LineChart /> : chartType === "bar" ? <BarChartIcon /> : <PieChart />}
                  </div>
                  <p className="text-sm text-gray-500">Your custom report preview will appear here</p>
                  <p className="text-xs text-gray-400 mt-1">Select metrics and dimensions to visualize</p>
                </div>
              </div>

              <div className="mt-4">
                <Button className="w-full">Generate Report</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
