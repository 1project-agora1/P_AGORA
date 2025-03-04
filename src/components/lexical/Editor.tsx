"use strict";
import type { JSX } from "react";

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

export default function Editor(): JSX.Element {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <ToolbarContext>
                <LexicalEditor />
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

function LexicalEditor(): JSX.Element {
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

    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem);
        }
    };

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
    const saveContent = async () => {
        const editorState = editor.getEditorState();
        const content = JSON.stringify(editorState.toJSON());
        //TODO : 게시판 저장 로직 추가
        console.log(content);
    };
    return (
        <>
            <ToolbarPlugin
                editor={editor}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
                setIsLinkEditMode={setIsLinkEditMode}
            />
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

            <SubmitButton buttonName="저장하기" onClick={saveContent} />
        </>
    );
}
