import { Request, Response } from "express";
import { Announcement } from "../models/Announcement.ts";

export const getAllAnnouncements = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 10; // Default limit 10

    const skip = (page - 1) * limit;

    const announcements = await Announcement.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Announcement.countDocuments();

    res.status(200).json({
      success: true,
      data: announcements,
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
      message: "Server Error | Announcement Controller",
      error: (error as Error).message,
    });
  }
};

export const getAnnouncementsByClassId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const classId = parseInt(req.params.classId);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    if (isNaN(classId)) {
      res.status(400).json({
        success: false,
        message: "Invalid classId",
      });
      return;
    }

    const announcements = await Announcement.find({ classId })
      .sort({ date: -1 }) // newest first
      .skip(skip)
      .limit(limit);

    const total = await Announcement.countDocuments({ classId });

    res.status(200).json({
      success: true,
      data: announcements,
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
      message: "Server Error | getAnnouncementsByClassId",
      error: error.message,
    });
  }
};
