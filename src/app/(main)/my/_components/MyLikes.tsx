"use client";

import useMe from "@/hooks/useMe";
import Image from "next/image";

export default function MyLikes() {
  const { likes } = useMe();

  return (
    <div>
      <ul className="grid grid-cols-3 gap-2 p-2">
        {likes?.artists.map((artist) => (
          <li className="divide-y-2 border border-black rounded p-2" key={artist.id}>
            <div className="relative aspect-square p-2">
              <Image
                src={artist.images.length ? artist.images[0].url : "http://via.placeholder.com/640x480"}
                className="object-cover"
                fill
                alt={artist.name}
                sizes={artist.images.length ? `${artist.images[0].width}px` : "100px"}
              />
            </div>
            <h2 className="font-bold text-lg">{artist.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}
