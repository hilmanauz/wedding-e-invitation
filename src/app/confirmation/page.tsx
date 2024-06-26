"use client";
import { classNames } from "@/utlis/classNames";
import { useQueryParams } from "@/utlis/query-params";
import { LoadingOverlay } from "@mantine/core";
import Aos from "aos";
import axios from "axios";
import React from "react";
import useSWR from "swr";

export default function Confirmation() {
    const [firstState, setFirstState] = React.useState(false);
    const [messageStatus, setMessageStatus] = React.useState<any>();
    React.useEffect(() => {
        Aos.init();
        setFirstState(true);
    }, []);
    const { queryParams, removeQueryParams } = useQueryParams<{
        to: string;
        showQR: boolean;
        "xc-token": string;
    }>();
    const xcToken = queryParams.get("xc-token");
    const [xcTokenStorage, setXcStorage] = React.useState<string | null>();
    React.useEffect(() => {
        localStorage && setXcStorage(localStorage?.getItem("xc-token"));
        if (xcToken) {
            localStorage.setItem("xc-token", xcToken);
            removeQueryParams(["xc-token"]);
            setMessageStatus("You're an admin!");
        }
    }, [removeQueryParams, xcToken]);
    const { error, data } = useSWR(
        [queryParams.get("to"), xcTokenStorage],
        async ([to, token]) => {
            if (!token) return;
            const { data } = await axios.get(
                `https://noco.klabs.dev/api/v1/db/data/v1/Project/Undangan?limit=25&offset=0&where=(Nama,eq,${to})`,
                {
                    headers: {
                        "xc-token": token,
                    },
                }
            );
            return data.pageInfo.totalRows !== 0 ? data.list?.[0] : {};
        }
    );

    const { isLoading } = useSWR(
        [data, xcTokenStorage],
        async ([data, token]) => {
            if (!data) return;
            await axios.patch(
                `https://noco.klabs.dev/api/v1/db/data/v1/Project/Undangan/${data.Id}`,
                {
                    Absensi: true,
                },
                {
                    headers: {
                        "xc-token": token,
                    },
                }
            );
            setMessageStatus(
                <React.Fragment>
                    Thanks <br />
                    <p className="!text-lg">{data.Nama}</p> <br /> for
                    confirmation attendant!
                </React.Fragment>
            );
        }
    );

    return (
        <section className="kat-page__side-to-side !h-screen">
            <section className="h-full w-full invitation-pane">
                <section className="protocol protocol-04 h-full w-full">
                    <div className="inner-invitation text-center flex flex-col">
                        <div className="flex-auto">
                            <div className="ornaments-wrapper">
                                <div className="protocol-frame">
                                    <div
                                        className="image-wrap aos-init"
                                        data-aos="zoom-in"
                                        data-aos-duration="1000"
                                        data-aos-delay="500"
                                    >
                                        <img
                                            src="/image/prokes-frame-min.png"
                                            alt=""
                                        />
                                    </div>
                                    <div className="orn-prokes-top tr-1">
                                        <div
                                            className="image-wrap aos-init"
                                            data-aos="zoom-in"
                                            data-aos-duration="1000"
                                            data-aos-delay="500"
                                        >
                                            <img
                                                src="/image/Orn-14-min.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="orn-prokes-top tr-2">
                                        <div
                                            className="image-wrap aos-init"
                                            data-aos="zoom-in"
                                            data-aos-duration="1000"
                                            data-aos-delay="500"
                                        >
                                            <img
                                                src="/image/Orn-04-min.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="orn-prokes-top tr-3">
                                        <div
                                            className="image-wrap aos-init"
                                            data-aos="zoom-in"
                                            data-aos-duration="1000"
                                            data-aos-delay="500"
                                        >
                                            <img
                                                src="/image/Orn-05-min.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="orn-prokes-bottom bl-1">
                                        <div
                                            className={classNames(
                                                firstState && "aos-animate",
                                                "image-wrap"
                                            )}
                                            data-aos="zoom-in"
                                            data-aos-duration="1000"
                                            data-aos-delay="500"
                                        >
                                            <img
                                                src="/image/Orn-14-min.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="orn-prokes-bottom bl-2">
                                        <div
                                            className={classNames(
                                                firstState && "aos-animate",
                                                "image-wrap"
                                            )}
                                            data-aos="zoom-in"
                                            data-aos-duration="1000"
                                            data-aos-delay="500"
                                        >
                                            <img
                                                src="/image/Orn-04-min.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                    <div className="orn-prokes-bottom bl-3">
                                        <div
                                            className={classNames(
                                                firstState && "aos-animate",
                                                "image-wrap"
                                            )}
                                            data-aos="zoom-in"
                                            data-aos-duration="1000"
                                            data-aos-delay="500"
                                        >
                                            <img
                                                src="/image/Orn-05-min.png"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="protocol-item-wrap flex-auto h-full flex flex-col items-center">
                                <div
                                    className="protocol-item aos-init !pb-2"
                                    data-aos="zoom-in"
                                    data-aos-duration="1000"
                                    data-aos-delay="150"
                                >
                                    <div className="icon-wrap !justify-center relative">
                                        {isLoading ? (
                                            <LoadingOverlay />
                                        ) : (
                                            <h4
                                                className="!text-lg flex flex-col !capitalize"
                                                data-copy="2880135476"
                                            >
                                                {error
                                                    ? error?.message
                                                    : messageStatus}
                                            </h4>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    );
}
