import { Request, Response } from "express";
import { Teacher } from "../models/Teacher.ts";
import { teacherSchema } from "../formValidationSchemas.ts";
import { UserSex } from "../models/enums.ts";
import { Clerk } from "@clerk/clerk-sdk-node";
import mongoose from "mongoose";

const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY! });

export const getAllTeachers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1; // Default page 1
    const limit = parseInt(req.query.limit as string) || 10; // Default limit 10

    const skip = (page - 1) * limit;

    const teachers = await Teacher.find()
      .populate("subjects")
      .populate("lessons")
      .populate("classes")
      .skip(skip)
      .limit(limit);

    const total = await Teacher.countDocuments();

    res.status(200).json({
      success: true,
      data: teachers,
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
      message: "Server Error | Teacher Controller",
      error: (error as Error).message,
    });
  }
};

export const getTeachersByClass = async (req: Request, res: Response) => {
  try {
    const { classId } = req.query;

    if (!classId) {
      return res
        .status(400)
        .json({ success: false, message: "classId is required" });
    }

    // Find teachers linked to the given classId
    const teachers = await Teacher.find({ classes: classId })
      .populate("subjects")
      .populate("lessons")
      .populate("classes");

    res.status(200).json({ success: true, data: teachers });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error | Teacher Controller",
      error: (error as Error).message,
    });
  }
};

export const createTeacher = async (req: Request, res: Response) => {
  try {
    const parsed = teacherSchema.parse(req.body);

    const {
      username,
      password,
      name,
      surname,
      email,
      phone,
      address,
      img,
      bloodType,
      birthday,
      sex,
      subjects,
    } = parsed;

    const clerkUser = await clerk.users.createUser({
      emailAddress: email ? [email] : undefined,
      username,
      password: password || undefined,
      firstName: name,
      lastName: surname,
    });

    const newTeacher = new Teacher({
      clerkUserId: clerkUser.id,
      username,
      password,
      name,
      surname,
      email,
      phone,
      address,
      img,
      bloodType,
      birthday,
      sex,
      subjects,
    });

    await newTeacher.save();

    res.status(201).json({
      message: "Teacher created successfully",
      teacher: newTeacher,
      clerkUserId: clerkUser.id,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error | Teacher Controller",
      error: (error as Error).message,
    });
  }
};

// export const updateTeacher = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const parsed = teacherSchema.parse({ ...req.body, id });

//     const {
//       username,
//       name,
//       surname,
//       email,
//       phone,
//       address,
//       img,
//       bloodType,
//       birthday,
//       sex,
//       subjects,
//     } = parsed;

//     const teacher = await Teacher.findById(id);

//     if (!teacher) {
//       return res.status(404).json({
//         success: false,
//         message: "Teacher not found",
//       });
//     }

//     teacher.username = username;
//     teacher.name = name;
//     teacher.surname = surname;
//     teacher.email = email;
//     teacher.phone = phone;
//     teacher.address = address;
//     teacher.img = img;
//     teacher.bloodType = bloodType;
//     teacher.birthday = birthday;
//     teacher.sex = sex as UserSex;
//     teacher.subjects = subjects
//       ? subjects.map((subject) => new mongoose.Types.ObjectId(subject))
//       : [];

//     await teacher.save();

//     if (teacher.clerkUserId) {
//       await clerk.users.updateUser(teacher.clerkUserId, {
//         username,
//         emailAddress: email || undefined,
//         firstName: name,
//         lastName: surname,
//       });
//     }

//     res.status(200).json({ message: "Teacher updated successfully", teacher });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: "Server Error | Teacher Controller",
//       error: (error as Error).message,
//     });
//   }
// };
