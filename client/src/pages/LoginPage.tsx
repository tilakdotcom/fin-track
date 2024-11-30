import React from 'react'

export default function LoginPage() {
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
          <form className="w-full max-w-xl bg-gray-800 p-8 rounded-lg shadow-md md:space-y-3 space-y-2 h-auto">
            <h2 className="text-2xl font-bold text-center text-white ">
              Sign Up
            </h2>
            <p className="text-center">
              Create an account to access your income , expenses and more.
            </p>
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

            <div className=" py-2 md:py-4">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary-light hover:bg-primary-dark text-white rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-primary-light transition-all duration-200 ease-linear"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
