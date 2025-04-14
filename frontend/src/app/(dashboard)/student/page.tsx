"use client";

import { useEffect, useState } from "react";
import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";
import { useUser } from "@clerk/nextjs";

const StudentPage = () => {
  const { user } = useUser();
  const studentId = user?.id;

  const [classId, setClassId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClass = async () => {
      if (!studentId) return;

      try {
        const res = await fetch(
          `http://localhost:5000/classes/by-student?studentId=${studentId}`
        );
        const data = await res.json();
        setClassId(data?.data?.[0]?._id || null);
      } catch (err) {
        console.error("Error fetching class:", err);
        setClassId(null);
      } finally {
        setLoading(false);
      }
    };

    fetchClass();
  }, [studentId]);

  if (loading) {
    return <div className="p-4">Loading schedule...</div>;
  }

  if (!classId) {
    return <div className="p-4">No class found for this student.</div>;
  }

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalendarContainer type="classId" id={classId} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
