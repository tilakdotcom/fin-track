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
import { Input } from "@/components/ui/input";
import { z } from "zod";
import api from "@/lib/axiousInstance";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditSchema } from "@/schemas/editSchema";
import { useNavigate } from "react-router-dom";

interface EditType {
  Cardamount: number;
  title: string;
  catType: string;
  cardId: string;
}
export function EditCard({ Cardamount, cardId, catType, title }: EditType) {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof EditSchema>>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      amount: Cardamount || 0,
      title: title || "",
    },
  });

  async function onSubmit(values: z.infer<typeof EditSchema>) {
    setLoading(true);
    if (catType === "expense") {
      try {
        const res = await api.put(`/expense/${cardId}`, {
          amount: values.amount,
          title: values.title,
        });
        if (!res) {
          toast.error("Failed to update Expense");
          throw new Error("Failed to update Expense");
        }
        toast.success("Expense has been updated successfully");
      } catch (error) {
        toast.error("Failed to update expense");
        throw new Error("Failed to update expense");
      } finally {
        setLoading(false);
        navigate(0)
      }
    } else if (catType === "income") {
      try {
        const res = await api.put(`/income/${cardId}`, {
          amount: values.amount,
          source: values.title,
        });
        if (!res) {
          toast.error("Failed to update income");
          throw new Error("Failed to update income");
        }
        toast.success("Income has been updated successfully");
      } catch (error) {
        toast.error("Failed to update Income");
        throw new Error("Failed to update Income");
      } finally {
        setLoading(false);
        navigate("/income");
      }
    } else {
      toast.error("invalid request");
      throw new Error("invalid request");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FilePenLine className=" text-blue-600 text-xl hover:text-blue-700 cursor-pointer" />
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
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block md:text-base font-medium text-gray-300 ">
                      Amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-primary-light focus:outline-none md:text-base select-none"
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
                name="title"
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
  );
}
