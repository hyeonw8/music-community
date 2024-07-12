"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPost } from "./getAllPost";
import { PostgrestError } from "@supabase/supabase-js";
import { PostType } from "@/types/posts.type";
import PostCard from "./PostCard";
import { CustomNextArrow, CustomPrevArrow } from "@/components/CutomArrow";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

const PostList = () => {
  const {
    data: allPosts,
    isPending,
    error
  } = useQuery<PostType[], PostgrestError>({
    queryKey: ["allPosts"],
    queryFn: getAllPost
  });

  if (isPending) {
    return <div>~~~</div>;
  }

  if (error) {
    console.error(error);
    return <div className="text-xl">에러가 발생했습니다: {error?.message}</div>;
  }

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 10000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };

  return (
    <div className="mt-10">
      <p className="font-bold mb-5">게시글</p>
      <div className="custom-slider ml-3 mr-3">
        <Slider {...settings}>
          {allPosts?.map((post) => (
            <div key={post.id} className="shadow-md hover:shadow-lg transition-shadow duration-150 
              active:shadow-[inset_0_2px_8px_gray] select-none cursor-pointer
              border border-black rounded">
              <Link href={`/detailpage/${post.id}`}>
                <PostCard post={post} />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default PostList;
