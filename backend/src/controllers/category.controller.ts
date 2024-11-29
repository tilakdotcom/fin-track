import Category from "@/models/category.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";



const addCategory = asyncHandler(async(req:Request , res:Response)=>{
  const { name , type } = req.body;
  // validations
  if(!name && !type){
    throw new ApiError(400, "Please provide required fields: name or type")
  }
  // check if exist
  const category = await Category.findOne({name})
  if(category){
    throw new ApiError(400, "Category already exists")
  }
  const newCategory = new Category({
    name,
    type,
  })

  await newCategory.save();
  return res
  .status(201)
  .json(new ApiResponse({
    statusCode: 201,
    message: "Category added successfully",
    data: newCategory,
  }))
  
})



const removeCategory = asyncHandler(async(req: Request,res: Response) => {
  const  {categoryId} = req.params;
  // validations
  if(!categoryId){
    throw new ApiError(400, "Please provide categoryId")
  }

  const category = await Category.findByIdAndDelete(categoryId)
  if(!category){
    throw new ApiError(404, "Category not found")
  }
  return res.json(new ApiResponse({
    statusCode: 200,
    message: "Category deleted successfully",
    data: category,
  }))
})

export {addCategory,removeCategory}