export interface IUser {
  _id: string;
  username: string;
  password: string;
  favs: Array<{ id: String; type: String }>;
}

export interface IRefreshToken {
  _id: string;
  token: string;
  user: Types.ObjectId;
  expiryDate: Date;
}
