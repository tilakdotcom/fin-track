import Income from "@/models/income.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";

const addIncome = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId, source, amount, description } = req.body;
  const userId = req.user?.id;

  //validation
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }
  if (!categoryId || !source || !amount) {
    throw new ApiError(
      400,
      "Please provide all required fields: categoryId, source, amount"
    );
  }
  //check if exist
  const income = await Income.findOne({
    userId: userId,
    categoryId: categoryId,
    source: source,
  });
  //validation
  if (income) {
    throw new ApiError(
      400,
      "income with the same categoryId and source already exists"
    );
  }
  //create expense
  const newIncome = new Income({
    userId,
    categoryId,
    source,
    amount,
    description: description || undefined,
  });
  const savedIncome = await newIncome.save({ validateBeforeSave: false });

  return res.status(201).json(
    new ApiResponse({
      statusCode: 201,
      message: "Income added successfully",
      data: savedIncome ,
    })
  );
});

const getIncomes = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  //validation
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }
  //find income by user id
  const incomes = await Income.find({ userId: userId });
  if (!incomes) {
    throw new ApiError(404, "No income found for the user");
  }
  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "income fetched successfully",
      data: { incomes },
    })
  );
});

const updateIncome = asyncHandler(async (req: Request, res: Response) => {
  const { source, amount, description } = req.body;
  const {incomeId} = req.params;
  //validation
  if (!incomeId) {
    throw new ApiError(400, "Please provide an expense id");
  }
  if (!source || !amount) {
    throw new ApiError(
      400,
      "Please provide all required fields: source, amount"
    );
  }
  // update
  const income = await Income.findByIdAndUpdate(
    incomeId,
    { source, amount, description },
    { new: true }
  );
  if (!income) {
    throw new ApiError(404, "income not found");
  }
  return res.status(200).json(
    new ApiResponse({
      statusCode: 200,
      message: "income updated successfully",
      data: { income },
    })
  );
});

const removeIncome = asyncHandler(async (req: Request, res: Response) => {
  const {incomeId} = req.params;
  //validation
  if (!incomeId) {
    throw new ApiError(400, "Please provide an income id");
  }
  // remove
  const income = await Income.findByIdAndDelete(incomeId);
  if (!income) {
    throw new ApiError(404, "income not found");
  }
  return res.status(200).json({
    statusCode: 200,
    message: "Expense deleted successfully",
    data: { income },
  });
});


export { addIncome, getIncomes, updateIncome, removeIncome };