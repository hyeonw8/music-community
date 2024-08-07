import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const userId = params.get("userId");

  if (!userId) return NextResponse.json({ message: "API GET POSTS No User Id" });

  const supabase = createClient();

  const response = await supabase
    .from("posts")
    .select("*")
    .eq("userId", userId)
    .order("created_at", { ascending: false });

  const data = response.data;

  return NextResponse.json(data);
}
