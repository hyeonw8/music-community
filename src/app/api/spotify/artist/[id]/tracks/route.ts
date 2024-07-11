import { getAccessToken } from "@/lib/spotify";
import { TracksItems } from "@/types/spotify.type";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, context: { params: { id: string } }) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get<TracksItems[]>(
      `https://api.spotify.com/v1/artists/${context.params.id}/top-tracks`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { market: "KR", locale: "ko_KR" }
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching track:", error);
    return NextResponse.json({ error: "Failed to fetch track data" }, { status: 500 });
  }
};
