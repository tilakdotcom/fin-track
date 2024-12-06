import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-4 flex flex-col md:flex-row  justify-center gap-x-4 md:text-lg items-center px-6 ">
      <div className="flex items-center space-x-2">
        <span className=" font-bold">Designed & Developed by</span>
        <span className="text-green-500 font-semibold">
          <Link
            to="https://github.com/tilakdotcom"
            target="_blank"
            rel="noopener noreferrer"
            className="md:text-lg font-bold rounded-full  hover:bg-transparent transition-all duration-200 hover:text-green-600 flex items-center justify-center"
          >
            Tilak Singh
          </Link>
        </span>
      </div>

      <div className="mt-2 md:mt-0">
        <p className="text-sm text-gray-400">
          {" "}
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>

      <div className="flex space-x-4 mt-2 md:hidden">
        <Link
          to="https://github.com/tilakdotcom"
          target="_blank"
          rel="noopener noreferrer"
          className="md:text-lg font-bold border-2 border-green-600  bg-green-600 rounded-full p-1.5 md:p-2 hover:bg-transparent transition-all duration-200 hover:text-green-700 flex items-center justify-center"
        >
          <Github />
        </Link>
        <Link
          to="https://linkedin.com/in/tilakdotcom"
          target="_blank"
          rel="noopener noreferrer"
          className="md:text-lg font-bold border-2 border-green-600  bg-green-600 rounded-full p-1.5 md:p-2 hover:bg-transparent transition-all duration-200 hover:text-green-700 flex items-center justify-center"
        >
         <Linkedin  className=""/>
        </Link>
      </div>
    </footer>
  );
}
