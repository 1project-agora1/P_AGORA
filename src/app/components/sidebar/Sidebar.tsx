import { RiLoginBoxLine } from "react-icons/ri";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-4 flex flex-col">
        <button onClick={toggleSidebar} className="self-end mb-4">
          닫기
        </button>
        <div className="flex flex-col space-y-4">
          <div className="hover:text-blue-500 cursor-pointer">채널1</div>
          <div className="hover:text-blue-500 cursor-pointer">채널2</div>
          <div className="hover:text-blue-500 cursor-pointer">채널3</div>
          <div className="hover:text-blue-500 cursor-pointer">채널4</div>
        </div>
        <div className="mt-auto">
          <button className="text-gray-600 hover:text-gray-800">
            <RiLoginBoxLine size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
