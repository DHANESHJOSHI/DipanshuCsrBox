import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, collegeName, internshipName } = await request.json();

    // Validate inputs
    if (!email || !collegeName || !internshipName) {
      return new Response(JSON.stringify({ error: "Email, college name, and internship name are required" }), { status: 400 });
    }

    // Call the external API
    const response = await axios.post(
      "https://script.google.com/macros/s/AKfycbyiQO7jHxe-hWsy4rpe-iLwKLTfLznzq6FPfqMcdU7Ur1yDmQV3-7Vr0RIJiWAMNvl7/exec",
      { email, collegeName, internshipName },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Received data:", response.data);
    return new Response(JSON.stringify({ success: true, data: response.data }), { status: 200 });
  } catch (error) {
    console.error("Failed to post data:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return new Response(JSON.stringify({ error: "Failed to fetch data from external API", details: error.response.data }), { status: error.response.status });
    } else {
      // Something happened in setting up the request and triggered an Error
      return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message }), { status: 500 });
    }
  }
}
