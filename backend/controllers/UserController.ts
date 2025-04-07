import { Request, Response } from "express";
import { Admin } from "../models/Admin.ts";
import { Student } from "../models/Student.ts";
import { Teacher } from "../models/Teacher.ts";
import { Parent } from "../models/Parent.ts";

export const getUserCount = async (req: Request, res: Response) => {
  const { type } = req.params;

  try {
    let count = 0;
    switch (type as string) {
      case "admin":
        count = await Admin.countDocuments();
        break;
      case "student":
        count = await Student.countDocuments();
        break;
      case "teacher":
        count = await Teacher.countDocuments();
        break;
      case "parent":
        count = await Parent.countDocuments();
        break;
      default:
        return res.status(400).json({ message: "Invalid user type" });
    }
    res.json({ count });
  } catch (error: any) {
    res.status(500).json({ message: "Server error | User Controller" });
  }
};

export const getStudentSexCount = async (req: Request, res: Response) => {
  try {
    const result = await Student.aggregate([
      {
        $group: {
          _id: "$sex",
          count: { $sum: 1 },
        },
      },
    ]);

    const counts = result.reduce(
      (acc, curr) => {
        if (curr._id === "MALE") acc.boys = curr.count;
        if (curr._id === "FEMALE") acc.girls = curr.count;
        return acc;
      },
      { boys: 0, girls: 0 }
    );

    res.json(counts);
  } catch (error: any) {
    res.status(500).json({ message: "Server error | User Controller" });
  }
};
