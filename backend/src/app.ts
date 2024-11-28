import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// cookie parser middleware

app.use(cookieParser());

// import routes
import userRouter from "@/routes/user.routes";

// declarations routes
app.use("/api/users", userRouter);

export { app };
