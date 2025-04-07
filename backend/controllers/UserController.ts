import { Request, Response } from "express";
import { Admin } from "../models/Admin.ts";
import { Student } from "../models/Student.ts";
import { Teacher } from "../models/Teacher.ts";
import { Parent } from "../models/Parent.ts";
import { Attendance } from "../models/Attendance.ts";

export const getUserCount = async (req: Request, res: Response) => {
  const { type } = req.params;

  try {
    let count = 0;
    switch (type as string) {
      case "admin":
        count = await Admin.countDocuments();
        break;
      case "student":
        count = await Student.countDocuments();
        break;
      case "teacher":
        count = await Teacher.countDocuments();
        break;
      case "parent":
        count = await Parent.countDocuments();
        break;
      default:
        return res.status(400).json({ message: "Invalid user type" });
    }
    res.json({ count });
  } catch (error: any) {
    res.status(500).json({ message: "Server error | User Controller" });
  }
};

export const getStudentSexCount = async (req: Request, res: Response) => {
  try {
    const result = await Student.aggregate([
      {
        $group: {
          _id: "$sex",
          count: { $sum: 1 },
        },
      },
    ]);

    const counts = result.reduce(
      (acc, curr) => {
        if (curr._id === "MALE") acc.boys = curr.count;
        if (curr._id === "FEMALE") acc.girls = curr.count;
        return acc;
      },
      { boys: 0, girls: 0 }
    );

    res.json(counts);
  } catch (error: any) {
    res.status(500).json({ message: "Server error | User Controller" });
  }
};

export const getAttendanceCount = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Sunday: 0, Monday: 1, ..., Saturday: 6
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - daysSinceMonday);
    lastMonday.setHours(0, 0, 0, 0); // Ensure we start at midnight

    const attendances = await Attendance.find({
      date: { $gte: lastMonday },
    });

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

    const attendanceMap = {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
    };

    attendances.forEach((item) => {
      const itemDate = new Date(item.date);
      const day = itemDate.getDay(); // 1-5 for Mon-Fri

      if (day >= 1 && day <= 5) {
        const dayName = daysOfWeek[day - 1] as keyof typeof attendanceMap;
        if (item.present) {
          attendanceMap[dayName].present += 1;
        } else {
          attendanceMap[dayName].absent += 1;
        }
      }
    });

    const chartData = daysOfWeek.map((day) => ({
      name: day,
      present: attendanceMap[day as keyof typeof attendanceMap].present,
      absent: attendanceMap[day as keyof typeof attendanceMap].absent,
    }));

    res.json(chartData);
  } catch (err: any) {
    console.error("Error fetching attendance data:", err);
    res.status(500).json({ message: "Server Error | User Controller" });
  }
};
