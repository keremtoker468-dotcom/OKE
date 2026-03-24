import { NextRequest, NextResponse } from "next/server";
import { generateMotivationLetter } from "@/lib/claude";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { studentName, university, program, country, gpa, strengths, whyThisProgram } = body;

    if (!studentName || !university || !program || !strengths || !whyThisProgram) {
      return NextResponse.json(
        { error: "Tüm alanlar zorunludur." },
        { status: 400 }
      );
    }

    const letter = await generateMotivationLetter({
      studentName,
      university,
      program,
      country,
      gpa: gpa || 70,
      strengths,
      whyThisProgram,
    });

    return NextResponse.json({ letter });
  } catch (error) {
    console.error("Letter generation error:", error);
    return NextResponse.json(
      { error: "Mektup oluşturulurken bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
