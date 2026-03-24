import {
  University,
  EligibilityResult,
  EligibilityStatus,
  LanguageTest,
} from "@/types";

interface EligibilityInput {
  gpa: number;
  languageTest: LanguageTest;
  languageScore: number;
  budget: number;
}

export function calculateEligibility(
  university: University,
  input: EligibilityInput
): EligibilityResult {
  let gpaScore = 0;
  let gpaDetail = "";
  let languageScore = 0;
  let languageDetail = "";
  let budgetScore = 0;
  let budgetDetail = "";

  // GPA scoring
  if (input.gpa >= university.requiredGPA) {
    gpaScore = 25;
    gpaDetail = `GPA'nız (${input.gpa}) yeterli (gerekli: ${university.requiredGPA})`;
  } else {
    const diff = university.requiredGPA - input.gpa;
    gpaScore = Math.max(-25, 25 - diff * 3);
    gpaDetail = `GPA'nız (${input.gpa}) gerekli seviyenin (${university.requiredGPA}) ${diff} puan altında`;
  }

  // Language scoring
  if (input.languageTest === "none") {
    languageScore = -40;
    languageDetail = "Dil sertifikanız yok — başvuru için gerekli";
  } else if (input.languageTest === university.requiredLanguageTest) {
    if (input.languageScore >= university.requiredLanguageScore) {
      languageScore = 25;
      languageDetail = `${input.languageTest} puanınız (${input.languageScore}) yeterli (gerekli: ${university.requiredLanguageScore})`;
    } else {
      languageScore = -30;
      languageDetail = `${input.languageTest} puanınız (${input.languageScore}) yetersiz (gerekli: ${university.requiredLanguageScore})`;
    }
  } else {
    // Different test type
    languageScore = -30;
    languageDetail = `Farklı dil sınavı gerekli: ${university.requiredLanguageTest} (sizde: ${input.languageTest})`;
  }

  // Budget scoring
  if (university.tuitionPerYear === 0 || input.budget >= university.tuitionPerYear) {
    budgetScore = 10;
    budgetDetail =
      university.tuitionPerYear === 0
        ? "Ücretsiz eğitim"
        : `Bütçeniz (€${input.budget.toLocaleString()}) yeterli (ücret: €${university.tuitionPerYear.toLocaleString()}/yıl)`;
  } else {
    budgetScore = -20;
    budgetDetail = `Bütçeniz (€${input.budget.toLocaleString()}) yetersiz (ücret: €${university.tuitionPerYear.toLocaleString()}/yıl)`;
  }

  const totalScore = Math.max(0, Math.min(100, 50 + gpaScore + languageScore + budgetScore));

  const status = getStatus(totalScore);

  return {
    university,
    score: totalScore,
    status,
    breakdown: {
      gpaScore,
      languageScore,
      budgetScore,
      gpaDetail,
      languageDetail,
      budgetDetail,
    },
  };
}

function getStatus(score: number): EligibilityStatus {
  if (score >= 80) return "eligible";
  if (score >= 55) return "possible";
  if (score >= 30) return "reach";
  return "unlikely";
}

export const statusConfig: Record<
  EligibilityStatus,
  { label: string; color: string; bg: string; border: string }
> = {
  eligible: {
    label: "Uygun",
    color: "var(--success)",
    bg: "var(--success-bg)",
    border: "var(--success)",
  },
  possible: {
    label: "Mümkün",
    color: "var(--blue)",
    bg: "var(--blue-bg)",
    border: "var(--blue-border)",
  },
  reach: {
    label: "Zor",
    color: "var(--gold)",
    bg: "var(--gold-bg)",
    border: "var(--gold-border)",
  },
  unlikely: {
    label: "Düşük İhtimal",
    color: "var(--danger)",
    bg: "var(--danger-bg)",
    border: "var(--danger)",
  },
};
