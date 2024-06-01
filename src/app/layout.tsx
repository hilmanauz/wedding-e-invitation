import type { Metadata } from "next";
// import { Cinzel, EB_Garamond } from "next/font/google";
import "../styles/global.css";
import "../styles/universal.css";
import "../styles/custom.css";
import "aos/dist/aos.css";
import DataProvider from "@/utlis/data-provider";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export const metadata: Metadata = {
    title: "Hasnaa & Hilman | HH Wedding",
    description: "29 Juni 2024",
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
                    <DataProvider>{children}</DataProvider>
                </MantineProvider>
            </body>
        </html>
    );
}
