/* eslint-disable @typescript-eslint/no-unused-vars */
import LineChart from "@/components/chart/LineChart";
import PieCircle from "@/components/chart/PieChart";
import IncomeExpenseChart from "@/components/chart/TableChart";
import { ExpenseEnumerable, IncomeEnumerable } from "@/components/types/types";
import api from "@/lib/axiousInstance";
import { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const [data, setData] = useState<ExpenseEnumerable[] | undefined>(undefined);
  const [Loading, setLoading] = useState<boolean>(false);
  const [incomeData, setIncomeData] = useState<IncomeEnumerable[] | null>(null);

  const fetchIncomeItem = async () => {
    setLoading(true);
    try {
      const res = await api.get("/income");
      if (!res) {
        throw new Error("Error fetching income item");
      }
      setIncomeData(res.data.data.incomes);
    } catch (error) {
      console.error("Error fetching income item", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenseItem = async () => {
    setLoading(true);
    try {
      const res = await api.get("/expense");
      if (!res) {
        throw new Error("Error fetching expense item");
      }
      setData(res.data.data.expenses);
    } catch (error) {
      console.error("Error fetching expenses item", error);
    } finally {
      setLoading(false);
    }
  };

  //calculator
  const totalIncome =
    incomeData?.reduce((acc, item) => acc + item.amount, 0) || 0;
  const totalExpense = data?.reduce((acc, item) => acc + item.amount, 0) || 0;
  const netProfit = totalIncome - totalExpense;

  //useEffects
  useEffect(() => {
    fetchIncomeItem();
  }, [incomeData?.length]);

  useEffect(() => {
    fetchExpenseItem();
  }, [data?.length]);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 py-3 px-2 md:p-6 space-y-6">
      <h1 className="text-2xl md:text-4xl font-extrabold text-center">
        Expense & Income Dashboard
      </h1>
      {Loading && (
        <>
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin w-5 h-5 border-b-2 border-t-2 rounded-full border-gray-400 " />
          </div>
        </>
      )}
      {!Loading && (
        <div className=" bg-white shadow-lg rounded-lg p-3 md:py-4 md:px-5">
          <h2 className="md:text-lg text-base font-medium text-gray-600">
            Total Balance
          </h2>
          <p
            className={` text-2xl md:text-4xl font-bold  py-2 ${
              netProfit > 0 ? "text-green-500" : "text-red-500"
            } ${netProfit == 0 && "text-neutral-950 "}`}
          >
            &#8377; {netProfit}{" "}
            <span className="text-sm">
              {netProfit > 0 ? "Net Profit" : "Net Loss"}
            </span>{" "}
            <span className="text-sm">
              ({netProfit > 0 ? "+" : "-"}
              {Math.abs(netProfit).toFixed(2)})% of Total Income
            </span>
          </p>
          <p className="text-sm text-gray-500 py-2">
            Updated as of today. Keep tracking your finances!
          </p>
        </div>
      )}
      {!Loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6">
          {/* Total Balance */}
          {/* Line Chart */}
          <LineChart
            expenses={totalExpense.toFixed()}
            incomes={totalIncome.toFixed()}
          />

          {/* Bar Chart */}
          <IncomeExpenseChart  expenses={totalExpense.toFixed()}
            incomes={totalIncome.toFixed()}/>

          {/* Doughnut Chart */}
          <PieCircle expenseData={data} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
