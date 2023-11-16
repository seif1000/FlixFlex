import { Schema, Types, model } from "mongoose";

export interface IRefreshToken {
  token: string;
  user: Types.ObjectId;
  expiryDate: Date;
}

const RefreshTokenSchema = new Schema<IRefreshToken>({
  token: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  expiryDate: Date,
});

const RefreshToken = model<IRefreshToken>("RefreshToken", RefreshTokenSchema);

export { RefreshToken };
