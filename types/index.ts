export type Country = "NL" | "IT" | "DE" | "FR" | "ES" | "SE";

export const countryNames: Record<Country, string> = {
  NL: "Hollanda",
  IT: "İtalya",
  DE: "Almanya",
  FR: "Fransa",
  ES: "İspanya",
  SE: "İsveç",
};

export const countryFlags: Record<Country, string> = {
  NL: "🇳🇱",
  IT: "🇮🇹",
  DE: "🇩🇪",
  FR: "🇫🇷",
  ES: "🇪🇸",
  SE: "🇸🇪",
};

export type LanguageTest = "IELTS" | "TestDaF" | "TOEFL" | "none";

export interface University {
  id: string;
  name: string;
  country: Country;
  program: string;
  requiredGPA: number; // out of 100
  requiredLanguageTest: LanguageTest;
  requiredLanguageScore: number;
  tuitionPerYear: number; // EUR
  deadline?: string;
  website?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  gpa: number; // out of 100
  languageTest: LanguageTest;
  languageScore: number;
  budget: number; // EUR per year
  targetCountries: Country[];
  targetField?: string;
}

export type EligibilityStatus = "eligible" | "possible" | "reach" | "unlikely";

export interface EligibilityResult {
  university: University;
  score: number;
  status: EligibilityStatus;
  breakdown: {
    gpaScore: number;
    languageScore: number;
    budgetScore: number;
    gpaDetail: string;
    languageDetail: string;
    budgetDetail: string;
  };
}

export interface Application {
  id: string;
  userId: string;
  universityId: string;
  status: "planning" | "in-progress" | "submitted" | "accepted" | "rejected";
  motivationLetter?: string;
  notes?: string;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}
