import { NextFunction, Request, Response } from "express";
import { COOKIE_NAME } from "../utils/constants.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const token = req.signedCookies[`${COOKIE_NAME}`];

  const token = req.cookies[`${COOKIE_NAME}`];
  // console.log(token);

  // console.log(req.cookies.COOKIE_NAME);
  // res.json({ req: req });
  // console.log(token);

  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }

  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
      console.log(success);
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
