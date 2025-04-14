import { Request, Response } from "express";
import { Lesson } from "../models/Lesson.ts";

export const getAllLessons = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 10; // Default limit 10

    const skip = (page - 1) * limit;

    const lessons = await Lesson.find().skip(skip).limit(limit);

    const total = await Lesson.countDocuments();

    res.status(200).json({
      success: true,
      data: lessons,
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
      message: "Server Error | Lesson Controller",
      error: (error as Error).message,
    });
  }
};

export const getLessonById = async (req: Request, res: Response) => {
  const { type, id } = req.query;

  try {
    const filter =
      type === "teacherId"
        ? { teacherId: id }
        : type === "classId"
        ? { classId: Number(id) }
        : null;

    if (!filter) return res.status(400).json({ error: "Invalid type" });

    const lessons = await Lesson.find(filter).select("name startTime endTime");
    res.json(lessons);
  } catch (error: any) {
    console.error("Error fetching lessons:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch lessons | Lesson Controller" });
  }
};
