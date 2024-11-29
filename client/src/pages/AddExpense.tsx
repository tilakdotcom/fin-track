import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const expenseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  amount: z.number().positive('Amount must be positive'),
  date: z.string().min(1, 'Date is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

const AddExpense: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
  });

  const onSubmit = async (data: ExpenseFormData) => {
    setIsSubmitting(true);
    try {
      // Replace with your API call
      console.log('Expense Data:', data);

      // Reset form on successful submission
      reset();
      alert('Expense added successfully!');
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-8 border border-green-300"
      >
        <h2 className="text-2xl font-bold text-green-600 mb-6">Add Expense</h2>
        
        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register('title')}
            className={`mt-1 block w-full rounded-md border ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } shadow-sm focus:ring-green-500 focus:border-green-500`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Amount Field */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            {...register('amount', { valueAsNumber: true })}
            className={`mt-1 block w-full rounded-md border ${
              errors.amount ? 'border-red-500' : 'border-gray-300'
            } shadow-sm focus:ring-green-500 focus:border-green-500`}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        {/* Date Field */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            {...register('date')}
            className={`mt-1 block w-full rounded-md border ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            } shadow-sm focus:ring-green-500 focus:border-green-500`}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Category Field */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            {...register('category')}
            className={`mt-1 block w-full rounded-md border ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            } shadow-sm focus:ring-green-500 focus:border-green-500`}
          >
            <option value="">Select a category</option>
            <option value="Housing">Housing</option>
            <option value="Transportation">Transportation</option>
            <option value="Food">Food</option>
            <option value="Personal">Personal</option>
            <option value="Utilities">Utilities</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            {...register('description')}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white ${
            isSubmitting ? 'bg-green-300' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isSubmitting ? 'Adding...' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
