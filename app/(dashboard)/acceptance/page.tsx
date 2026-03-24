"use client";

import { CheckCircle } from "lucide-react";

export default function AcceptancePage() {
  return (
    <div className="p-6 max-w-[1000px] mx-auto">
      <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>
        <CheckCircle className="inline-block mr-2 mb-1" style={{ color: "var(--success)" }} />
        Kabul Oranları
      </h1>
      <p style={{ color: "var(--muted)" }} className="text-sm mb-8">
        Üniversitelerin geçmiş yıl kabul oranları ve istatistikleri.
      </p>
      <div
        className="flex flex-col items-center justify-center py-20 rounded-xl border"
        style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--muted)" }}
      >
        <CheckCircle className="h-16 w-16 mb-4 opacity-20" />
        <p className="text-lg font-medium">Yakında</p>
        <p className="text-sm mt-1">Bu sayfa geliştirme aşamasında.</p>
      </div>
    </div>
  );
}
