import { Cell, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ExpenseEnumerable } from "../types/types";

const PieCircle: React.FC<{ expenseData: ExpenseEnumerable[] | undefined }> = ({
  expenseData,
}) => {
  return (
    <Card className="flex flex-col bg-white shadow-lg p-6 rounded-lg ">
      <CardHeader className="text-xl font-semibold text-center">
        <CardTitle>Expense Breakdown</CardTitle>
        <div className="text-sm text-gray-500">
          View your expenses in a circle graph
        </div>
        <div className="flex flex-row gap-2 justify-center flex-wrap">
          {expenseData &&
            expenseData.map((data, index) => (
              <div key={index} className="flex flex-row items-center space-x-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: data.color }}
                ></span>
                <span className="text-sm font-medium">{data.category}</span>
              </div>
            ))}
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0 text-black">
        <ChartContainer
          config={{}}
          className=" h-full w-full [&_.recharts-text]:fill-background"
        >
          <PieChart className="">
            <ChartTooltip
              content={<ChartTooltipContent nameKey="amount" hideLabel />}
            />
            <Pie
              data={expenseData}
              dataKey="amount"
              nameKey="category"
              outerRadius={80}
              label
              className="text-black"
            >
              {expenseData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} className="" />
              ))}
            </Pie>

            <div className="flex flex-row gap-2 justify-center flex-wrap">
              {expenseData &&
                expenseData.map((data, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center space-x-2"
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: data.color }}
                    ></span>
                    <span className="text-sm font-medium">{data.category}</span>
                  </div>
                ))}
            </div>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PieCircle;
