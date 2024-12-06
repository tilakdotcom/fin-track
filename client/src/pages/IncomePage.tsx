import Card from "@/components/Card";
import { IncomeEnumerable } from "@/components/types/types";
import api from "@/lib/axiousInstance";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Income: React.FC = () => {
  const [data, setData] = useState<IncomeEnumerable[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchIncomeItem = async () => {
    setLoading(true);
    try {
      const res = await api.get("/income");
      if (!res) {
        throw new Error("Error fetching income item");
      }
      setData(res.data.data.incomes);
    } catch (error) {
      console.error("Error fetching income item", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomeItem();
  }, []);

    // hande on delete
    const handleDelete = async (id: string) => {
      // setLoading(true);
      try {
        const res = await api.delete(`/income/${id}`);
        if (!res) {
          toast.error("Failed to delete expense");
          // throw new Error("Error deleting expense");
        }
        toast.success("Expense has been deleted successfully");
        setData(data && data?.filter((item) => item._id !== id));
      } catch (error) {
        toast.error("Failed to delete expense");
        console.error("Error deleting expense", error);
      }finally{
        // setLoading(false);
      }
    };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 text-center py-3 md:py-5">
        All Income Tracker
      </h1>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
        {data &&
          data.map((expense, index) => (
            <Card
            handleOnDelete={handleDelete}
              id={expense._id}
              key={index}
              title={expense.source}
              amount={expense.amount}
              date={expense.createdAt}
              category={expense.category}
              type="income"
            />
          ))}
      </div>
      {!loading && data && data?.length== 0 && (
        <p className="text-black flex justify-center items-center h-40 font-bold md:text-4xl text-2xl">
          Add Income to SEE...
        </p>
      )}
      {loading && (
        <p className="text-black flex justify-center items-center h-40 font-bold md:text-4xl text-2xl">
          Loading...
        </p>
      )}
    </div>
  );
};

export default Income;
