import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { RefreshToken } from "../models/RefreshToken";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({
      email: username,
    });

    if (user) {
      return res.status(406).json({
        error: "Username already exists",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      let newUser = new User({
        username: username,

        password: hashedPassword,
      });

      newUser = await newUser.save();

      let expiredAt = new Date();

      expiredAt.setSeconds(expiredAt.getSeconds() + 950400);

      let _token = uuidv4();

      let refreshTokenObject = new RefreshToken({
        token: _token,
        user: newUser._id,
        expiryDate: expiredAt.getTime(),
      });

      const refreshToken = await refreshTokenObject.save();

      const access_token = jwt.sign(
        {
          userId: newUser._id,
        },
        "secret123",
        {
          expiresIn: "7d",
        }
      );

      res.status(200).send({
        access_token: access_token,
        refreshToken: refreshToken.token,
      });
    }
  } catch (err) {
    res.status(404).json({
      error: "Something went wrong",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({
      username: username,
    });

    if (user) {
      const compare = await bcrypt.compare(password, user.password);

      if (compare === true) {
        let expiredAt = new Date();

        expiredAt.setSeconds(expiredAt.getSeconds() + 950400);

        let _token = uuidv4();

        let refreshTokenObject = new RefreshToken({
          token: _token,
          user: user._id,
          expiryDate: expiredAt.getTime(),
        });

        const refreshToken = await refreshTokenObject.save();

        const access_token = jwt.sign(
          {
            userId: user._id,
          },
          "secret123",
          {
            expiresIn: "7d",
          }
        );

        res.status(200).send({
          access_token: access_token,
          refreshToken: refreshToken.token,
          id: user._id,
        });
      } else {
        return res.status(404).json({
          error: {
            passwordError: "Password is incorrect",
          },
        });
      }
    } else {
      return res.status(404).json({
        error: {
          emailError: "User not found",
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      error: {
        serverError: "Something went wrong",
      },
    });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    let { refreshToken } = req.body;

    if (refreshToken == null) {
      return res.status(403).json({
        success: false,
        data: { error: "Refresh token is required" },
      });
    }

    refreshToken = await RefreshToken.findOne({ token: refreshToken });

    if (!refreshToken) {
      res.status(500).json({
        success: false,
        data: { error: "Invalid refresh token" },
      });
      return;
    }

    if (refreshToken.expiryDate.getTime() < new Date().getTime()) {
      RefreshToken.findByIdAndRemove(refreshToken._id, {
        useFindAndModify: false,
      }).exec();

      res.status(500).json({
        success: false,
        data: {
          error: "Refresh token was expired. Please make a new signin request",
        },
      });
      return;
    }

    const access_token = jwt.sign(
      {
        userId: refreshToken.user._id,
      },
      "secret123",
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      accessToken: access_token,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(406).send({ error: "Something went wrong" });
  }
};
