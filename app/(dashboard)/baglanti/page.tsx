"use client";

import { Users } from "lucide-react";

export default function BaglantiPage() {
  return (
    <div className="p-6 max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>
        <Users className="inline-block mr-2 mb-1" style={{ color: "var(--blue)" }} />
        Bağlantılar
      </h1>
      <p style={{ color: "var(--muted)" }} className="text-sm mb-8">
        Aynı üniversitelere başvuran öğrencilerle bağlantı kurun.
      </p>
      <div
        className="flex flex-col items-center justify-center py-20 rounded-xl border"
        style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--muted)" }}
      >
        <Users className="h-16 w-16 mb-4 opacity-20" />
        <p className="text-lg font-medium">Yakında</p>
        <p className="text-sm mt-1">Bu sayfa geliştirme aşamasında.</p>
      </div>
    </div>
  );
}
