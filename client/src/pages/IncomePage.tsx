import Card from "@/components/Card";
import api from "@/lib/axiousInstance";
import React, { useEffect, useState } from "react";
  interface IEnumerable {
    source: string;
    amount: number;
    createdAt: string;
    category: string;
    type: string;
  }
const Income: React.FC = () => {
  const [data , setData] = useState<IEnumerable[] | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading,setLoading] = useState<boolean>(false)


  const fetchIncomeItem = async()=>{
    setLoading(true)
    try {
      const res = await api.get("/income")
      if(!res){
        throw new Error("Error fetching income item")
      }
      setData(res.data.data.incomes)
    } catch (error) {
      console.error("Error fetching income item", error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchIncomeItem()
  },[])
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 text-center py-3 md:py-5">All Expenses Tracker</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
        {data && data.map((expense, index) => (
          <Card
            key={index}
            title={expense.source}
            amount={expense.amount}
            date={expense.createdAt}
            category={expense.category}
            type="income"
          />
        ))}
      </div>
    </div>
  );
};

export default Income;
