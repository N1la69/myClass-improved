import { Request, Response } from "express";
import { Class } from "../models/Class.ts";
import { z } from "zod";
import { classSchema } from "../formValidationSchemas.ts";

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

export const getClassByStudentId = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.query;

    if (!studentId) {
      return res.status(400).json({ message: "Student ID is required" });
    }

    const classes = await Class.find({ students: studentId }).populate(
      "students"
    );

    if (!classes.length) {
      return res
        .status(404)
        .json({ message: "No classes found for this student" });
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

export const createClass = async (req: Request, res: Response) => {
  try {
    const parsedData = classSchema.parse(req.body);

    const newClass = {
      id: Math.floor(Math.random() * 100000),
      ...parsedData,
    };

    res.status(201).json({
      message: "Class created successfully",
      data: newClass,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }

    // Handle any other unexpected errors
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateClass = async (req: Request, res: Response) => {
  try {
    const parsed = classSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ success: false, message: parsed.error.errors });
    }

    const { id, name, supervisorId } = parsed.data;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Class ID is required" });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      id,
      {
        name,
        supervisorId,
      },
      { new: true }
    );

    if (!updatedClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }

    res.status(200).json({ success: true, data: updatedClass });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error | Class Controller",
      error: (error as Error).message,
    });
  }
};

export const deleteClassById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Subject ID is required" });
    }

    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ success: true, message: "Class deleted" });
  } catch (error: any) {
    console.error("Error deleting class:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
