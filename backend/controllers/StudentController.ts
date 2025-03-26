import { Request, Response } from "express";
import { Student } from "../models/Student.ts";

export const getAllStudents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 10; // Default limit 10

    const skip = (page - 1) * limit;

    const students = await Student.find()
      .populate("classes")
      .skip(skip)
      .limit(limit);

    const total = await Student.countDocuments();

    res.status(200).json({
      success: true,
      data: students,
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
      message: "Server Error | Student Controller",
      error: (error as Error).message,
    });
  }
};

export const getStudentsByClass = async (req: Request, res: Response) => {
  try {
    const { classId } = req.query;

    if (!classId) {
      return res
        .status(400)
        .json({ success: false, message: "classId is required" });
    }

    const students = await Student.find({ classes: classId }).populate(
      "classes"
    );

    res.status(200).json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error | Student Controller",
      error: (error as Error).message,
    });
  }
};
