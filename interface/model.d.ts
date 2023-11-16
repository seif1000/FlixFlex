export interface IUser {
  _id: string;
  username: string;
  password: string;
}

export interface IRefreshToken {
  _id: string;
  token: string;
  user: Types.ObjectId;
  expiryDate: Date;
}
