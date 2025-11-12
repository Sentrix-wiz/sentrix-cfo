import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  console.log("Waitlist submission:", data);

  // In next step we’ll insert into Supabase
  return NextResponse.json({ ok: true });
}
