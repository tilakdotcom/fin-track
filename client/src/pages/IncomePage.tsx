import Card from "@/components/Card";
import { IncomeEnumerable } from "@/components/types/types";
import api from "@/lib/axiousInstance";
import React, { useEffect, useState } from "react";

const Income: React.FC = () => {
  const [data , setData] = useState<IncomeEnumerable[] | null>(null)
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
      {loading && <p className="text-black flex justify-center items-center h-40 font-bold md:text-4xl text-2xl">Loading...</p>}
      {!loading && data && data?.length < 0 && <p className="text-black flex justify-center items-center h-40 font-bold md:text-4xl text-2xl">Add Income to SEE...</p>}
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
