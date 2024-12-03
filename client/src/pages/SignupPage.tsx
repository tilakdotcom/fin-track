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
import { signupSchma } from "@/schemas/signupSchema";
import { z } from "zod";
import api from "@/lib/axiousInstance";
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function SignupPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const successToast = () => toast.success("Signup has been successfully");
  //for error
  const errorToast = () => toast.error("Signup Failed");
  const form = useForm<z.infer<typeof signupSchma>>({
    resolver: zodResolver(signupSchma),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      avatar: null,
    },
  });

  async function onSubmit(values: z.infer<typeof signupSchma>) {
    //creating FORMDATA
    setLoading(true);
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    // Append file fields
    if (values.avatar) formData.append("avatar", values.avatar);

    try {
      const response = await api.post("/user/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //validation
      if (response.status !== 201) {
        throw new Error("Signup Failed");
      }
      successToast();
      console.log("User Signup Successful", response);
    } catch (error) {
      console.log("Signup Failed", error);
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
            src="/signup.svg"
            alt="Signup Illustration"
            className="w-auto h-auto aspect-square"
              draggable="false"
            unselectable="on"
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
                Sign Up
              </h2>
              <p className="text-center">
                Create an account to access your income , expenses and more.
              </p>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block md:text-base font-medium text-gray-300 ">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-primary-light focus:outline-none md:text-base"
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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

              <FormField
                control={form.control}
                name="avatar"
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        type="file"
                        className="w-full px-4 py-2 rounded-md file:text-white bg-gray-900 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-primary-light focus:outline-none md:text-base"
                        placeholder="Upload your profile picture"
                        required
                        accept="image/*, application/pdf"
                        onChange={(event) =>
                          onChange(
                            (event.target.files && event.target.files[0]) ||
                              null
                          )
                        }
                      />
                    </FormControl>
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
                  {loading ? "Wait" : "Sign Up"}
                </Button>
              </div>
            </form>
          </Form>

          {/* <form className="w-full bg-gray-800 p-8 rounded-lg shadow-md md:space-y-3 space-y-2 h-auto">
            <h2 className="text-2xl font-bold text-center text-white ">
              Sign Up
            </h2>
            <p className="text-center">
              Create an account to access your income , expenses and more.
            </p>
            <div className="space-y-1 ">
              <label
                htmlFor="name"
                className="block md:text-base font-medium text-gray-300 "
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-primary-light focus:outline-none md:text-base"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-1 ">
              <label
                htmlFor="email"
                className="block md:text-base font-medium text-gray-300 "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-primary-light focus:outline-none md:text-base"
                placeholder="Enter your Email"
              />
            </div>

            <div className="space-y-1 ">
              <label
                htmlFor="password"
                className="block md:text-base font-medium text-gray-300 "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                // show password

                name="password"
                className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-primary-light focus:outline-none md:text-base"
                placeholder="Enter your Password"
              />
            </div>

            <div className="space-y-1 ">
              <label
                htmlFor="file"
                className="block md:text-base font-medium text-gray-300 "
              >
                Profile Image
              </label>
              <input
                type="file"
                id="file"
                name="file"
                className="w-full px-4 py-2 rounded-md bg-gray-900 text-gray-100 border border-gray-700 focus:ring-2 focus:ring-primary-light focus:outline-none md:text-base"
                placeholder="Upload profile image"
              />
            </div>

            <div className=" py-2 md:py-4">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary-light hover:bg-primary-dark text-white rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-200 ease-linear"
              >
                Sign Up
              </button>
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
}
