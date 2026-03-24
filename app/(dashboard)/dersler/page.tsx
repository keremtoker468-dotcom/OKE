"use client";

import { BookOpen } from "lucide-react";

export default function DerslerPage() {
  return (
    <div className="p-6 max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>
        <BookOpen className="inline-block mr-2 mb-1" style={{ color: "var(--blue)" }} />
        Dersler
      </h1>
      <p style={{ color: "var(--muted)" }} className="text-sm mb-8">
        Başvuru hazırlığı için önerilen dersler ve kaynaklar.
      </p>
      <div
        className="flex flex-col items-center justify-center py-20 rounded-xl border"
        style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--muted)" }}
      >
        <BookOpen className="h-16 w-16 mb-4 opacity-20" />
        <p className="text-lg font-medium">Yakında</p>
        <p className="text-sm mt-1">Bu sayfa geliştirme aşamasında.</p>
      </div>
    </div>
  );
}
