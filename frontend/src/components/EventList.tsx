"use client";

import { useEffect, useState } from "react";

const EventList = ({ dateParam }: { dateParam?: string }) => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch(
        `http://localhost:5000/events/event-list${
          dateParam ? `?date=${dateParam}` : ""
        }`,
        { cache: "no-store" }
      );
      const data = await res.json();
      setEvents(data);
    };

    fetchEvents();
  }, [dateParam]);

  return events.map((event) => (
    <div
      className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
      key={event._id}
    >
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-gray-600">{event.title}</h1>
        <span className="text-gray-300 text-xs">
          {new Date(event.startTime).toLocaleTimeString("en-UK", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </span>
      </div>
      <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
    </div>
  ));
};

export default EventList;
