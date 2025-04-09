"use client";

import { useEffect, useState } from "react";

interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
  classId?: number;
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("/announcements?page=1&limit=3");
        const data = await res.json();
        if (data.success) {
          setAnnouncements(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch announcements:", err);
      }
    };

    fetchAnnouncements();
  }, []);

  const bgColors = [
    "bg-lamaSkyLight",
    "bg-lamaPurpleLight",
    "bg-lamaYellowLight",
  ];

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400 cursor-pointer">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {announcements.map((announcement, index) => (
          <div
            key={announcement.id}
            className={`${bgColors[index % bgColors.length]} rounded-md p-4`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{announcement.title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {new Date(announcement.date).toISOString().split("T")[0]}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {announcement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
