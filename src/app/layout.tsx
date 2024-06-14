import type { Metadata } from "next";
// import { Cinzel, EB_Garamond } from "next/font/google";
import "../styles/global.css";
import "../styles/universal.css";
import "../styles/custom.css";
import "aos/dist/aos.css";
import DataProvider from "@/utlis/data-provider";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";

export const metadata: Metadata = {
    title: "Hasnaa & Hilman | HH Wedding",
    description:
        "Hi, You're invited to our wedding ceremony - Hasnaa & Hilman Wedding - Saturday, June 29th 2024",
    openGraph: {
        type: "article",
        images: "https://noco.klabs.dev/download/noco/Project/image/image/xPAmYum1SIrz4WxvNp.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
            </head>
            <body className={`hasnaa-hilman`}>
                <MantineProvider>
                    <Notifications />
                    <DataProvider>{children}</DataProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
