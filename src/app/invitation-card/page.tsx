"use client";
import { classNames } from "@/utlis/classNames";
import { client } from "@/utlis/client";
import { useDataContext } from "@/utlis/data-provider";
import { useQueryParams } from "@/utlis/query-params";
import Aos from "aos";
import React from "react";
import useSWR from "swr";
import { QRCodeSVG } from "qrcode.react";

export default function InvitationCard() {
    const [firstState, setFirstState] = React.useState(false);
    React.useEffect(() => {
        Aos.init();
        setFirstState(true);
    }, []);
    const { setQueryParams, queryParams, removeQueryParams } = useQueryParams<{
        to: string;
        showQR: boolean;
    }>();
    const { setData, data } = useDataContext();
    const {} = useSWR([queryParams.get("to")], async ([to]) => {
        const { data } = await client.get(
            `/Project/undangan?limit=25&offset=0&where=(Nama,eq,${to})`
        );
        setData(data.pageInfo.totalRows !== 0 ? data.list?.[0] : {});
        return data;
    });

    return (
        <section className="kat-page__side-to-side !h-screen">
            <section className="h-full w-full invitation-pane">
                <section className="protocol protocol-04 h-full w-full">
                    <div className="inner-invitation text-center flex flex-col">
                        <h1
                            className="save-date-title aos-init mb-5"
                            data-aos="zoom-in"
                            data-aos-duration="1000"
                        >
                            Invitation Card
                        </h1>
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
                                    <div className="icon-wrap">
                                        <QRCodeSVG
                                            value={`${
                                                process.env
                                                    .NEXT_PUBLIC_BASE_URL ||
                                                "http://localhost:3000"
                                            }/confirmation?to=${data?.Nama.split(
                                                " "
                                            ).join("%20")}`}
                                        />
                                    </div>
                                    <h4
                                        className="bank-account-number !text-sm flex flex-col !capitalize"
                                        data-copy="2880135476"
                                    >
                                        Kepada Yth.{" "}
                                        <span className="!text-base">
                                            {data?.Nama}
                                        </span>
                                    </h4>
                                </div>
                                <div
                                    className="quote-wrap !p-3 max-w-[250px] aos-init border-b border-b-yellow-700"
                                    data-aos="zoom-in"
                                    data-aos-duration="1000"
                                    data-aos-delay="150"
                                >
                                    <p className="quote-caption text-center !font-semibold">
                                        Mohon tunjukkan QR-code anda ke penerima
                                        tamu!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </section>
    );
}
