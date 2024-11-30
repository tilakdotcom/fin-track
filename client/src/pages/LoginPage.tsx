import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { loginSchma } from "@/schemas/loginSchema";
import { useAppDispatch } from "@/store/reduxHooks";
import { loginFailure, loginStart, loginSuccess } from "@/store/slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const router = useNavigate()
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch()
  const successToast = () => toast.success("Login has been successfully");
  //for error
  const errorToast = () => toast.error("Login Failed");
  const form = useForm<z.infer<typeof loginSchma>>({
    resolver: zodResolver(loginSchma),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchma>) {
    //creating FORMDATA
    setLoading(true);
    dispatch(loginStart())
    try {
      const response = await api.post("/user/login", values);
      //validation
      if (!response) {
        throw new Error("Login Failed");
      }
      successToast();
      dispatch(loginSuccess(response.data.data))
      router("/dashboard")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      dispatch(loginFailure())
      errorToast();
      return;
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="lg:px-20 px-10 py-5">
      <div className="md:grid-cols-2 grid grid-cols-1 gap-10">
        {/* Left section with image */}
        <div className="flex justify-center items-center">
          <img
            src="/login.svg"
            alt="Signup Illustration"
            className="w-auto h-auto aspect-square"
          />
        </div>

        {/* Right section with signup form */}
        <div className="flex justify-center items-center lg:px-16">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full bg-gray-800 p-8 rounded-lg shadow-md md:space-y-3 space-y-2 h-auto"
            >
              <h2 className="text-2xl font-bold text-center text-white ">
                Login
              </h2>
              <p className="text-center">
                Login your account to access your income , expenses and more.
              </p>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block md:text-base font-medium text-gray-300 ">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-primary-light focus:outline-none md:text-base"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block md:text-base font-medium text-gray-300 ">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-primary-light focus:outline-none md:text-base"
                        placeholder="Enter your password"
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
                  {loading ? "Wait" : "Login"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
