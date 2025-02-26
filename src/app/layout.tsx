import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { ApiResponse } from "@/lib/ApiResponse";
import { Channel } from "@/lib/types/ChannerType";
import type { Metadata } from "next";
import "react-quill-new/dist/quill.snow.css";
import "./globals.css";

export const metadata: Metadata = {
    title: "Agora-모두 모여라",
    description: "우리들의 모임을 위한 공간",
};

async function fetchChannels(): Promise<Channel[]> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_ORIGIN_URL}/api/channel/list`
    );
    const data: ApiResponse<Channel[]> = await response.json();

    if (!data.success) {
        throw new Error(data.error || "Failed to fetch channels");
    }

    if (!data.data) {
        throw new Error("No channels data found");
    }
    return data.data;
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    let channels: Channel[] = [];
    let loading = true;

    try {
        channels = await fetchChannels();
        loading = false;
    } catch (error) {
        console.error("Error fetching channels:", error);
    }
    return (
        <html lang="en">
            <body>
                <Header channels={channels} loading={loading} />
                <div className="min-h-[80vh] max-w-[1000px] m-auto">
                    {children}
                </div>
                <Footer />
            </body>
        </html>
    );
}
