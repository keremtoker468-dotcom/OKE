"use client";

import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";

const deadlines = [
  { date: "2026-04-15", uni: "TU Delft", program: "Computer Science", flag: "🇳🇱" },
  { date: "2026-04-30", uni: "Politecnico di Milano", program: "Computer Science", flag: "🇮🇹" },
  { date: "2026-05-01", uni: "TU München", program: "Computer Science", flag: "🇩🇪" },
  { date: "2026-05-15", uni: "University of Bologna", program: "Engineering", flag: "🇮🇹" },
  { date: "2026-06-01", uni: "University of Groningen", program: "Business", flag: "🇳🇱" },
  { date: "2026-06-15", uni: "RWTH Aachen", program: "Engineering", flag: "🇩🇪" },
  { date: "2026-07-01", uni: "Sciences Po", program: "Political Science", flag: "🇫🇷" },
  { date: "2026-07-15", uni: "KTH Stockholm", program: "Engineering", flag: "🇸🇪" },
];

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const MONTHS = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
];

export default function TakvimPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Adjust for Monday start
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const days: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const deadlineMap = new Map<number, typeof deadlines>();
  deadlines.forEach((d) => {
    const dd = new Date(d.date);
    if (dd.getFullYear() === year && dd.getMonth() === month) {
      const day = dd.getDate();
      if (!deadlineMap.has(day)) deadlineMap.set(day, []);
      deadlineMap.get(day)!.push(d);
    }
  });

  const prevMonth = () =>
    setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () =>
    setCurrentDate(new Date(year, month + 1, 1));

  const upcomingDeadlines = deadlines
    .filter((d) => new Date(d.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="p-6 max-w-[1000px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>
          <Calendar className="inline-block mr-2 mb-1" style={{ color: "var(--blue)" }} />
          Başvuru Takvimi
        </h1>
        <p style={{ color: "var(--muted)" }} className="text-sm">
          Önemli tarihleri ve başvuru deadlinelerini takip edin.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Calendar */}
        <div
          className="col-span-2 rounded-xl p-5 border"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:opacity-80"
              style={{ background: "var(--surface2)" }}
            >
              <ChevronLeft className="h-4 w-4" style={{ color: "var(--muted)" }} />
            </button>
            <span className="font-semibold" style={{ color: "var(--text)" }}>
              {MONTHS[month]} {year}
            </span>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:opacity-80"
              style={{ background: "var(--surface2)" }}
            >
              <ChevronRight className="h-4 w-4" style={{ color: "var(--muted)" }} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {DAYS.map((d) => (
              <div
                key={d}
                className="text-center text-xs font-medium py-2"
                style={{ color: "var(--muted)" }}
              >
                {d}
              </div>
            ))}
            {days.map((day, i) => {
              const hasDeadline = day && deadlineMap.has(day);
              return (
                <div
                  key={i}
                  className="text-center py-2.5 rounded-lg text-sm relative"
                  style={{
                    background: hasDeadline ? "var(--blue-bg)" : "transparent",
                    color: day ? "var(--text)" : "transparent",
                    border: hasDeadline ? "1px solid var(--blue-border)" : "1px solid transparent",
                  }}
                >
                  {day || ""}
                  {hasDeadline && (
                    <div
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "var(--blue)" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div
          className="rounded-xl p-5 border"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <h2 className="font-semibold mb-4 flex items-center gap-2" style={{ color: "var(--text)" }}>
            <Clock className="h-4 w-4" style={{ color: "var(--gold)" }} />
            Yaklaşan Deadlineler
          </h2>
          <div className="space-y-3">
            {upcomingDeadlines.map((d, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border"
                style={{ background: "var(--surface2)", borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span>{d.flag}</span>
                  <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                    {d.uni}
                  </span>
                </div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>
                  {d.program}
                </div>
                <div className="text-xs mt-1 font-medium" style={{ color: "var(--danger)" }}>
                  {new Date(d.date).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
