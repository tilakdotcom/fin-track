export class ApiError extends Error{
  statusCode: number;
  error: any[];
  data: any | null;
  sucess: boolean;
  
  constructor(
    statusCode = 500,
    message = 'An unexpected error occurred',
    error=[],
    stack?: string,
    data=null,
    sucess?: boolean
  ){
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.data = data;
    this.sucess = sucess || false;
    if(stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

}