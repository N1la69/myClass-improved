import { Request, Response } from "express";
import { Class } from "../models/Class.ts";

export const getAllClasses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 10; // Default limit 10

    const skip = (page - 1) * limit;

    const classes = await Class.find()
      .populate("students")
      .skip(skip)
      .limit(limit);

    const total = await Class.countDocuments();

    res.status(200).json({
      success: true,
      data: classes,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error | Subject Controller",
      error: (error as Error).message,
    });
  }
};

export const getClassBySupervisorId = async (req: Request, res: Response) => {
  try {
    const { supervisorId } = req.query;

    if (!supervisorId) {
      return res.status(400).json({ message: "Supervisor ID is required" });
    }

    const classes = await Class.find({ supervisorId }).populate("students");

    if (!classes.length) {
      return res
        .status(404)
        .json({ message: "No classes found for this supervisor" });
    }

    res.status(200).json({ success: true, data: classes });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error | Subject Controller",
      error: (error as Error).message,
    });
  }
};
