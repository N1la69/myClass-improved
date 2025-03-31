import { Request, Response } from "express";
import { Assignment } from "../models/Assignment.ts";

export const getAllAssignments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 10; // Default limit 10

    const skip = (page - 1) * limit;

    const assignments = await Assignment.find().skip(skip).limit(limit);

    const total = await Assignment.countDocuments();

    res.status(200).json({
      success: true,
      data: assignments,
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
      message: "Server Error | Assignment Controller",
      error: (error as Error).message,
    });
  }
};
