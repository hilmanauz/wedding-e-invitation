import axios from "axios";

export const client = axios.create({
    baseURL: "https://noco.klabs.dev/api/v1/db/data/v1",
    headers: {
        "xc-token": process.env.NEXT_PUBLIC_XC_TOKEN,
    },
});
