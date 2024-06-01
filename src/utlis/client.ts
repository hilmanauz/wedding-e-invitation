import axios from "axios";

export const client = axios.create({
    baseURL: "https://noco.klabs.dev/api/v1/db/data/v1",
    headers: {
        "xc-token": "--E4LhvDKQe01TAMLscgS58LhMNueW3D_lqcuCAp",
    },
});
