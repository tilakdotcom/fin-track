import Card from "@/components/Card";
import React from "react";

const AddExpense: React.FC = () => {
  const expenseData = [
    {
      title: "Groceries",
      amount: 120.5,
      date: "2024-11-01",
      category: "Food",
    },
    {
      title: "Electricity Bill",
      amount: 75.3,
      date: "2024-11-05",
      category: "Utilities",
    },
    {
      title: "Groceries",
      amount: 120.5,
      date: "2024-11-01",
      category: "Food",
    },
    {
      title: "Electricity Bill",
      amount: 75.3,
      date: "2024-11-05",
      category: "Utilities",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 text-center py-3 md:py-5">All Expenses Tracker</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
        {expenseData.map((expense, index) => (
          <Card
            key={index}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
            category={expense.category}
            type="expense"
          />
        ))}
      </div>
    </div>
  );
};

export default AddExpense;
