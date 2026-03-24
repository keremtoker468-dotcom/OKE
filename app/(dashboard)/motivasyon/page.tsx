"use client";

import { useState } from "react";
import { universities } from "@/lib/universities";
import { countryFlags, countryNames } from "@/types";
import { FileText, Sparkles, Copy, Check, Loader2 } from "lucide-react";

export default function MotivasyonPage() {
  const [selectedUniId, setSelectedUniId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [strengths, setStrengths] = useState("");
  const [whyProgram, setWhyProgram] = useState("");
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const selectedUni = universities.find((u) => u.id === selectedUniId);

  async function handleGenerate() {
    if (!selectedUniId || !studentName || !strengths || !whyProgram) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/generate-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName,
          university: selectedUni?.name,
          program: selectedUni?.program,
          country: selectedUni ? countryNames[selectedUni.country] : "",
          gpa: 70,
          strengths,
          whyThisProgram: whyProgram,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setLetter(data.letter);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-6 max-w-[1000px] mx-auto">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: "var(--text)" }}
        >
          <FileText
            className="inline-block mr-2 mb-1"
            style={{ color: "var(--blue)" }}
          />
          Motivasyon Mektubu Oluştur
        </h1>
        <p style={{ color: "var(--muted)" }} className="text-sm">
          AI destekli motivasyon mektubu — İngilizce, profesyonel kalitede.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Left - Form */}
        <div
          className="rounded-xl p-5 border space-y-4"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--text)" }}
            >
              Adınız
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Örn: Kerem Toker"
              className="w-full rounded-lg px-3 py-2 text-sm border outline-none"
              style={{
                background: "var(--surface2)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--text)" }}
            >
              Üniversite
            </label>
            <select
              value={selectedUniId}
              onChange={(e) => setSelectedUniId(e.target.value)}
              className="w-full rounded-lg px-3 py-2 text-sm border outline-none"
              style={{
                background: "var(--surface2)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              <option value="">Seçin...</option>
              {universities.map((u) => (
                <option key={u.id} value={u.id}>
                  {countryFlags[u.country]} {u.name} — {u.program}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--text)" }}
            >
              Güçlü Yönleriniz & Aktiviteler
            </label>
            <textarea
              value={strengths}
              onChange={(e) => setStrengths(e.target.value)}
              placeholder="Örn: Matematik olimpiyatı, açık kaynak katkıları, staj deneyimi..."
              rows={3}
              className="w-full rounded-lg px-3 py-2 text-sm border outline-none resize-none"
              style={{
                background: "var(--surface2)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--text)" }}
            >
              Bu Programı Neden İstiyorsunuz?
            </label>
            <textarea
              value={whyProgram}
              onChange={(e) => setWhyProgram(e.target.value)}
              placeholder="Örn: Yapay zeka alanında araştırma yapmak istiyorum, bu üniversitenin X laboratuvarı..."
              rows={3}
              className="w-full rounded-lg px-3 py-2 text-sm border outline-none resize-none"
              style={{
                background: "var(--surface2)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>

          {error && (
            <p className="text-sm" style={{ color: "var(--danger)" }}>
              {error}
            </p>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity disabled:opacity-50"
            style={{
              background: "var(--blue)",
              color: "var(--white)",
            }}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {loading ? "Oluşturuluyor..." : "Mektup Oluştur"}
          </button>
        </div>

        {/* Right - Result */}
        <div
          className="rounded-xl p-5 border"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--text)" }}
            >
              Oluşturulan Mektup
            </span>
            {letter && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors"
                style={{
                  background: "var(--surface2)",
                  color: "var(--muted)",
                }}
              >
                {copied ? (
                  <Check className="h-3 w-3" style={{ color: "var(--success)" }} />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                {copied ? "Kopyalandı" : "Kopyala"}
              </button>
            )}
          </div>

          {letter ? (
            <div
              className="text-sm leading-relaxed whitespace-pre-wrap"
              style={{ color: "var(--text)" }}
            >
              {letter}
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center h-[400px] text-center"
              style={{ color: "var(--muted)" }}
            >
              <FileText className="h-12 w-12 mb-3 opacity-30" />
              <p className="text-sm">
                Formu doldurup &quot;Mektup Oluştur&quot; butonuna tıklayın.
              </p>
              <p className="text-xs mt-1">
                AI ~500 kelimelik profesyonel İngilizce motivasyon mektubu
                oluşturacak.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
