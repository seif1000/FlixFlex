import { Schema, model } from "mongoose";
import { IUser } from "../interface/model";

const Userschema = new Schema<IUser>(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = model<IUser>("User", Userschema);

export { User };
