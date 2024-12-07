import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API}`,
          "Content-Type": "application/json",
        },
      }
    );


    const suggestion = suggestDepartment(response.data.choices[0].text);

    return NextResponse.json({
      answer: response.data.choices[0].text,
      suggestion,
    });
  } catch (error) {
    console.error("Error Details:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}

// Example department suggestion logic
function suggestDepartment(answer) {
  if (answer.toLowerCase().includes("headache")) return "Neurology";
  if (answer.toLowerCase().includes("chest pain")) return "Cardiology";
  return "General Medicine";
}
