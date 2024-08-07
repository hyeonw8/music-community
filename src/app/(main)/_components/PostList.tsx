"use client";

import Link from "next/link";
import PostCard from "./PostCard";
import { CustomNextArrow, CustomPrevArrow } from "@/components/CustomArrow";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import PostListSkeleton from "./PostListSkeleton";
import { useMainPageData } from "@/hooks/useMainPageData";

const PostList = () => {
  const { allPosts, isPending, error } = useMainPageData();
  if (isPending) {
    return <PostListSkeleton />;
  }

  if (error) {
    console.error(error);
    return <div className="text-xl">에러가 발생했습니다.</div>;
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
    <div className="mt-10 w-full">
      <p className="font-bold mb-5">게시글</p>
      <div className="custom-slider">
        <Slider {...settings}>
          {allPosts?.map((post) => (
            <div key={post.id} className="px-1">
              <div
                className="shadow-md hover:shadow-lg transition-shadow duration-150 
              active:shadow-[inset_0_2px_8px_gray] select-none cursor-pointer
              border border-gray-300 rounded-lg max-w-[250px] mx-auto"
              >
                <Link className="p-2 flex flex-col gap-y-2" href={`/post/${post.id}`}>
                  <PostCard post={post} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PostList;
