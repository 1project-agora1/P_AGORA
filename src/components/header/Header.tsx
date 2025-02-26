"use client";

import { Channel } from "@/lib/types/ChannerType";
import { Skeleton } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiMenuLine } from "react-icons/ri";
import Sidebar from "../sidebar/Sidebar";

interface HeaderProps {
    channels: Channel[];
    loading: boolean;
}

const DynamicLoginModal = dynamic(
    () => import("@/components/auth/LoginModal"),
    { ssr: false }
);

export default function Header({ channels, loading }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 추가
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [activeChannel, setActiveChannel] = useState<string | null>(null); // 활성 채널 상태 추가

    const openLoginModal = () => setIsLoginModalOpen(true);
    const closeLoginModal = () => setIsLoginModalOpen(false);

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

    const toggleChannel = (channelToken: string) => {
        setActiveChannel((prevChannel) =>
            prevChannel === channelToken ? null : channelToken
        );
    };

    return (
        <>
            <header
                className={`sticky py-1 px-5 top-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-transparent backdrop-blur-sm shadow-sm shadow-primaryThin"
                        : "bg-white shadow-primaryThin shadow-md"
                }`}
            >
                <div className="container mx-auto flex flex-row justify-between items-center">
                    <Link href="/">
                        <div className="flex flex-row items-center">
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                width={50}
                                height={50}
                            />
                            <div>
                                <span className="uppercase font-semibold hover:text-primary">
                                    agora
                                </span>
                            </div>
                        </div>
                    </Link>
                    {/* 모바일에서는 숨기기 */}
                    <div
                        className={`hidden md:flex flex-row justify-between w-auto`}
                    >
                        {loading ? (
                            <div className="flex flex-row space-x-4">
                                <Skeleton className="w-24" />
                                <Skeleton className="w-24" />
                                <Skeleton className="w-24" />
                                <Skeleton className="w-24" />
                            </div>
                        ) : (
                            channels.map((channel) => (
                                <div
                                    key={channel.token}
                                    className="relative hidden md:flex flex-col"
                                >
                                    <div
                                        className="hover:text-primary font-bold cursor-pointer mx-4 text-xl"
                                        onClick={() =>
                                            toggleChannel(channel.token)
                                        }
                                    >
                                        {channel.menu_name}
                                    </div>
                                    {activeChannel === channel.token &&
                                        channel.channelItems && (
                                            <div className="absolute flex flex-col w-[100px] top-full mt-2 bg-white shadow-lg rounded-md transition-all duration-300 ease-in-out transform scale-95 origin-top">
                                                {channel.channelItems.map(
                                                    (item) => (
                                                        <div
                                                            key={item.token}
                                                            className="hover:text-primaryThin cursor-pointer text-nowrap text-ellipsis overflow-hidden px-4 py-2"
                                                        >
                                                            <Link
                                                                onClick={() =>
                                                                    setActiveChannel(
                                                                        null
                                                                    )
                                                                }
                                                                href={`${channel.url}/${item.url}`}
                                                            >
                                                                {
                                                                    item.submenu_name
                                                                }
                                                            </Link>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}
                                </div>
                            ))
                        )}
                    </div>
                    {/* 회원 정보 */}
                    <div className="hidden md:block hover:text-primaryThin cursor-pointer">
                        <button onClick={openLoginModal}>로그인</button>
                        <DynamicLoginModal
                            open={isLoginModalOpen}
                            onClose={closeLoginModal}
                        />
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
            <Sidebar
                channels={channels}
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />
        </>
    );
}
