"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function WritePage() {
    const [content, setContent] = useState("");

    const handleContentChange = (value: string) => {
        setContent(value);
    };

    const handleSubmit = () => {
        // 글 작성 내용을 서버로 전송하는 로직을 추가합니다.
        console.log("Submitted content:", content);
    };
    const formats = [
        "font",
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "align",
        "color",
        "background",
        "size",
        "code",
        "image",
        "video",
    ];
    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ size: [] }],
            [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };
    return (
        <div className="container mx-auto p-4 flex flex-col">
            <h1 className="text-2xl font-bold mb-4">글 작성</h1>
            <div className="mb-5">
                <ReactQuill
                    theme="snow"
                    formats={formats}
                    value={content}
                    modules={modules}
                    onChange={handleContentChange}
                    style={{ height: "500px" }}
                />
            </div>
            <div className=" flex items-center justify-end mt-10">
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    제출
                </button>
            </div>
        </div>
    );
}
