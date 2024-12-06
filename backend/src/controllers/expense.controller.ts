import Expense from "@/models/expense.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { generateRandomColor } from "@/utils/generateRandomColor";
import { Request, Response } from "express";
import mongoose from "mongoose";

const addExpense = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId, title, amount, description } = req.body;
  const userId = req.user?.id;

  //validation
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }
  if (!categoryId || !title || !amount) {
    throw new ApiError(
      400,
      "Please provide all required fields: categoryId, title, amount"
    );
  }
  //check if exist
  const expense = await Expense.findOne({
    userId: userId,
    categoryId: categoryId,
    title: title,
  });
  //validation
  if (expense) {
    throw new ApiError(
      400,
      "Expense with the same categoryId and title already exists"
    );
  }
  const color = generateRandomColor();
  //create expense
  const newExpense = new Expense({
    userId,
    categoryId: categoryId,
    title: title,
    amount: amount,
    description: description || undefined,
    color,
  });
  const savedExpense = await newExpense.save({ validateBeforeSave: false });

  return res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      message: "Expense added successfully",
      data: { expense: savedExpense },
    })
  );
});

const getAllExpenses = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  //validation
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }
  //find expenses by user id
  const expenses = await Expense.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
        pipeline: [
          {
            $project: {
              name: 1,
              _id: 1,
              type: 1,
            },
          },
        ],
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $addFields: {
        category: {
          $arrayElemAt: ["$category",0]
        },
      },
    },
  ]);
  if (!expenses) {
    throw new ApiError(404, "No expenses found for the user");
  }
  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Expenses fetched successfully",
      data: { expenses },
    })
  );
});

const updateExpense = asyncHandler(async (req: Request, res: Response) => {
  const { title, amount, description } = req.body;
  const { expenseId } = req.params;
  //validation
  if (!expenseId) {
    throw new ApiError(400, "Please provide an expense id");
  }
  if (!title || !amount) {
    throw new ApiError(
      400,
      "Please provide all required fields: title, amount"
    );
  }
  // update
  const expense = await Expense.findByIdAndUpdate(
    expenseId,
    { title, amount, description },
    { new: true }
  );
  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }
  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "Expense updated successfully",
      data: { expense },
    })
  );
});

const removeExpense = asyncHandler(async (req: Request, res: Response) => {
  const { expenseId } = req.params;
  //validation
  if (!expenseId) {
    throw new ApiError(400, "Please provide an expense id");
  }
  // remove
  const expense = await Expense.findByIdAndDelete(expenseId);
  if (!expense) {
    throw new ApiError(404, "Expense not found");
  }
  return res.status(200).json({
    statusCode: 200,
    message: "Expense deleted successfully",
    data: { expense },
  });
});

export { addExpense, getAllExpenses, updateExpense, removeExpense };
