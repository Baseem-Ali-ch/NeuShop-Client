"use client"

import { useEffect, useRef } from "react"

interface SparklineProps {
  data: number[]
  width: number
  height: number
  color?: string
  fillColor?: string
}

export function Sparkline({
  data,
  width,
  height,
  color = "#10b981",
  fillColor = "rgba(16, 185, 129, 0.2)",
}: SparklineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    if (data.length < 2) return

    // Find min and max values
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1

    // Calculate x and y coordinates
    const points = data.map((value, index) => ({
      x: (index / (data.length - 1)) * width,
      y: height - ((value - min) / range) * (height * 0.8) - height * 0.1,
    }))

    // Draw the line
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)

    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }

    ctx.strokeStyle = color
    ctx.lineWidth = 1.5
    ctx.stroke()

    // Fill the area under the line
    ctx.lineTo(points[points.length - 1].x, height)
    ctx.lineTo(points[0].x, height)
    ctx.closePath()

    ctx.fillStyle = fillColor
    ctx.fill()
  }, [data, width, height, color, fillColor])

  return <canvas ref={canvasRef} width={width} height={height} className="inline-block" />
}
