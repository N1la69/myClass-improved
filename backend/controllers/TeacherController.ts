import { Request, Response } from "express";
import { Teacher } from "../models/Teacher.ts";

export const getAllTeachers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 10; // Default limit 10

    const skip = (page - 1) * limit;

    const teachers = await Teacher.find()
      .populate("subjects")
      .populate("lessons")
      .populate("classes")
      .skip(skip)
      .limit(limit);

    const total = await Teacher.countDocuments();

    res.status(200).json({
      success: true,
      data: teachers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error | Teacher Controller",
      error: (error as Error).message,
    });
  }
};

export const getTeachersByClass = async (req: Request, res: Response) => {
  try {
    const { classId } = req.query;

    if (!classId) {
      return res
        .status(400)
        .json({ success: false, message: "classId is required" });
    }

    // Find teachers linked to the given classId
    const teachers = await Teacher.find({ classes: classId })
      .populate("subjects")
      .populate("lessons")
      .populate("classes");

    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: (error as Error).message,
    });
  }
};
