import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, collegeName, internshipName } = await request.json();

    // Validate inputs
    if (!email || !collegeName || !internshipName) {
      return new Response(JSON.stringify({ error: "Email, college name, and internship name are required" }), { status: 400 });
    }

    // Set a timeout for the fetch request to avoid indefinite waiting
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

    // Call the external API
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyiQO7jHxe-hWsy4rpe-iLwKLTfLznzq6FPfqMcdU7Ur1yDmQV3-7Vr0RIJiWAMNvl7/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, collegeName, internshipName }),
        signal: controller.signal
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json();
      return new Response(JSON.stringify({ error: "Failed to fetch data from external API", details: errorData }), { status: response.status });
    }

    const data = await response.json();
    console.log("Received data:", data);
    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.toString() }), { status: 500 });
  }
}
