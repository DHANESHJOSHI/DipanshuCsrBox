import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = "https://script.google.com/macros/s/AKfycbyiQO7jHxe-hWsy4rpe-iLwKLTfLznzq6FPfqMcdU7Ur1yDmQV3-7Vr0RIJiWAMNvl7/exec";
    
    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.collegeName || !Array.isArray(data.collegeName) || data.collegeName.length === 0) {
      return NextResponse.json({ error: "No data found or data is not in the expected format" }, { status: 404 });
    }

    console.log("Received data:", data);

    const collegeNames = data.collegeName.filter(Boolean);
    const collegeNamesSet = new Set(collegeNames.map(name => name.trim()));
    const uniqueCollegeNames = Array.from(collegeNamesSet);

    console.log("Unique college names:", uniqueCollegeNames);

    // Store college names in local storage
    if (typeof window !== 'undefined') {
      localStorage.setItem('collegeName', JSON.stringify(uniqueCollegeNames));
    }

    return NextResponse.json(
      { success: true, colleges: uniqueCollegeNames },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data or processing data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}