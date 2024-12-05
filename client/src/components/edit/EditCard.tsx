import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import api from "@/lib/axiousInstance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddIncomeAndExpeneSchema } from "@/schemas/AddIncomeAndExpenses";

interface CategoryType {
  _id: string;
  name: string;
  type: string;
}


export function EditCard() {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryType[] | null>(null);
  const [catFilter, setCatFilter] = useState<CategoryType[] | null>(null);
  const [catType, setCatType] = useState<string | null>(null);

  const fetchedCategory = async () => {
    try {
      const res = await api.get("/category");
      if (!res) {
        throw new Error("Error fetching category");
      }
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  //use effects
  useEffect(() => {
    if (catType === "income") {
      setCatFilter(
        categories &&
          categories?.filter((category) => category.type === "income")
      );
    } else if (catType === "expense") {
      setCatFilter(
        categories &&
          categories?.filter((category) => category.type === "expense")
      );
    } else {
      setCatFilter(categories);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catType, catFilter?.length, categories?.length]);
  useEffect(() => {
    fetchedCategory();
  }, []);

  const form = useForm<z.infer<typeof AddIncomeAndExpeneSchema>>({
    resolver: zodResolver(AddIncomeAndExpeneSchema),
    defaultValues: {
      amount: 0,
      categoryId: "",
      source: "",
      type: null,
    },
  });
  async function onSubmit(values: z.infer<typeof AddIncomeAndExpeneSchema>) {
    setLoading(true);
    if (catType === "expense") {
      try {
        const res = await api.post("/expense/add", {
          amount: values.amount,
          categoryId: values.categoryId,
          title: values.source,
        });
        if (!res) {
          toast.error("Failed to add Expense");
          throw new Error("Failed to add Expense");
        }
        toast.success("Expense has been added successfully");
      } catch (error) {
        toast.error("Failed to add expense");
        throw new Error("Failed to add expense");
      } finally {
        setLoading(false);
        form.reset();
        router("/expense")
      }
    } else if (catType === "income") {
      try {
        const res = await api.post("/income/add", values);
        if (!res) {
          toast.error("Failed to add income");
          throw new Error("Failed to add income");
        }
        toast.success("Income has been added successfully");
      } catch (error) {
        toast.error("Failed to add Income");
        throw new Error("Failed to add Income");
      } finally {
        setLoading(false);
        form.reset();
        router("/income")
      }
    } else {
      toast.error("invalid request");
      throw new Error("invalid request");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2 className="text-rose-500 text-xl hover:text-red-500 bg-red-100"  />
      </DialogTrigger>
      <DialogContent className="p-0 rounded-lg ">
        <div className="flex justify-center items-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full bg-gray-800 p-8 rounded-lg shadow-md md:space-y-3 space-y-2 h-auto"
            >
              <h2 className="text-2xl font-bold text-center text-white ">
                Add Income and Expenses
              </h2>
              <p className="text-center">
                Add income and expenses to track your dashboard.
              </p>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block md:text-base font-medium text-gray-300 ">
                      Select Expense OR Income
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          setCatType(value);
                          field.onChange(value);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Income OR expense" className=""/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className=" overflow-y-scroll">
                          {incomeAndExpenseData.map((category, i) => (
                            <SelectItem key={i} value={category.type}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block md:text-base font-medium text-gray-300 ">
                      Category
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Category to store your Income OR expense" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {catFilter &&
                            catFilter.map((category) => (
                              <SelectItem
                                key={category._id}
                                value={category._id}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block md:text-base font-medium text-gray-300 ">
                      Amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-primary-light focus:outline-none md:text-base"
                        placeholder="Enter your Amount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block md:text-base font-medium text-gray-300 ">
                      Description OR Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-primary-light focus:outline-none md:text-base"
                        placeholder="Enter your Description here..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="py-2 md:py-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 px-4 bg-primary-light hover:bg-primary-dark text-white rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-200 ease-linear ${
                    loading ? " cursor-not-allowed bg-green-400" : ""
                  }`}
                >
                  {" "}
                  {loading ? "Wait" : "Add"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}



const incomeAndExpenseData = [
  {
    name: "Income",
    type: "income",
  },
  {
    name: "Expense",
    type: "expense",
  },
];