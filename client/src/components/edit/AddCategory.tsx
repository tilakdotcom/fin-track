import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FilePenLine } from "lucide-react";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import api from "@/lib/axiousInstance";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AddCategory } from "@/schemas/AddCategory";

export function EditCard() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof AddCategory>>({
    resolver: zodResolver(AddCategory),
    defaultValues: {
      name: "",
      type: null,
    },
  });

  async function onSubmit(values: z.infer<typeof AddCategory>) {
    setLoading(true);
    try {
      const res = await api.post("/category/add", {
        name: values.name,
        type: values.type,
      });
      if (!res) {
        toast.error("Failed to Add Category");
        throw new Error("Error deleting expense");
      }
      toast.success("Categoty has been added successfully");
      navigate("/add");
    } catch (error) {
      toast.error("Failed to add category");
      console.error("Error in adding category", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" text-blue-600 text-xl hover:text-blue-700 cursor-pointer" >
          Add Category
        </Button>
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
                          field.onChange(value);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Income OR expense" />
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
  );
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
