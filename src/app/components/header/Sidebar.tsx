import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="p-2 bg-blue-500 text-white rounded-md"
      >
        {isOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>
      {isOpen && (
        <div className="sidebar bg-gray-800 text-white p-4">
          {/* 사이드바 내용 */}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
