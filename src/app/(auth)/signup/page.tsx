"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !nickname) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const response = await fetch("/api/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, nickname })
    });

    const data = await response.json();

    if (!data.errorMsg) {
      alert("회원가입이 성공적으로 완료되었습니다!");
      router.replace("/login");
    } else {
      alert(`회원가입 에러: ${data.errorMsg}`);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="mt-4 text-2xl font-bold text-black-200">Welcome!</h2>
      </div>
      <form onSubmit={handleSignup}>
        <div className="mb-6">
          <label className="block text-black-400 text-sm font-bold mb-2" htmlFor="nickname">
            UserName
          </label>
          <input
            type="text"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-3 py-2 bg-[#d9d9d9] border-b-2 border-black focus:outline-none focus:border-[#54b2d3]"
          />
        </div>
        <div className="mb-6">
          <label className="block text-black-400 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 bg-[#d9d9d9] border-b-2 border-black focus:outline-none focus:border-[#54b2d3]"
          />
        </div>
        <div className="mb-6">
          <label className="block text-black-400 text-sm font-bold mb-2" htmlFor="password">
            PassWord
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 bg-[#d9d9d9] border-b-2 border-black focus:outline-none focus:border-[#54b2d3]"
          />
        </div>
        <div className="flex justify-between items-center">
          <Link href="/login">
            <button
              type="button"
              className="ml-20 px-10 py-3 border border-black bg-[white] text-black-400 font-bold hover:bg-[#54b2d3] "
            >
              Back
            </button>
          </Link>
          <button
            type="submit"
            className="mr-20 px-10 py-3 border border-black bg-[white] text-black-400 font-bold hover:bg-[#54b2d3] "
          >
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
