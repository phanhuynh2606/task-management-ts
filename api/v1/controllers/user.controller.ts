import { Request, Response } from "express";
import User from "../models/user.model";
import md5 from "md5";
import { generateRandomString } from "../../../helper/generate";
// [POST] /api/v1/users/register
export const register = async (req:Request, res:Response) => {
  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });
  if (existEmail) {
    res.json({
      code: 400,
      message: "Email đã tồn tại",
    });
    return;
  }
  const infoUser = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: md5(req.body.password),
    token: generateRandomString(30),
  };

  const user = new User(infoUser);
  await user.save();
  const token = user.token;
  res.cookie("token", token);
  res.json({
    code: 200,
    message: "Đăng kí thành công",
    token: token,
  });
};
