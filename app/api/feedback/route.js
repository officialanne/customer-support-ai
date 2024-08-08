import { NextResponse } from 'next/server';

export async function POST(req) {
  const data = await req.json();
  const feedback = data.feedback;

  // Handle feedback (e.g., save to database or send via email)
  console.log('Feedback received:', feedback);

  return NextResponse.json({ message: 'Feedback received' });
}
