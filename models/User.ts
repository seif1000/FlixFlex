import { Schema, model } from "mongoose";

export interface IUser {
  username: string;
  password: string;
}

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

export default { User };
