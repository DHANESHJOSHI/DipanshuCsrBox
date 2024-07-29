import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, collegeName, internshipName } = await request.json();

    // Validate inputs
    if (!email || !collegeName || !internshipName) {
      return NextResponse.json({ error: "Email, college name, and internship name are required" }, { status: 400 });
    }

    // Call the external API with a timeout set
    const response = await axios.post(
      "https://script.google.com/macros/s/AKfycbz4H3WldJcotmxnvhCTk390o67ZZIJq92QsYgd0A-NJvmh5GD9NhYiqVQrQ0Fs8yfFr/exec",
      { email, collegeName, internshipName },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Received data:", response.data);
    return NextResponse.json({ success: true, data: response.data }, { status: 200 });
  } catch (error) {
    console.error("Failed to post data:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return NextResponse.json({ error: "Failed to fetch data from external API", details: error.response.data }, { status: error.response.status });
    } else if (error.code === 'ECONNABORTED') {
      return NextResponse.json({ error: "Request timeout", details: error.message }, { status: 504 });
    } else {
      // Something happened in setting up the request and triggered an Error
      return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
  }
}
