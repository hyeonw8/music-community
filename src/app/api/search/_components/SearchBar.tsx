import api from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();
  console.log("PARAMS___", searchParams);
  const query = searchParams.get("params") ? (searchParams.get("params") as string) : "";
  console.log("QUERY___", query);
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", { query }],
    queryFn: () => api.getSearchResult(query)
  });

  console.log("DATA___", searchResults);

  return (
    <div>
      {!isLoading && searchResults && (
        <>
          <div>
            <h2 className="font-bold text-xl">앨범</h2>
            <ul className="grid grid-cols-6 gap-4">
              {searchResults.albums.items.map((item) => (
                <li key={item.id}>
                  <div className="relative aspect-square p-2">
                    <Image
                      src={item.images[1].url}
                      className="object-cover"
                      fill
                      alt={item.name}
                      sizes={item.images.length ? `${item.images[0].width}px` : "100px"}
                    />
                  </div>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-xl">아티스트</h2>
            <ul className="grid grid-cols-6 gap-4">
              {searchResults.artists.items.map((item) => (
                <li key={item.id}>
                  <div className="relative aspect-square p-2">
                    <Image
                      src={item.images.length ? item.images[0].url : "http://via.placeholder.com/640x480"}
                      className="object-cover"
                      fill
                      alt={item.name}
                      sizes={item.images.length ? `${item.images[0].width}px` : "100px"}
                    />
                  </div>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
