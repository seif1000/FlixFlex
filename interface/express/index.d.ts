import type { Document } from "mongoose";
import { IUser } from "../model";

type UserModel = Document<unknown, any, IUser> &
  IUser &
  Required<{
    _id: string;
  }>;

declare global {
  namespace Express {
    interface Request {
      authUser: UserModel;
    }
  }
}
