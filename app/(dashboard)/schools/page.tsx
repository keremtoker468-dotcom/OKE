"use client";

import { useState, useMemo } from "react";
import { universities } from "@/lib/universities";
import { calculateEligibility, statusConfig } from "@/lib/eligibility";
import {
  Country,
  countryNames,
  countryFlags,
  LanguageTest,
  EligibilityResult,
} from "@/types";
import {
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Info,
} from "lucide-react";

const allCountries: Country[] = ["NL", "IT", "DE", "FR", "ES", "SE"];
const languageTests: { value: LanguageTest; label: string }[] = [
  { value: "none", label: "Sertifikam yok" },
  { value: "IELTS", label: "IELTS" },
  { value: "TestDaF", label: "TestDaF" },
  { value: "TOEFL", label: "TOEFL" },
];

export default function SchoolsPage() {
  const [gpa, setGpa] = useState(70);
  const [langTest, setLangTest] = useState<LanguageTest>("IELTS");
  const [langScore, setLangScore] = useState(6.5);
  const [budget, setBudget] = useState(5000);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const results = useMemo(() => {
    let filtered = universities;

    if (selectedCountries.length > 0) {
      filtered = filtered.filter((u) => selectedCountries.includes(u.country));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.program.toLowerCase().includes(q)
      );
    }

    const eligibilityResults: EligibilityResult[] = filtered.map((u) =>
      calculateEligibility(u, {
        gpa,
        languageTest: langTest,
        languageScore: langScore,
        budget,
      })
    );

    return eligibilityResults.sort((a, b) => b.score - a.score);
  }, [gpa, langTest, langScore, budget, selectedCountries, searchQuery]);

  const counts = useMemo(() => {
    return {
      eligible: results.filter((r) => r.status === "eligible").length,
      possible: results.filter((r) => r.status === "possible").length,
      reach: results.filter((r) => r.status === "reach").length,
      unlikely: results.filter((r) => r.status === "unlikely").length,
    };
  }, [results]);

  const toggleCountry = (c: Country) => {
    setSelectedCountries((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold mb-1"
          style={{ color: "var(--text)" }}
        >
          <GraduationCap
            className="inline-block mr-2 mb-1"
            style={{ color: "var(--blue)" }}
          />
          Üniversite Uygunluk Kontrolü
        </h1>
        <p style={{ color: "var(--muted)" }} className="text-sm">
          Bilgilerinizi girin ve hangi üniversitelere başvurabileceğinizi görün.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {(
          [
            ["eligible", counts.eligible, "Uygun"],
            ["possible", counts.possible, "Mümkün"],
            ["reach", counts.reach, "Zor"],
            ["unlikely", counts.unlikely, "Düşük İhtimal"],
          ] as const
        ).map(([status, count, label]) => {
          const cfg = statusConfig[status];
          return (
            <div
              key={status}
              className="rounded-xl p-4 border"
              style={{
                background: cfg.bg,
                borderColor: cfg.border,
              }}
            >
              <div
                className="text-2xl font-bold"
                style={{ color: cfg.color }}
              >
                {count}
              </div>
              <div className="text-sm" style={{ color: cfg.color }}>
                {label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-6">
        {/* Left Panel - Filters */}
        <div
          className="w-[300px] flex-shrink-0 rounded-xl p-5 border space-y-5"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Filter className="h-4 w-4" style={{ color: "var(--blue)" }} />
            <span
              className="font-semibold text-sm"
              style={{ color: "var(--text)" }}
            >
              Filtreler
            </span>
          </div>

          {/* GPA */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text)" }}
            >
              GPA (100 üzerinden)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              value={gpa}
              onChange={(e) => setGpa(Number(e.target.value))}
              className="w-full rounded-lg px-3 py-2 text-sm border outline-none focus:ring-2"
              style={{
                background: "var(--surface2)",
                borderColor: "var(--border)",
                color: "var(--text)",
                // @ts-expect-error CSS custom property
                "--tw-ring-color": "var(--blue-border)",
              }}
            />
            <input
              type="range"
              min={0}
              max={100}
              value={gpa}
              onChange={(e) => setGpa(Number(e.target.value))}
              className="w-full mt-2 accent-[#3b82f6]"
            />
          </div>

          {/* Language Test */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text)" }}
            >
              Dil Sınavı
            </label>
            <select
              value={langTest}
              onChange={(e) => setLangTest(e.target.value as LanguageTest)}
              className="w-full rounded-lg px-3 py-2 text-sm border outline-none"
              style={{
                background: "var(--surface2)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              {languageTests.map((lt) => (
                <option key={lt.value} value={lt.value}>
                  {lt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Language Score */}
          {langTest !== "none" && (
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text)" }}
              >
                {langTest} Puanı
              </label>
              <input
                type="number"
                step={langTest === "TestDaF" ? 1 : 0.5}
                min={0}
                max={langTest === "TestDaF" ? 5 : 9}
                value={langScore}
                onChange={(e) => setLangScore(Number(e.target.value))}
                className="w-full rounded-lg px-3 py-2 text-sm border outline-none"
                style={{
                  background: "var(--surface2)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              />
            </div>
          )}

          {/* Budget */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text)" }}
            >
              Yıllık Bütçe (€)
            </label>
            <input
              type="number"
              min={0}
              step={500}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full rounded-lg px-3 py-2 text-sm border outline-none"
              style={{
                background: "var(--surface2)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>

          {/* Country Filter */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text)" }}
            >
              Ülke
            </label>
            <div className="flex flex-wrap gap-2">
              {allCountries.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleCountry(c)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
                  style={{
                    background: selectedCountries.includes(c)
                      ? "var(--blue-bg)"
                      : "var(--surface2)",
                    borderColor: selectedCountries.includes(c)
                      ? "var(--blue-border)"
                      : "var(--border)",
                    color: selectedCountries.includes(c)
                      ? "var(--blue-light)"
                      : "var(--muted)",
                  }}
                >
                  {countryFlags[c]} {countryNames[c]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Results */}
        <div className="flex-1 space-y-3">
          {/* Search */}
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
              style={{ color: "var(--muted)" }}
            />
            <input
              type="text"
              placeholder="Üniversite veya program ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm border outline-none"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            />
          </div>

          {results.length === 0 && (
            <div
              className="text-center py-12 rounded-xl border"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
                color: "var(--muted)",
              }}
            >
              Sonuç bulunamadı. Filtreleri değiştirmeyi deneyin.
            </div>
          )}

          {results.map((result) => {
            const cfg = statusConfig[result.status];
            const isExpanded = expandedId === result.university.id;

            return (
              <div
                key={result.university.id}
                className="rounded-xl border overflow-hidden transition-all"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() =>
                    setExpandedId(isExpanded ? null : result.university.id)
                  }
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">
                      {countryFlags[result.university.country]}
                    </span>
                    <div>
                      <div
                        className="font-semibold"
                        style={{ color: "var(--text)" }}
                      >
                        {result.university.name}
                      </div>
                      <div className="text-sm" style={{ color: "var(--muted)" }}>
                        {result.university.program} •{" "}
                        {countryNames[result.university.country]}
                        {result.university.tuitionPerYear > 0
                          ? ` • €${result.university.tuitionPerYear.toLocaleString()}/yıl`
                          : " • Ücretsiz"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Score */}
                    <div
                      className="text-lg font-bold"
                      style={{ color: cfg.color }}
                    >
                      %{result.score}
                    </div>

                    {/* Badge */}
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: cfg.bg,
                        color: cfg.color,
                        border: `1px solid ${cfg.border}`,
                      }}
                    >
                      {cfg.label}
                    </span>

                    {isExpanded ? (
                      <ChevronUp
                        className="h-4 w-4"
                        style={{ color: "var(--muted)" }}
                      />
                    ) : (
                      <ChevronDown
                        className="h-4 w-4"
                        style={{ color: "var(--muted)" }}
                      />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div
                    className="px-4 pb-4 pt-0 border-t space-y-3"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <div className="grid grid-cols-3 gap-3 pt-3">
                      {[
                        {
                          label: "GPA",
                          score: result.breakdown.gpaScore,
                          detail: result.breakdown.gpaDetail,
                        },
                        {
                          label: "Dil",
                          score: result.breakdown.languageScore,
                          detail: result.breakdown.languageDetail,
                        },
                        {
                          label: "Bütçe",
                          score: result.breakdown.budgetScore,
                          detail: result.breakdown.budgetDetail,
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-lg p-3 border"
                          style={{
                            background: "var(--surface2)",
                            borderColor: "var(--border)",
                          }}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span
                              className="text-xs font-medium"
                              style={{ color: "var(--muted)" }}
                            >
                              {item.label}
                            </span>
                            <span
                              className="text-sm font-bold"
                              style={{
                                color:
                                  item.score > 0
                                    ? "var(--success)"
                                    : "var(--danger)",
                              }}
                            >
                              {item.score > 0 ? "+" : ""}
                              {item.score}
                            </span>
                          </div>
                          <p
                            className="text-xs"
                            style={{ color: "var(--muted)" }}
                          >
                            {item.detail}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div
                      className="flex items-start gap-2 text-xs p-3 rounded-lg"
                      style={{
                        background: "var(--blue-bg)",
                        color: "var(--blue-light)",
                      }}
                    >
                      <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                      Bu tahmindir, üniversitenin resmi sitesini kontrol edin.
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
