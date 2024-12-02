import { Bar, BarChart, CartesianGrid } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Sample data for income and expenses


const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function IncomeExpenseChart({incomes,expenses}:{incomes: string, expenses: string,}) {
  const chartData = [
    {  income: incomes, expenses: expenses },
    {  income: incomes, expenses: expenses },
    {  income: incomes, expenses: expenses },
    
  ]
  return (
    <Card>
      <CardHeader className="text-center text-xl font-semibold">
        <CardTitle>Income & Expenses</CardTitle>
        <div className="text-sm font-semibold text-gray-500">
          View your expenses and incomes in Table graph
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            {/* <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            /> */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
