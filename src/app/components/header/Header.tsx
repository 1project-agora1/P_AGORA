import Image from "next/image";
import { RiLoginBoxLine } from "react-icons/ri";

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 position-sticky top-0 z-50">
      <div className="container mx-auto flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
          <div>
            <span className="uppercase font-semibold">agora</span>
          </div>
        </div>
        {/* 이 부분은 공통 컴포넌트로 뺄 예정 */}
        <div className="flex flex-row w-[40%] justify-between">
          <div className="hover:text-blue-500 cursor-pointer">채널1</div>
          <div className="hover:text-blue-500 cursor-pointer">채널2</div>
          <div className="hover:text-blue-500 cursor-pointer">채널3</div>
          <div className="hover:text-blue-500 cursor-pointer">채널4</div>
        </div>
        {/* 회원 정보 */}
        <div>
          <button className="text-gray-600 hover:text-gray-800">
            <RiLoginBoxLine size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
