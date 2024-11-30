import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotEnv from "dotenv";
dotEnv.config({
    path: "./.env"
})

const app: Express = express();

//middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); //for testing purposes learn

//cors middleware


app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// cookie parser middleware
app.use(cookieParser());

// import routes
import userRouter from "@/routes/user.routes";
import categoryRouter from "@/routes/category.routes";
import expenseRouter from "@/routes/expense.routes";
import incomeRouter from "@/routes/income.routes";

// declarations routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/expense", expenseRouter);
app.use("/api/v1/income", incomeRouter);
export { app };
