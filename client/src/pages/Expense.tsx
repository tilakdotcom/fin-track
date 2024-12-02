import Card from "@/components/Card";
import { ExpenseEnumerable } from "@/components/types/types";
import api from "@/lib/axiousInstance";
import React, { useEffect, useState } from "react";
const AddExpense: React.FC = () => {

  const [data , setData] = useState<ExpenseEnumerable[] | null>(null)
  const [loading,setLoading] = useState<boolean>(false)


  const fetchExpenseItem = async()=>{
    setLoading(true)
    try {
      const res = await api.get("/expense")
      if(!res){
        throw new Error("Error fetching expense item")
      }
      setData(res.data.data.expenses)
    } catch (error) {
      console.error("Error fetching expenses item", error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchExpenseItem()
  },[data?.length])
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 text-center py-3 md:py-5">All Expenses Tracker</h1>
      {loading && <p className="text-black flex justify-center items-center h-40 font-bold md:text-4xl text-2xl">Loading...</p>}
      {!loading && data && data?.length < 0 && <p className="text-black flex justify-center items-center h-40 font-bold md:text-4xl text-2xl">Add Expense to SEE...</p>}
      
      {data && data?.length < 1 && <p>No expenses found.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
        {data && data.map((expense, index) => (
          <Card
            key={index}
            title={expense.title}
            amount={expense.amount}
            date={expense.createdAt}
            category={expense.category}
            type="expense"
          />
        ))}
      </div>
    </div>
  );
};

export default AddExpense;
