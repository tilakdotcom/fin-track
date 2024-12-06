import { Trash2 } from "lucide-react";
import { EditCard } from "./edit/EditCard";
import { CardProps } from "./types/types";
interface CartType extends CardProps {
  handleOnDelete: (id: string) => void;
}

const Card: React.FC<CartType> = ({
  id,
  title,
  amount,
  date,
  category,
  type,
  handleOnDelete,
}) => {
  return (
    <div className="relative bg-gradient-to-br from-white to-gray-300 shadow-md rounded-xl overflow-hidden border border-gray-200 transform transition-transform duration-300 hover:scale-105 shadow-neutral-500 flex flex-col  justify-between">
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
              {category.name ? category.name : "Expense"}
            </span>
          ) : (
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full
             bg-green-100 text-green-600`}
            >
              {category.name ? category.name : "Income"}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 w-11/12">{title}</h3>

        {/* Amount */}

        {type === "expense" ? (
          <div className="text-lg md:text-3xl font-bold text-red-600">
            &#8377; {amount.toFixed(2)}
          </div>
        ) : (
          <div className="text-3xl font-bold text-green-600">
            &#8377; {amount.toFixed(2)}
          </div>
        )}
      </div>

      {/* icons */}

      <div className="absolute bottom-6 md:bottom-10 z-10 right-4 flex flex-col gap-4">
        <button
          onClick={() => handleOnDelete(id)}
          className=" font-bold cursor-pointer "
        >
          <Trash2 className="text-rose-500 text-xl " />
        </button>
        <div className="">
          <EditCard
            cardId={id}
            Cardamount={amount}
            title={title}
            key={id}
            catType={type}
          />
        </div>
      </div>

      
      <div className="">
        {/* Accent Bottom Border */}
        {type === "expense" ? (
          <div
            className="md:h-2 h-1
            bg-red-500"
          />
        ) : (
          <div
            className={`md:h-2 h-1
            bg-green-500
        `}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
