import { Request, Response } from "express";
import { Subject } from "../models/Subject.ts";

export const getAllSubjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 10; // Default limit 10

    const skip = (page - 1) * limit;

    const subjects = await Subject.find()
      .populate("teachers")
      .skip(skip)
      .limit(limit);

    const total = await Subject.countDocuments();

    res.status(200).json({
      success: true,
      data: subjects,
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
