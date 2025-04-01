"use client";

import { QRCodeSVG } from "qrcode.react";
import { useRef, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import SubmitButton from "../button/SubmitButton";

export const ShareModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const qrRef = useRef<SVGSVGElement | null>(null);

    const currentUrl =
        typeof window !== "undefined" ? window.location.href : "";

    const handleCopy = async () => {
        await navigator.clipboard.writeText(currentUrl);
        toast.success("URL이 복사되었습니다.");
    };
    const downloadQR = () => {
        const svg = qrRef.current;
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.download = "qr-code.png";
            link.href = pngFile;
            link.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };
    //TODO : 소셜 공유하기 추가?
    return (
        <>
            <ToastContainer />
            <SubmitButton
                buttonName="공유하기"
                onClick={() => setIsOpen(true)}
            />
            {/* 모달 */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-xl relative">
                        {/* 닫기 버튼 */}
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-black"
                            onClick={() => setIsOpen(false)}
                        >
                            &times;
                        </button>

                        <h2 className="text-xl font-bold mb-4">게시물 공유</h2>

                        {/* URL 복사 */}
                        <div className="flex items-center space-x-2 mb-4">
                            <input
                                type="text"
                                value={currentUrl}
                                readOnly
                                className="flex-1 border rounded px-3 py-2 text-sm"
                            />
                            <button
                                className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 text-sm"
                                onClick={handleCopy}
                            >
                                <FaRegCopy />
                            </button>
                        </div>

                        {/* QR 코드 */}
                        <div className="flex flex-col items-center space-y-2">
                            <QRCodeSVG
                                value={currentUrl}
                                className="cursor-pointer"
                                size={150}
                                ref={qrRef}
                                onClick={downloadQR}
                            />
                            <p className="text-sm text-gray-500">
                                QR코드를 클릭하여 다운로드하세요.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
