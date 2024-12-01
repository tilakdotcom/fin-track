import { FilePenLine, Trash2 } from "lucide-react";
import React from "react";

interface ExpenseCardProps {
  type: string;
  title: string;
  amount: number;
  date: string; // Format: YYYY-MM-DD
  category: string;
}

const Card: React.FC<ExpenseCardProps> = ({
  title,
  amount,
  date,
  category,
  type,
}) => {
  return (
    <div className="relative bg-gradient-to-br from-white to-gray-300 shadow-md rounded-xl overflow-hidden border border-gray-200 transform transition-transform duration-300 hover:scale-105 shadow-neutral-500 ">
      <div className="p-5 space-y-2.5 md:space-y-4">
        {/* Date and Category */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          {type === "expense" ? (
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full
            bg-red-100 text-red-600`}
            >
              {category}
            </span>
          ) : (
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full
             bg-green-100 text-green-600`}
            >
              {category}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>

        {/* Amount */}

        {type === "expense" ? (
          <div className="text-lg md:text-3xl font-bold text-red-600">
            ${amount.toFixed(2)}
          </div>
        ) : (
          <div className="text-3xl font-bold text-green-600">
            ${amount.toFixed(2)}
          </div>
        )}
      </div>

      {/* Accent Bottom Border */}
      {type === "expense" ? (
        <div
          className="md:h-2 h-1
            bg-red-500"
        />
      ) : (
        <div
          className={`md:h-2
            h-1
            bg-green-500
        `}
        ></div>
      )}

      {/* icons */}

      <div className="absolute bottom-6 md:bottom-10 z-10 right-4 flex flex-col gap-4">

        <div className=" font-bold cursor-pointer">
           <Trash2  className="text-rose-600 text-xl hover:text-red-700"/>
        </div>
        <div className="">
        <FilePenLine className="text-blue-600 text-xl hover:text-blue-700 cursor-pointer" />
        </div>
       
      </div>
    </div>
  );
};

export default Card;
