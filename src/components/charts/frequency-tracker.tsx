"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { digit: "0", count: 18, fill: "var(--color-d0)" },
  { digit: "1", count: 25, fill: "var(--color-d1)" },
  { digit: "2", count: 15, fill: "var(--color-d2)" },
  { digit: "3", count: 32, fill: "var(--color-d3)" },
  { digit: "4", count: 21, fill: "var(--color-d4)" },
  { digit: "5", count: 28, fill: "var(--color-d5)" },
  { digit: "6", count: 19, fill: "var(--color-d6)" },
  { digit: "7", count: 22, fill: "var(--color-d7)" },
  { digit: "8", count: 35, fill: "var(--color-d8)" },
  { digit: "9", count: 27, fill: "var(--color-d9)" },
]

const chartConfig = {
  count: { label: "Count" },
  d0: { label: "Digit 0", color: "hsl(var(--chart-1))" },
  d1: { label: "Digit 1", color: "hsl(var(--chart-2))" },
  d2: { label: "Digit 2", color: "hsl(var(--chart-3))" },
  d3: { label: "Digit 3", color: "hsl(var(--chart-4))" },
  d4: { label: "Digit 4", color: "hsl(var(--chart-5))" },
  d5: { label: "Digit 5", color: "hsl(var(--chart-1))" },
  d6: { label: "Digit 6", color: "hsl(var(--chart-2))" },
  d7: { label: "Digit 7", color: "hsl(var(--chart-3))" },
  d8: { label: "Digit 8", color: "hsl(var(--chart-4))" },
  d9: { label: "Digit 9", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig

export function FrequencyTracker() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="digit"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <YAxis />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="count" radius={8} />
      </BarChart>
    </ChartContainer>
  )
}
