import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="lg:px-20 px-10 py-5 ">
      <div className="md:grid-cols-2 grid grid-cols-1 gap-10">
        {/* Left section with image */}
        <div className="flex justify-center items-center">
          <img
            draggable="false"
            unselectable="on"
            src="/home.svg"
            alt="upload income and expense Illustration"
            className="w-auto h-auto aspect-square"
          />
        </div>

        {/* Right section with signup form */}
        <div className="flex justify-center items-center lg:px-16 order-first md:order-last">
          <div className="md:space-y-10 space-y-6">
            <div className="md:text-4xl text-3xl font-bold text-center text-green-400 capitalize font-sans">
              Track your income, expenses, and savings with Fintrack.
            </div>
            <p className="md:text-base text-center italic text-gray-300">
              Effortlessly manage your finances with FinTrack. Monitor your
              income, control expenses, and achieve your savings goals with
              powerful analytics and intuitive tools designed for financial
              freedom.
            </p>
            <div className="flex justify-center">
              <Link to={'/signup'} className="md:py-4 md:px-5 py-2.5 px-4 bg-green-400 text-white font-bold uppercase rounded-xl hover:bg-green-600 transition-all duration-200 ease-linear">
                Sign Up Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
