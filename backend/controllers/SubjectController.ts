import { Request, Response } from "express";
import { Subject } from "../models/Subject.ts";
import { subjectSchema } from "../formValidationSchemas.ts";

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

export const createSubject = async (req: Request, res: Response) => {
  try {
    const parsed = subjectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ error: true, message: parsed.error.errors });
    }

    const { name, teachers } = parsed.data;

    const newSubject = new Subject({
      name,
      teachers,
    });

    await newSubject.save();

    res.status(201).json({ success: true, data: newSubject });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: true,
      message: "Server error while creating subject",
    });
  }
};

export const updateSubject = async (req: Request, res: Response) => {
  try {
    const parsed = subjectSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ success: false, message: parsed.error.errors });
    }

    const { id, name, teachers } = parsed.data;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Subject ID is required" });
    }

    const updatedSubject = await Subject.findByIdAndUpdate(
      id,
      {
        name,
        teachers,
      },
      { new: true }
    );

    if (!updatedSubject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found" });
    }

    res.status(200).json({ success: true, data: updatedSubject });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error while updating subject" });
  }
};

export const deleteSubjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Subject ID is required" });
    }

    const deletedSubject = await Subject.findByIdAndDelete(id);

    if (!deletedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json({ success: true, message: "Subject deleted" });
  } catch (error) {
    console.error("Error deleting subject:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
