import Express, { Request, Response } from "express";
import { userRouter } from "./routes/user.route";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import { movieRouter } from "./routes/movie.route";
let app: Express.Application;

app = Express();

app.use(Express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_DB as string)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((error) => {
    console.log("mongodb connection error", error);
  });

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("server is health");
});

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/movie", movieRouter);

export default app;
