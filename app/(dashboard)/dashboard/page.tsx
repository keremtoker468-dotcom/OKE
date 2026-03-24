"use client";

import { useState } from "react";
import {
  GraduationCap,
  FileText,
  Calendar,
  Target,
  CheckCircle2,
  Circle,
  Compass,
} from "lucide-react";

const stats = [
  {
    label: "Uygun Üniversite",
    value: "5",
    icon: GraduationCap,
    color: "var(--success)",
    bg: "var(--success-bg)",
  },
  {
    label: "Mümkün Üniversite",
    value: "6",
    icon: Target,
    color: "var(--blue)",
    bg: "var(--blue-bg)",
  },
  {
    label: "Hazırlanan Mektup",
    value: "2",
    icon: FileText,
    color: "var(--gold)",
    bg: "var(--gold-bg)",
  },
  {
    label: "Yaklaşan Deadline",
    value: "3",
    icon: Calendar,
    color: "var(--danger)",
    bg: "var(--danger-bg)",
  },
];

const initialTodos = [
  { id: 1, text: "IELTS sınavına kaydol", done: false },
  { id: 2, text: "TU Delft motivasyon mektubu yaz", done: false },
  { id: 3, text: "Transkript tercümesi yaptır", done: true },
  { id: 4, text: "Referans mektubu iste", done: false },
  { id: 5, text: "Politecnico Milano başvuru formu", done: false },
];

export default function DashboardPage() {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const progress = Math.round(
    (todos.filter((t) => t.done).length / todos.length) * 100
  );

  return (
    <div className="p-6 max-w-[1000px] mx-auto">
      {/* Hero */}
      <div
        className="rounded-xl p-8 mb-6 border relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)",
          borderColor: "var(--border)",
        }}
      >
        <Compass
          className="absolute right-8 top-8 h-24 w-24 opacity-5"
          style={{ color: "var(--blue)" }}
        />
        <h1 className="text-3xl font-bold mb-2" style={{ color: "var(--text)" }}>
          Hoş geldin! 👋
        </h1>
        <p className="text-lg mb-4" style={{ color: "var(--muted)" }}>
          Avrupa üniversitelerine giden yolda sana rehberlik ediyoruz.
        </p>

        {/* Progress Bar */}
        <div className="max-w-md">
          <div className="flex justify-between text-sm mb-2">
            <span style={{ color: "var(--muted)" }}>Başvuru İlerlemesi</span>
            <span style={{ color: "var(--blue-light)" }}>%{progress}</span>
          </div>
          <div
            className="h-2.5 rounded-full overflow-hidden"
            style={{ background: "var(--surface2)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, var(--blue) 0%, var(--gold) 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl p-4 border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ background: stat.bg }}
                >
                  <Icon className="h-5 w-5" style={{ color: stat.color }} />
                </div>
                <div>
                  <div
                    className="text-xl font-bold"
                    style={{ color: "var(--text)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: "var(--muted)" }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Todo List */}
      <div
        className="rounded-xl p-5 border"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <h2
          className="font-semibold mb-4"
          style={{ color: "var(--text)" }}
        >
          Yapılacaklar
        </h2>
        <div className="space-y-2">
          {todos.map((todo) => (
            <button
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
              className="flex items-center gap-3 w-full text-left p-3 rounded-lg transition-colors"
              style={{
                background: todo.done ? "transparent" : "var(--surface2)",
              }}
            >
              {todo.done ? (
                <CheckCircle2
                  className="h-5 w-5 flex-shrink-0"
                  style={{ color: "var(--success)" }}
                />
              ) : (
                <Circle
                  className="h-5 w-5 flex-shrink-0"
                  style={{ color: "var(--muted)" }}
                />
              )}
              <span
                className={`text-sm ${todo.done ? "line-through" : ""}`}
                style={{
                  color: todo.done ? "var(--muted)" : "var(--text)",
                }}
              >
                {todo.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
