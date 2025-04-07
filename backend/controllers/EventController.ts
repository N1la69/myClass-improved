import { Request, Response } from "express";
import { Event } from "../models/Event.ts";

export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 10; // Default limit 10

    const skip = (page - 1) * limit;

    const events = await Event.find().skip(skip).limit(limit);

    const total = await Event.countDocuments();

    res.status(200).json({
      success: true,
      data: events,
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
      message: "Server Error | Event Controller",
      error: (error as Error).message,
    });
  }
};

export const getEventByDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;

    const targetDate = date ? new Date(date as string) : new Date();
    const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

    const events = await Event.find({
      startTime: { $gte: startOfDay, $lte: endOfDay },
    }).lean();

    res.status(200).json(events);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Failed to fetch events. | Event Controller" });
  }
};
