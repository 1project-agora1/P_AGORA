import Image from "next/image";
import { IoMdClose } from "react-icons/io";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md  transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-4 flex flex-col h-full">
        <div className="mb-4 flex justify-between">
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
          <button onClick={toggleSidebar} className="self-end mb-4">
            <IoMdClose />
          </button>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="hover:text-primaryThin cursor-pointer">채널1</div>
          <div className="hover:text-primaryThin cursor-pointer">채널2</div>
          <div className="hover:text-primaryThin cursor-pointer">채널3</div>
          <div className="hover:text-primaryThin cursor-pointer">채널4</div>
        </div>
        <div className="mt-auto">
          <button className="text-gray-600 hover:text-gray-800">로그인</button>
        </div>
      </div>
    </div>
  );
}
