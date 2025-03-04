import { DecoratorNode, NodeKey, SerializedLexicalNode, Spread } from "lexical";
import type { JSX } from "react";

export type SerializedLinkNode = Spread<
    {
        url: string;
        target?: string;
        rel?: string;
    },
    SerializedLexicalNode
>;

export class LinkNode extends DecoratorNode<JSX.Element> {
    __url: string;
    __target?: string;
    __rel?: string;

    static getType(): string {
        return "link";
    }

    static clone(node: LinkNode): LinkNode {
        return new LinkNode(node.__url, node.__target, node.__rel, node.__key);
    }

    constructor(url: string, target?: string, rel?: string, key?: NodeKey) {
        super(key);
        this.__url = url;
        this.__target = target;
        this.__rel = rel;
    }

    createDOM(): HTMLElement {
        const a = document.createElement("a");
        a.href = this.__url;
        if (this.__target) {
            a.target = this.__target;
        }
        if (this.__rel) {
            a.rel = this.__rel;
        }
        return a;
    }

    updateDOM(): boolean {
        return false;
    }

    static importJSON(serializedNode: SerializedLinkNode): LinkNode {
        const { url, target, rel } = serializedNode;
        return new LinkNode(url, target, rel);
    }

    exportJSON(): SerializedLinkNode {
        return {
            ...super.exportJSON(),
            url: this.__url,
            target: this.__target,
            rel: this.__rel,
            type: "link",
        };
    }

    decorate(): JSX.Element {
        return (
            <a href={this.__url} target={this.__target} rel={this.__rel}>
                {this.getTextContent()}
            </a>
        );
    }
}

export function $createLinkNode({
    url,
    target,
    rel,
}: {
    url: string;
    target?: string;
    rel?: string;
}): LinkNode {
    return new LinkNode(url, target, rel);
}
