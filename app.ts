import Express, { Request, Response } from "express";
import { userRouter } from "./routes/user.route";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
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

app.use("/api/v1/user", userRouter);
app.use("/api/v1/movie", userRouter);

export default app;

//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWEwNGM2Nzk4NGY1MjNhMzIyZDQ4ZWNkZTVhZmI0NyIsInN1YiI6IjY1NTY2MWNjZDRmZTA0MDEzOTgyNzQ2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B8Tgd9tNZToxgwBNj8Hl4hiiE_1rnOP0ePDJ4FdFhRU
//eaa04c67984f523a322d48ecde5afb47
