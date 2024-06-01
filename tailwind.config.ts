import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                red: "hsl(345, 95%, 68%)",
                "red-shaded": "hsl(345,55%,55%)",
                white: "hsl(0, 0%, 100%)",
                "blue-gray": "hsl(237, 18%, 59%)",
                "blue-des": "hsl(236, 21%, 26%)",
                "blue-dark": "hsl(235, 16%, 14%)",
                "blue-black": "hsl(234, 17%, 12%)",
                purple: "hsl(271,23%,18%)",
            },
            fontSize: {
                "7.5xl": "5rem",
            },
            boxShadow: {
                "bold-bottom": "0 8px 3px -3px hsl(234, 17%, 12%)",
                "bold-bottom-lg": "0 12px 3px -3px hsl(234, 17%, 12%)",
            },
            animation: {
                flip: "flip 850ms cubic-bezier(1, 0.24, 0.65, 0.95) infinite",
            },
            keyframes: {
                flip: {
                    "0%": { transform: "rotateX(0)" },
                    "100%": { transform: "rotateX(-180deg)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
