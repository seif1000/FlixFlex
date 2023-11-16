import { Schema, Types, model } from "mongoose";
import { IRefreshToken } from "../interface/model";

const RefreshTokenSchema = new Schema<IRefreshToken>({
  token: String,
  user: {
    type: Schema.Types.ObjectId,
    //ref: "User",
  },
  expiryDate: Date,
});

const RefreshToken = model<IRefreshToken>("RefreshToken", RefreshTokenSchema);

export { RefreshToken };
