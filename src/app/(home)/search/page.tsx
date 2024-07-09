"use client";

import SearchBar from "@/app/api/search/_components/SearchBar";
import { useRouter } from "next/navigation";
import { Suspense, useRef } from "react";

function SearchPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickHandler = () => {
    if (inputRef.current) {
      const encodeURL = encodeURIComponent(inputRef.current.value);
      // console.log("INPUT REF___", encodeURL);
      router.push(`?params=${encodeURL}`, { scroll: false });
    }
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={onClickHandler}>찾기</button>
      <Suspense fallback={<div>나우 로우딩...</div>}>
        <SearchBar />
      </Suspense>
    </div>
  );
}

export default SearchPage;

/**
 * http GET 'https://api.spotify.com/v1/search?q=%EB%9F%AC%EB%B8%94%EB%A6%AC%EC%A6%88&type=album' \
  Authorization:'Bearer 1POdFZRZbvb...qqillRxMr2z'
 * 
 */
