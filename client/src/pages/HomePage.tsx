import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">FinTrack</h1>
          <nav className="space-x-6">
            <a href="#features" className="text-gray-600 hover:text-green-600">Features</a>
            <a href="#about" className="text-gray-600 hover:text-green-600">About Us</a>
            <a href="#signup" className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700">Sign Up</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-green-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Take Control of Your Finances
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Effortlessly manage your income and expenses. Stay informed, stay ahead.
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#signup" className="bg-green-600 text-white px-6 py-3 rounded-md shadow hover:bg-green-700">
              Get Started
            </a>
            <a href="#features" className="bg-gray-100 text-green-600 px-6 py-3 rounded-md shadow hover:bg-gray-200">
              Learn More
            </a>
          </div>
          <div className="mt-10">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Dashboard Mockup"
              className="mx-auto shadow-md rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-8">Why Choose FinTrack?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8" />
                </svg>
              </div>
              <h4 className="font-bold text-lg mt-4">Expense Tracking</h4>
              <p className="text-gray-600">
                Track your daily, weekly, and monthly expenses effortlessly.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M9 21V3M15 21V3" />
                </svg>
              </div>
              <h4 className="font-bold text-lg mt-4">Income Insights</h4>
              <p className="text-gray-600">
                Get clear insights into your earnings.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a4 4 0 00-8 0v2m12 0v4H3v-4m18 4v6H3v-6" />
                </svg>
              </div>
              <h4 className="font-bold text-lg mt-4">Custom Categories</h4>
              <p className="text-gray-600">
                Organize your transactions in personalized categories.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 108 0 4 4 0 00-8 0zm4 4v-4m0-4v4m4-4h-4m4 0h4" />
                </svg>
              </div>
              <h4 className="font-bold text-lg mt-4">Budget Alerts</h4>
              <p className="text-gray-600">
                Stay on top of your finances with budget notifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 FinTrack. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
