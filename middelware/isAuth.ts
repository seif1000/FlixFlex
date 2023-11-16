import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { User } from "../models/User";

type TokenPayload = JwtPayload & { userId: string };

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.header("Authorization")) {
    return res.status(401).json({
      message: "Unauthorized access, token missed.",
    });
  }

  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access, token missed.",
    });
  }

  try {
    const payload = jwt.verify(token, "secret123") as TokenPayload;

    const user = await User.findById(payload.userId);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized access, invalid token.",
      });
    }

    req["authUser"] = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Unauthorized access, token expired.",
      });
    }

    return res.status(401).json({
      message: "Unauthorized access, invalid token.",
    });
  }
}

export default authMiddleware;
