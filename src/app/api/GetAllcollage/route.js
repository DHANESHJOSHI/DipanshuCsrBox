import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = "https://script.google.com/macros/s/AKfycbz4H3WldJcotmxnvhCTk390o67ZZIJq92QsYgd0A-NJvmh5GD9NhYiqVQrQ0Fs8yfFr/exec";
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data || !data.collegeName || !Array.isArray(data.collegeName) || data.collegeName.length === 0) {
      return NextResponse.json({ error: "No data found or data is not in the expected format" }, { status: 404 });
    }
    const collegeNames = data.collegeName.filter(Boolean);
    const collegeNamesSet = new Set(collegeNames.map(name => name.trim()));
    const uniqueCollegeNames = Array.from(collegeNamesSet);

  return NextResponse.json(
      { success: true, colleges: uniqueCollegeNames },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data or processing data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}