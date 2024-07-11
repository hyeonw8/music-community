import { getAccessToken } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: { keyword: string };
}

const OFFSET = 8;

export async function GET(req: NextRequest, context: Context) {
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const page = params.get("page");
  const offset = Number(page) * OFFSET;

  // console.log("PAGE___", page);

  const { keyword } = context.params;
  const token = await getAccessToken();

  if (!token || !keyword || !keyword.length) {
    return NextResponse.json({ error: "Bad Request..." }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${keyword}&type=album&market=KR&limit=8&offset=${offset}`,
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`
        }
      }
    );
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.log("API ERROR___", error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}