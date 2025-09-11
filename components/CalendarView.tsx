// components/CalendarView.tsx
"use client";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

export default function CalendarView() {
  const [value, setValue] = useState<Date | Date[]>(new Date());

  return (
    <div className="bg-white border rounded-lg p-4">
      <h3 className="font-medium mb-3">Calendar</h3>
      <Calendar onChange={setValue} value={value} />
    </div>
  );
}
