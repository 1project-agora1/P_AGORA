"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    channels: any;
}

export default function Sidebar({
    channels,
    isOpen,
    toggleSidebar,
}: SidebarProps) {
    const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

    const handleChannelClick = (channel: string) => {
        setSelectedChannel((prevChannel) =>
            prevChannel === channel ? null : channel
        );
    };

    return (
        <div
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md  transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out z-50`}
        >
            <div className="p-4 flex flex-col h-full">
                <div className="mb-4 flex justify-between">
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={50}
                        height={50}
                    />
                    <button onClick={toggleSidebar} className="self-end mb-4">
                        <IoMdClose />
                    </button>
                </div>
                <div className="flex flex-col space-y-4">
                    {channels.map((channel: any) => (
                        <div key={channel.token} className="flex flex-col">
                            <div
                                className="hover:text-primaryThin cursor-pointer"
                                onClick={() =>
                                    handleChannelClick(channel.menu_name)
                                }
                            >
                                {channel.menu_name}
                            </div>
                            {selectedChannel === channel.menu_name &&
                                channel.channelItems && (
                                    <div className="flex flex-col pl-4 transition-all duration-300 ease-in-out transform scale-95 origin-top">
                                        {channel.channelItems.map(
                                            (item: any) => (
                                                <div
                                                    key={item.token}
                                                    className="hover:text-primaryThin cursor-pointer"
                                                >
                                                    <Link
                                                        onClick={toggleSidebar}
                                                        href={`${channel.url}/${item.url}`}
                                                    >
                                                        {item.submenu_name}
                                                    </Link>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                        </div>
                    ))}
                </div>
                <div className="mt-auto">
                    <button className="text-gray-600 hover:text-gray-800">
                        로그인
                    </button>
                </div>
            </div>
        </div>
    );
}
