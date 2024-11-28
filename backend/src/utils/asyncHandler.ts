import { Response, Request, NextFunction, RequestHandler } from "express";

// Define the type for an async request handler
type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

// Wrapper for async route handlers
const asyncHandler = (handler: AsyncRequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};

export { asyncHandler };
