"use client";

import { useEffect, useState } from "react";
import BigCalendar from "./BigCalender";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

type Props = {
  type: "teacherId" | "classId";
  id: string | number;
};

const BigCalendarContainer = ({ type, id }: Props) => {
  const [schedule, setSchedule] = useState<any[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/lessons/lesson-id?type=${type}&id=${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch lessons");
        const lessons = await res.json();

        const formatted = lessons.map((lesson: any) => ({
          title: lesson.name,
          start: new Date(lesson.startTime),
          end: new Date(lesson.endTime),
        }));

        setSchedule(adjustScheduleToCurrentWeek(formatted));
      } catch (err) {
        console.error("Failed to load lessons:", err);
      }
    };

    fetchLessons();
  }, [type, id]);

  return (
    <div>
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;
