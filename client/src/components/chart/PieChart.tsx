import { useState, useEffect } from "react";
import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const defaultChartConfig = {
  amount: { label: "Amount" },
  groceries: { label: "Groceries", color: "hsl(var(--chart-1))" },
  rent: { label: "Rent", color: "hsl(var(--chart-2))" },
  utilities: { label: "Utilities", color: "hsl(var(--chart-3))" },
  entertainment: { label: "Entertainment", color: "hsl(var(--chart-4))" },
  other: { label: "Other", color: "hsl(var(--chart-5))" },
} satisfies ChartConfig;

const sampleData = [
  { category: "Groceries", amount: 500, fill: "hsl(var(--chart-1))" },
  { category: "Rent", amount: 1500, fill: "hsl(var(--chart-2))" },
  { category: "Utilities", amount: 300, fill: "hsl(var(--chart-3))" },
  { category: "Entertainment", amount: 200, fill: "hsl(var(--chart-4))" },
  { category: "Other", amount: 100, fill: "hsl(var(--chart-5))" },
];

const PieCircle: React.FC<{ title?: string }> = ({ title = "Expense Breakdown" }) => {
  const [chartData, setChartData] = useState(sampleData);

  useEffect(() => {
    // Simulating data fetch
    const loadData = () => {
      setChartData(sampleData); // Replace this with your dynamic fetch logic
    };
    loadData();
  }, []);

  return (
    <Card className="flex flex-col bg-white shadow-lg p-6 rounded-lg ">
      <CardHeader className="text-xl font-semibold text-center">
        <CardTitle>{title}</CardTitle>
        <div className="text-sm text-gray-500">
          View your expenses in a circle graph
        </div>
        <div className="flex flex-row gap-2 justify-center flex-wrap">
    {sampleData.map((data, index) => (
      <div key={index} className="flex flex-row items-center space-x-2">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: data.fill }}
        ></span>
        <span className="text-sm font-medium">{data.category}</span>
      </div>
    ))}
  </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={defaultChartConfig}
          className=" h-full w-full [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="amount" hideLabel />}
            />
            <Pie data={chartData} dataKey="amount" nameKey="category" fill-Key="fill">
              <LabelList
                dataKey="category"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof defaultChartConfig) =>
                  defaultChartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PieCircle;
