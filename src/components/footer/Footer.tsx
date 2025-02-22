"ues client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-row text-sm h-full">
            <div className="mr-4">
              <a
                href="/html/privacy.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                개인정보처리지침
              </a>
            </div>
            <div className="mr-4">|</div>
            <div>
              <a
                href="/html/privacy.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                이용약관
              </a>
            </div>
          </div>
          <div className="text-sm text-center mt-4 flex items-end justify-center md:mt-0">
            <p>
              &copy; {new Date().getFullYear()} 덕인가. All rights reserved.
            </p>
          </div>
          <div className="text-sm hidden md:block">
            <h2 className="text-[16px] font-semibold">덕인가</h2>
            <p>대표: 정재영</p>
            <p>주소: 경기도 하남시 미사동일넥서스 913호</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
