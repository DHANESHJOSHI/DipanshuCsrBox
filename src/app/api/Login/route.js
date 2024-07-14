import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, collegeName, internshipName } = await request.json();

    // Validate inputs
    if (!email || !collegeName || !internshipName) {
      return new Response(JSON.stringify({ error: "Email, college name, and internship name are required" }), { status: 400 });
    }

    // Call the external API
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzdFeQj6gX2rwWksBM5R8Ni9h1UhNispnJES3-m7iIc4hyfHbAzCrMvuduz5zR7VGih/exec",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, collegeName, internshipName }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(JSON.stringify({ error: "Failed to fetch data from external API", details: errorData }), { status: response.status });
    }

    const data = await response.json();

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.toString() }), { status: 500 });
  }
}
