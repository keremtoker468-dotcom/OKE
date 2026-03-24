import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export async function generateMotivationLetter(params: {
  studentName: string;
  university: string;
  program: string;
  country: string;
  gpa: number;
  strengths: string;
  whyThisProgram: string;
}): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20241022",
    max_tokens: 1500,
    system:
      "You are an expert European university admissions consultant writing motivation letters for Turkish students applying to European universities. Write compelling, authentic motivation letters in English (~500 words). Be specific and personal, avoid clichés.",
    messages: [
      {
        role: "user",
        content: `Write a motivation letter for:
- Student: ${params.studentName}
- University: ${params.university}
- Program: ${params.program}
- Country: ${params.country}
- GPA: ${params.gpa}/100
- Strengths/Activities: ${params.strengths}
- Why this program: ${params.whyThisProgram}

Write approximately 500 words. Be genuine and specific.`,
      },
    ],
  });

  const block = message.content[0];
  if (block.type === "text") {
    return block.text;
  }
  return "";
}

export async function explainEligibility(params: {
  university: string;
  program: string;
  score: number;
  gpaDetail: string;
  languageDetail: string;
  budgetDetail: string;
}): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-haiku-4-5-20241022",
    max_tokens: 500,
    system:
      "Sen Avrupa üniversitelerine başvuru konusunda uzman bir danışmansın. Türk öğrencilere Türkçe tavsiyelerde bulun. Kısa ve öz ol.",
    messages: [
      {
        role: "user",
        content: `Şu başvuru durumunu değerlendir ve kısa tavsiyeler ver:
- Üniversite: ${params.university} - ${params.program}
- Uygunluk skoru: ${params.score}/100
- GPA durumu: ${params.gpaDetail}
- Dil durumu: ${params.languageDetail}
- Bütçe durumu: ${params.budgetDetail}

3-4 cümlelik pratik tavsiye ver.`,
      },
    ],
  });

  const block = message.content[0];
  if (block.type === "text") {
    return block.text;
  }
  return "";
}
