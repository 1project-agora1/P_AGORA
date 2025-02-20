"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { RiLoginBoxLine, RiMenuLine } from "react-icons/ri";
import Sidebar from "../sidebar/Sidebar"; // 사이드바 컴포넌트 추가

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 추가

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header
        className={`sticky p-4 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-transparent backdrop-blur-sm shadow-md"
            : "bg-white shadow-md"
        }`}
      >
        <div className="container mx-auto flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
            <div>
              <span className="uppercase font-semibold">agora</span>
            </div>
          </div>
          {/* 모바일에서는 숨기기 */}
          <div className="hidden md:flex flex-row w-[40%] justify-between">
            <div className="hover:text-blue-500 cursor-pointer">채널1</div>
            <div className="hover:text-blue-500 cursor-pointer">채널2</div>
            <div className="hover:text-blue-500 cursor-pointer">채널3</div>
            <div className="hover:text-blue-500 cursor-pointer">채널4</div>
          </div>
          {/* 회원 정보 */}
          <div className="hidden md:block">
            <button className="text-gray-600 hover:text-gray-800">
              <RiLoginBoxLine size={24} />
            </button>
          </div>
          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-800"
            >
              <RiMenuLine size={24} />
            </button>
          </div>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}
