"use strict";
import type { JSX } from "react";

import { useUser } from "@/lib/hooks/useUser";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { SelectionAlwaysOnDisplay } from "@lexical/react/LexicalSelectionAlwaysOnDisplay";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { useLexicalEditable } from "@lexical/react/useLexicalEditable";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CAN_USE_DOM } from "@lexical/utils";
import { useEffect, useState } from "react";
import SubmitButton from "../button/SubmitButton";
import { useSettings } from "./context/SettingsContext";
import { ToolbarContext } from "./context/ToolbarContext";
import "./index.css";
import { ImageNode } from "./nodes/ImageNode";
import { InlineImageNode } from "./nodes/InlineImageNode/InlineImageNode";
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin";
import FloatingLinkEditorPlugin from "./plugins/FloatingLinkEditorPlugin";
import ImagesPlugin from "./plugins/ImagesPlugin";
import InlineImagePlugin from "./plugins/InlineImagePlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import "./themes/PlaygroundEditorTheme";
import theme from "./themes/PlaygroundEditorTheme";
import ContentEditable from "./ui/ContentEditable";
import { ListPlugin } from "./utils/LexicalListPlugin";
const editorConfig = {
    namespace: "MyEditor",
    theme: theme,
    onError(error: Error) {
        console.error(error);
    },
    nodes: [
        ImageNode,
        InlineImageNode,
        QuoteNode,
        HeadingNode,
        ListItemNode,
        CodeNode,
        LinkNode,
        ListNode,
    ],
};

export default function Editor({
    item,
    channel,
    data,
}: {
    item: string;
    channel: string;
    data?: any;
}): JSX.Element {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <ToolbarContext>
                <LexicalEditor item={item} channel={channel} data={data} />
            </ToolbarContext>
        </LexicalComposer>
    );
}

interface Settings {
    hasLinkAttributes: boolean;
}

interface UseSettings {
    settings: Settings;
}

function LexicalEditor({
    item,
    channel,
    data,
}: {
    item: string;
    channel: string;
    data?: any;
}): JSX.Element {
    const { user } = useUser();
    const {
        settings: { hasLinkAttributes },
    }: UseSettings = useSettings();
    const isEditable: boolean = useLexicalEditable();
    const [floatingAnchorElem, setFloatingAnchorElem] =
        useState<HTMLDivElement | null>(null);
    const [isSmallWidthViewport, setIsSmallWidthViewport] =
        useState<boolean>(false);
    const [editor] = useLexicalComposerContext();
    const [activeEditor, setActiveEditor] = useState(editor);
    const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem);
        }
    };
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    useEffect(() => {
        if (data?.content) {
            editor.update(() => {
                const editorState = editor.parseEditorState(data.content);
                editor.setEditorState(editorState);
            });
        }
    }, [data?.content, editor]);

    useEffect(() => {
        const updateViewPortWidth = () => {
            const isNextSmallWidthViewport =
                CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

            if (isNextSmallWidthViewport !== isSmallWidthViewport) {
                setIsSmallWidthViewport(isNextSmallWidthViewport);
            }
        };
        updateViewPortWidth();
        window.addEventListener("resize", updateViewPortWidth);
        return () => {
            window.removeEventListener("resize", updateViewPortWidth);
        };
    }, [isSmallWidthViewport]);

    const saveContent = async (e: any) => {
        e.preventDefault();
        const editorState = editor.getEditorState();

        const content = JSON.stringify(editorState.toJSON());
        if (data?.token) {
            await updatePost(content);
        } else {
            await savePost(content);
        }
    };

    const savePost = async (content: string) => {
        await fetch("/api/post/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                channel_item_token: item,
                title: title,
                content: content,
                user_token: user?.token,
            }),
        }).then((res) => {
            if (res.ok) {
                alert("게시글이 성공적으로 저장되었습니다.");
                window.location.href = `/channel/${channel}/${item}`;
            } else {
                alert("게시글 저장에 실패하였습니다.");
            }
        });
    };

    const updatePost = async (content: string) => {
        await fetch("/api/post/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                channel_item_token: item,
                title: title == "" ? data.title : title,
                content: content,
                user_token: user?.token,
                token: data.token,
            }),
        }).then((res) => {
            if (res.ok) {
                alert("게시글이 성공적으로 수정되었습니다.");
                window.location.href = `/channel/${channel}/${item}`;
            } else {
                alert("게시글 저장에 실패하였습니다.");
            }
        });
    };
    return (
        <form onSubmit={saveContent}>
            <div className="w-full border-b-2 border-gray-200 mb-4">
                <label htmlFor="title">제목</label>
                <input
                    onChange={handleTitleChange}
                    defaultValue={data?.title}
                    className="w-full text-lg px-2"
                    type="text"
                    name="title"
                    required
                    id=""
                />
            </div>
            <input type="hidden" name="userToken" value={user.token} />
            <ToolbarPlugin
                editor={editor}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
                setIsLinkEditMode={setIsLinkEditMode}
            />
            <div className="bg-gray-50 shadow-xl">
                <SelectionAlwaysOnDisplay />
                <ClearEditorPlugin />
                <RichTextPlugin
                    contentEditable={
                        <div className="editor-scroller">
                            <div className="editor" ref={onRef}>
                                <ContentEditable
                                    placeholder={"내용을 입력하세요..."}
                                />
                            </div>
                        </div>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
                {floatingAnchorElem && !isSmallWidthViewport && (
                    <>
                        <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                        <FloatingLinkEditorPlugin
                            anchorElem={floatingAnchorElem}
                            isLinkEditMode={isLinkEditMode}
                            setIsLinkEditMode={setIsLinkEditMode}
                        />
                    </>
                )}
                <LinkPlugin />
                <CheckListPlugin />
                <ImagesPlugin />
                <InlineImagePlugin />
                <ListPlugin />
                <ClickableLinkPlugin disabled={isEditable} />
                <HorizontalRulePlugin />
                <TabIndentationPlugin maxIndent={7} />
            </div>
            <SubmitButton style="mb-2" buttonName="저장하기" />
        </form>
    );
}
