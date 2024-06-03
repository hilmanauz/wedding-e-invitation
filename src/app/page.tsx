"use client";
import Image from "next/image";
// importing aos
import AOS from "aos";
import React from "react";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { classNames } from "@/utlis/classNames";
import { ChatList, Countdown } from "@/comp";
import { useQueryParams } from "@/utlis/query-params";
import useSWR from "swr";
import { client } from "@/utlis/client";
import { useDataContext } from "@/utlis/data-provider";
import { ImNewTab } from "react-icons/im";

export default function Home() {
    const [opened, { open }] = useDisclosure();
    const [isHideTopCover, setIsHideTopCover] = React.useState(false);
    const [isMusicPlay, setIsMusicPlay] = React.useState(false);
    const { setData, data } = useDataContext();
    const [test, setTest] = React.useState(false);
    const { queryParams } = useQueryParams<{
        to: string;
        showQR: boolean;
    }>();
    const [audio, setAudio] = React.useState<Partial<HTMLAudioElement>>();
    const matches = useMediaQuery("(max-width: 960px)");
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            if (opened) {
                setIsHideTopCover(true);
            }
        }, 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, [opened]);

    React.useEffect(() => {
        if (matches === undefined) return;
        matches
            ? setTest(true)
            : AOS.init({
                  startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
                  initClassName: "aos-init", // class applied after initialization
                  animatedClassName: "aos-animate", // class applied on animation
                  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
                  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
                  debounceDelay: 0, // the delay on debounce used while resizing window (advanced)
                  throttleDelay: 0, // the delay on throttle used while scrolling the page (advanced)

                  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
                  offset: 10, // offset (in px) from the original trigger point
                  delay: 0, // values from 0 to 3000, with step 50ms
                  duration: 400, // values from 0 to 3000, with step 50ms
                  easing: "ease", // default easing for AOS animations
                  once: true, // whether animation should happen only once - while scrolling down
                  mirror: false, // whether elements should animate out while scrolling past them
                  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
              });
    }, [matches]);

    const {} = useSWR([queryParams.get("to")], async ([to]) => {
        const { data } = await client.get(
            `/Project/undangan?limit=25&offset=0&where=(Nama,eq,${to})`
        );
        setData(data.pageInfo.totalRows !== 0 ? data.list?.[0] : {});
        return data;
    });

    const [scrollDir, setScrollDir] = React.useState<"down" | "up">();

    React.useEffect(() => {
        if (!document) return;
        //@ts-ignore
        setAudio(document?.getElementById("audio"));
    }, []);
    console.log(audio);
    React.useEffect(() => {
        (async () => {
            if (audio) {
                if (isMusicPlay) {
                    await audio.play?.();
                } else {
                    audio.pause?.();
                }
            }
        })();
        return () => {};
    }, [isMusicPlay, audio]);

    React.useEffect(() => {
        window.history.scrollRestoration = "manual";
        window.scrollTo(0, 0);
        setScrollDir(undefined);
    }, []);

    React.useEffect(() => {
        const threshold = 0;
        let lastScrollY = window.pageYOffset;
        let ticking = false;

        const updateScrollDir = () => {
            const scrollY = window.pageYOffset;

            if (Math.abs(scrollY - lastScrollY) < threshold) {
                ticking = false;
                return;
            }
            const scroll = scrollY > lastScrollY ? "down" : "up";
            !scrollDir && scroll === "down" && setIsMusicPlay(true);
            setScrollDir(scroll);
            lastScrollY = scrollY > 0 ? scrollY : 0;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScrollDir);
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollDir]);

    return (
        <React.Fragment>
            <section className="kat-page__side-to-side">
                <section className="primary-pane">
                    <div className="inner">
                        <div className="ornaments-wrapper">
                            <div className="orn-primary-1">
                                <div
                                    className="image-wrap"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="500"
                                >
                                    <img
                                        src="/image/orn-tree-1.png"
                                        alt="Orn 1"
                                    />
                                </div>
                            </div>
                            <div className="orn-primary-2 left">
                                <div
                                    className="image-wrap"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="500"
                                >
                                    <img
                                        src="/image/orn-tree-5.png"
                                        alt="Orn 1"
                                    />
                                </div>
                            </div>
                            <div className="orn-primary-2 right">
                                <div
                                    className="image-wrap"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="500"
                                >
                                    <img
                                        src="/image/orn-tree-5.png"
                                        alt="Orn 1"
                                    />
                                </div>
                            </div>
                            <div className="orn-primary-3">
                                <div
                                    className="image-wrap"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="550"
                                >
                                    <img
                                        src="/image/orn-flower-7-min.png"
                                        alt="Orn 1"
                                    />
                                </div>
                            </div>
                            <div className="orn-primary-4">
                                <div
                                    className="image-wrap"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="600"
                                    style={{
                                        // @ts-ignore
                                        "--grass":
                                            "url('/image//orn-grass.png')",
                                    }}
                                >
                                    <img
                                        src="/image/orn-grass.png"
                                        alt="Orn 1"
                                    />
                                </div>
                            </div>
                            <div className="orn-primary-6">
                                <div
                                    className="image-wrap"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="700"
                                >
                                    <img
                                        src="/image/orn-bush-3.png"
                                        alt="Orn 1"
                                    />
                                </div>
                            </div>
                            <div className="orn-primary-5">
                                <div
                                    className="image-wrap"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="650"
                                >
                                    <img
                                        src="/image/orn-bush-1.png"
                                        alt="Orn 1"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="details">
                            <div
                                className="logo-wrap"
                                data-aos="fade-up"
                                data-aos-duration="1200"
                                data-aos-delay="300"
                            >
                                <img
                                    src="/image/HH1.png"
                                    alt=""
                                    className="logo"
                                />
                            </div>
                            <h1 data-aos="zoom-out" data-aos-duration="1200">
                                Hasnaa &amp; Hilman
                            </h1>
                        </div>
                        <div
                            className="highlight"
                            data-aos="zoom-out"
                            data-aos-duration="1000"
                        >
                            <div className="preview-container">
                                <img src="/image/bg-min.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="secondary-pane">
                    {!isHideTopCover && (
                        <section
                            className={classNames(
                                "top-cover",
                                opened && "hide"
                            )}
                        >
                            <div className="inner">
                                <div className="ornaments-wrapper">
                                    <div className="orn-tp">
                                        <div
                                            className={classNames(
                                                "image-wrap",
                                                test && "aos-init aos-animate"
                                            )}
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                            data-aos-delay="500"
                                        >
                                            <img
                                                src="/image/orn-tree-1.png"
                                                alt="Orn 1"
                                            />
                                        </div>
                                    </div>
                                    <div className="orn-tpc-1 left">
                                        <div
                                            className={classNames(
                                                "image-wrap",
                                                test && "aos-init aos-animate"
                                            )}
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                            data-aos-delay="500"
                                        >
                                            <img
                                                src="/image/orn-tree-5.png"
                                                alt="Orn 1"
                                            />
                                        </div>
                                    </div>
                                    <div className="orn-tpc-1 right">
                                        <div
                                            className={classNames(
                                                "image-wrap",
                                                test && "aos-init aos-animate"
                                            )}
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                            data-aos-delay="500"
                                        >
                                            <img
                                                src="/image/orn-tree-5.png"
                                                alt="Orn 1"
                                            />
                                        </div>
                                    </div>
                                    <div className="orn-tpc-2">
                                        <div
                                            className={classNames(
                                                "image-wrap",
                                                test && "aos-init aos-animate"
                                            )}
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                            data-aos-delay="550"
                                        >
                                            <img
                                                src="/image/orn-flower-7-min.png"
                                                alt="Orn 1"
                                            />
                                        </div>
                                    </div>
                                    <div className="orn-tpb-1">
                                        <div
                                            className={classNames(
                                                "image-wrap",
                                                test && "aos-init aos-animate"
                                            )}
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                            data-aos-delay="600"
                                            style={{
                                                // @ts-ignore
                                                "--grass":
                                                    "url('/image//orn-grass.png')",
                                            }}
                                        >
                                            <img
                                                src="/image/orn-grass.png"
                                                alt="Orn 1"
                                            />
                                        </div>
                                    </div>
                                    <div className="orn-tpb-3">
                                        <div
                                            className={classNames(
                                                "image-wrap",
                                                test && "aos-init aos-animate"
                                            )}
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                            data-aos-delay="700"
                                        >
                                            <img
                                                src="/image/orn-bush-3.png"
                                                alt="Orn 1"
                                            />
                                        </div>
                                    </div>
                                    <div className="orn-tpb-2">
                                        <div
                                            className={classNames(
                                                "image-wrap",
                                                test && "aos-init aos-animate"
                                            )}
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                            data-aos-delay="650"
                                        >
                                            <img
                                                src="/image/orn-bush-1.png"
                                                alt="Orn 1"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="head">
                                    <div
                                        className={classNames(
                                            "logo-wrap",
                                            test && "aos-init aos-animate"
                                        )}
                                        data-aos="fade-up"
                                        data-aos-duration="1200"
                                        data-aos-delay="300"
                                    >
                                        <img
                                            src="/image/HH1.png"
                                            alt=""
                                            className="logo"
                                        />
                                    </div>
                                    <h1
                                        data-aos="zoom-in"
                                        data-aos-duration="1200"
                                        data-aos-delay="700"
                                        className={classNames(
                                            test && "aos-init aos-animate"
                                        )}
                                    >
                                        Hasnaa &amp; Hilman
                                    </h1>
                                </div>
                                <div className="details">
                                    <div
                                        className={classNames(
                                            "link-wrap flex flex-col items-center gap-3",
                                            test && "aos-init aos-animate"
                                        )}
                                        data-aos="fade-up"
                                        data-aos-duration="1200"
                                        data-aos-delay="850"
                                    >
                                        <div className="py-3 w-[60%] bg-white bg-opacity-75 rounded-md">
                                            <p>Kepada Yth.</p>
                                            <p className="!font-bold text-pretty">
                                                {data?.Nama}
                                            </p>
                                        </div>
                                        <button
                                            className="link"
                                            id="startToExplore"
                                            onClick={() => {
                                                open();
                                                AOS.init({ once: true });
                                                setIsMusicPlay(true);
                                                document.body.style.overflow =
                                                    "visible";
                                            }}
                                        >
                                            Open Invitation
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                    <section className="cover">
                        <div className="cover-frame">
                            <div className="image-wrap">
                                <img src="/image/cover-frame-min.png" alt="" />
                            </div>
                        </div>
                        <div className="ornaments-wrapper">
                            <div className="orn-tree left">
                                <div
                                    className="image-wrap"
                                    data-aos="fade-left"
                                    data-aos-duration="1000"
                                    data-aos-delay="500"
                                >
                                    <img
                                        src="/image/orn-tree-1.png"
                                        alt="Orn 1"
                                    />
                                </div>
                            </div>
                            <div className="orn-tree right">
                                <div
                                    className="image-wrap"
                                    data-aos="fade-left"
                                    data-aos-duration="1000"
                                    data-aos-delay="500"
                                >
                                    <img
                                        src="/image/orn-tree-1.png"
                                        alt="Orn 1"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="inner">
                            {/* <div className="cover-frame">
                                <div className="image-wrap">
                                    <img
                                        src="/image/cover-frame-min.png"
                                        alt=""
                                    />
                                </div>
                            </div> */}
                            <div className="ornaments-wrapper">
                                <div className="orn-grass">
                                    <div
                                        className="image-wrap"
                                        data-aos="fade-up"
                                        data-aos-duration="1000"
                                        data-aos-delay="400"
                                        style={{
                                            // @ts-ignore
                                            "--grass":
                                                "url('/image//orn-grass.png')",
                                        }}
                                    >
                                        <img
                                            src="/image/orn-grass.png"
                                            alt="Orn 1"
                                        />
                                    </div>
                                </div>
                                <div className="orn-tree-1">
                                    <div
                                        className="image-wrap"
                                        data-aos="fade-up"
                                        data-aos-duration="1000"
                                        data-aos-delay="500"
                                    >
                                        <img
                                            src="/image/orn-tree-3.png"
                                            alt="Orn 1"
                                        />
                                    </div>
                                </div>
                                <div className="orn-tree-2">
                                    <div
                                        className="image-wrap"
                                        data-aos="fade-up"
                                        data-aos-duration="1000"
                                        data-aos-delay="500"
                                    >
                                        <img
                                            src="/image/orn-tree-4.png"
                                            alt="Orn 1"
                                        />
                                    </div>
                                </div>
                                <div className="orn-bush-1">
                                    <div
                                        className="image-wrap"
                                        data-aos="fade-up"
                                        data-aos-duration="1000"
                                        data-aos-delay="500"
                                    >
                                        <img
                                            src="/image/orn-bush-1.png"
                                            alt="Orn 1"
                                        />
                                    </div>
                                </div>
                                <div className="orn-bush-2">
                                    <div
                                        className="image-wrap"
                                        data-aos="fade-up"
                                        data-aos-duration="1000"
                                        data-aos-delay="500"
                                    >
                                        <img
                                            src="/image/orn-bush-3.png"
                                            alt="Orn 1"
                                        />
                                    </div>
                                </div>
                                <div className="orn-flower left">
                                    <div
                                        className="image-wrap"
                                        data-aos="zoom-in"
                                        data-aos-duration="1000"
                                        data-aos-delay="500"
                                    >
                                        <img
                                            src="/image/orn-flower-7-min.png"
                                            alt="Orn 1"
                                        />
                                    </div>
                                </div>
                                <div className="orn-flower right">
                                    <div
                                        className="image-wrap"
                                        data-aos="zoom-in"
                                        data-aos-duration="1000"
                                        data-aos-delay="500"
                                    >
                                        <img
                                            src="/image/orn-flower-7-min.png"
                                            alt="Orn 1"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="logo">
                                <div
                                    className="image-wrap"
                                    data-aos="zoom-out"
                                    data-aos-duration="1200"
                                    data-aos-delay="500"
                                >
                                    <img src="/image/HH2.png" alt="" />
                                </div>
                            </div>
                            <div className="head">
                                <p
                                    className="top-text"
                                    data-aos="fade-down"
                                    data-aos-duration="1000"
                                    data-aos-delay="150"
                                >
                                    The wedding of
                                </p>{" "}
                                <h1
                                    className="prime-title"
                                    data-aos="zoom-out"
                                    data-aos-duration="1000"
                                    data-aos-delay="200"
                                >
                                    Hasnaa
                                    <br />
                                    &
                                    <br />
                                    Hilman
                                </h1>
                                <p
                                    className="bottom-text"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="150"
                                >
                                    Join us in celebrating our love. Your
                                    presence would be truly cherished.
                                </p>{" "}
                            </div>
                            <div
                                className="foot"
                                data-aos="zoom-in-up"
                                data-aos-duration="1200"
                                data-aos-delay="500"
                            ></div>
                        </div>
                    </section>
                    <section className="couple-wrap">
                        <div className="couple">
                            <div className="couple-head">
                                <div
                                    className="image-wrap aos-init"
                                    data-aos="zoom-in"
                                    data-aos-duration="1000"
                                    data-aos-delay="600"
                                >
                                    <p
                                        className="couple-description aos-init !text-[#634a38] !text-[25px] md:!text-[30px]"
                                        data-aos="fade-up"
                                        data-aos-duration="1000"
                                    >
                                        ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ
                                        ٱللَّٰهِ وَبَرَكَاتُهُ
                                    </p>
                                </div>
                                <p
                                    className="couple-description aos-init"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                >
                                    Dengan memohon Rahmat dan Ridho Allah Azza
                                    Wa Jalla, tanpa mengurangi rasa hormat, kami
                                    mengundang Bapak/Ibu/Saudara/i untuk
                                    menghadiri acara pernikahan kami:
                                </p>{" "}
                            </div>
                            <div className="couple-body  bride-first   ">
                                <div className="couple-info groom">
                                    <div className="couple-preview ">
                                        <div className="couple-frame">
                                            <div
                                                className="couple-picture aos-init"
                                                data-aos="zoom-in-right"
                                                data-aos-duration="1500"
                                                data-aos-once="false"
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="couple-details">
                                        <div className="couple-small-details groom">
                                            <h2
                                                className="nick-name aos-init"
                                                data-aos="fade-up"
                                                data-aos-duration="1000"
                                            >
                                                Hilman
                                            </h2>
                                        </div>
                                        <p
                                            className="couple-name aos-init"
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                        >
                                            Hilman Auzan Mulyono
                                        </p>{" "}
                                        <p
                                            className="couple-parents aos-init bg-gradient-to-l from-slate-100 rounded-md"
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                        >
                                            Putra dari Bpk. S. Mulyono Subagya
                                            &amp; Ibu I.G.A.A.N Srilaksmi
                                        </p>
                                    </div>
                                    <div className="ornaments-wrapper">
                                        <div className="orn-couple-3">
                                            <div className="orn-couple-1">
                                                <div
                                                    className="image-wrap aos-init"
                                                    data-aos="fade-up-right"
                                                    data-aos-duration="1000"
                                                    data-aos-delay="500"
                                                >
                                                    <img
                                                        src="/image/orn-tree-5.png"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="orn-couple-2">
                                                <div
                                                    className="image-wrap aos-init"
                                                    data-aos="fade-up-right"
                                                    data-aos-duration="1000"
                                                    data-aos-delay="550"
                                                >
                                                    <img
                                                        src="/image/orn-tree-2.png"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="image-wrap aos-init"
                                                data-aos="fade-up-right"
                                                data-aos-duration="1000"
                                                data-aos-delay="600"
                                            >
                                                <img
                                                    src="/image/orn-flower-2-min.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="orn-edge-1">
                                            <div className="orn-edge-2">
                                                <div
                                                    className="image-wrap aos-init"
                                                    data-aos="fade-up-left"
                                                    data-aos-duration="1000"
                                                    data-aos-delay="850"
                                                >
                                                    <img
                                                        src="/image/orn-flower-1-min.png"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="image-wrap aos-init"
                                                data-aos="fade-up-left"
                                                data-aos-duration="1000"
                                                data-aos-delay="850"
                                            >
                                                <img
                                                    src="/image/orn-flower-8-min.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="separator-wrap">
                                    <div
                                        className="separator aos-init"
                                        data-aos="zoom-in"
                                        data-aos-duration="1500"
                                    >
                                        <h2 className="couple-separator">
                                            &amp;
                                        </h2>
                                    </div>
                                </div>
                                <div className="couple-info bride">
                                    <div className="couple-preview ">
                                        <div className="couple-frame">
                                            <div
                                                className="couple-picture aos-init"
                                                data-aos="zoom-in-right"
                                                data-aos-duration="1500"
                                                data-aos-once="false"
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="couple-details">
                                        <div className="couple-small-details bride">
                                            <h2
                                                className="nick-name aos-init"
                                                data-aos="fade-up"
                                                data-aos-duration="1000"
                                            >
                                                Hasnaa
                                            </h2>
                                        </div>
                                        <p
                                            className="couple-name aos-init"
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                        >
                                            Hasnaa Brilian Muslimah
                                        </p>{" "}
                                        <p
                                            className="couple-parents aos-init bg-gradient-to-r from-slate-100 rounded-md pl-3"
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                        >
                                            Putri dari Bpk. Djadono &amp; Ibu
                                            Fenny Widyaningrum
                                        </p>
                                    </div>
                                    <div className="ornaments-wrapper">
                                        <div className="orn-couple-3">
                                            <div className="orn-couple-1">
                                                <div
                                                    className="image-wrap aos-init"
                                                    data-aos="fade-up-right"
                                                    data-aos-duration="1000"
                                                    data-aos-delay="500"
                                                >
                                                    <img
                                                        src="/image/orn-tree-5.png"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="orn-couple-2">
                                                <div
                                                    className="image-wrap aos-init"
                                                    data-aos="fade-up-right"
                                                    data-aos-duration="1000"
                                                    data-aos-delay="550"
                                                >
                                                    <img
                                                        src="/image/orn-tree-2.png"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="image-wrap aos-init"
                                                data-aos="fade-up-right"
                                                data-aos-duration="1000"
                                                data-aos-delay="600"
                                            >
                                                <img
                                                    src="/image/orn-flower-2-min.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                        <div className="orn-edge-1">
                                            <div className="orn-edge-2">
                                                <div
                                                    className="image-wrap aos-init"
                                                    data-aos="fade-up-left"
                                                    data-aos-duration="1000"
                                                    data-aos-delay="850"
                                                >
                                                    <img
                                                        src="/image/orn-flower-1-min.png"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className="image-wrap aos-init"
                                                data-aos="fade-up-left"
                                                data-aos-duration="1000"
                                                data-aos-delay="850"
                                            >
                                                <img
                                                    src="/image/orn-flower-8-min.png"
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="agenda-wrap">
                        <div className="agenda-inner">
                            <div className="agenda-head">
                                <h2
                                    className="agenda-title aos-init !font-bold"
                                    data-aos="zoom-in"
                                    data-aos-duration="1500"
                                >
                                    Wedding Day
                                </h2>{" "}
                                {/* <p
                                    className="agenda-description aos-init"
                                    data-aos="fade-up"
                                    data-aos-duration="1200"
                                >
                                    Bersama-sama oleh dua keluarga, kami meminta
                                    kehormatan atas kehadiran Anda di perayaan
                                    hari pernikahan
                                </p>{" "} */}
                            </div>
                            <div className="agenda-body">
                                <div className="event-item">
                                    <div className="event-head">
                                        <div className="ornaments-wrapper">
                                            <div className="orn-event-top">
                                                <div
                                                    className="image-wrap aos-init"
                                                    data-aos="fade-right"
                                                    data-aos-duration="1000"
                                                    data-aos-delay="700"
                                                >
                                                    <img
                                                        src=" /image/orn-bird.png"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                        <h3
                                            className="event-day aos-init"
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                        >
                                            Sabtu,
                                        </h3>
                                        <h2
                                            className="event-date aos-init"
                                            data-aos="fade-up"
                                            data-aos-duration="1000"
                                        >
                                            29 Juni 2024
                                        </h2>
                                    </div>
                                    <div className="activity-wrap  same-location ">
                                        <div className="activity-item">
                                            <div className="activity-frame">
                                                <div
                                                    className="frame-wrap aos-init"
                                                    data-aos="zoom-in"
                                                    data-aos-duration="1000"
                                                    data-aos-delay="500"
                                                >
                                                    <img
                                                        src="/image/frame-odd-min.png"
                                                        alt=""
                                                        className=""
                                                        width="100"
                                                    />
                                                </div>
                                                <div className="ornaments-wrapper">
                                                    <div className="orn-event-1">
                                                        <div
                                                            className="image-wrap aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="550"
                                                        >
                                                            <img
                                                                src="/image/orn-flower-7-min.png"
                                                                alt=""
                                                                className=""
                                                                width="100"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="orn-event-2">
                                                        <div
                                                            className="image-wrap aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="600"
                                                        >
                                                            <img
                                                                src="/image/orn-flower-3-min.png"
                                                                alt=""
                                                                className=""
                                                                width="100"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="orn-event-3">
                                                        <div
                                                            className="image-wrap aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="650"
                                                        >
                                                            <img
                                                                src="/image/orn-tree-2.png"
                                                                alt=""
                                                                className=""
                                                                width="100"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="orn-event-4">
                                                        <div
                                                            className="image-wrap aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="700"
                                                        >
                                                            <img
                                                                src="/image/orn-bush-2.png"
                                                                alt=""
                                                                className=""
                                                                width="100"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="orn-event-5">
                                                        <div
                                                            className="image-wrap aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="700"
                                                        >
                                                            <img
                                                                src="/image/orn-grass.png"
                                                                alt=""
                                                                className=""
                                                                width="100"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="orn-event-6">
                                                        <div
                                                            className="image-wrap aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="750"
                                                        >
                                                            <img
                                                                src="/image/orn-flower-9-min.png"
                                                                alt=""
                                                                className=""
                                                                width="100"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="orn-event-7">
                                                        <div
                                                            className="image-wrap aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="800"
                                                        >
                                                            <img
                                                                src="/image/orn-peacock.png"
                                                                alt=""
                                                                className=""
                                                                width="100"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="activity-content">
                                                <div className="flex h-full items-center">
                                                    <div className="activity-head flex-auto w-full">
                                                        <img
                                                            src="/image/gold-01.png"
                                                            alt="Agenda Icon"
                                                            className="activity-icon aos-init"
                                                            data-aos="fade-up"
                                                            data-aos-duration="1000"
                                                        />
                                                        <h3
                                                            className="activity-title aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="450"
                                                            data-aos-anchor-placement="top-bottom"
                                                        >
                                                            Akad
                                                        </h3>
                                                        <p
                                                            className="activity-time aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="450"
                                                            data-aos-anchor-placement="top-bottom"
                                                        >
                                                            16:00 - 17:00
                                                        </p>
                                                    </div>
                                                    <div className="border-r-2 border-[#634a38] border-opacity-40 h-[100px]" />
                                                    <div className="activity-head flex-auto w-full">
                                                        <img
                                                            src="/image/gold-02.png"
                                                            alt="Agenda Icon"
                                                            className="activity-icon aos-init"
                                                            data-aos="fade-up"
                                                            data-aos-duration="1000"
                                                        />
                                                        <h3
                                                            className="activity-title aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="450"
                                                            data-aos-anchor-placement="top-bottom"
                                                        >
                                                            Resepsi
                                                        </h3>
                                                        <p
                                                            className="activity-time aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="450"
                                                            data-aos-anchor-placement="top-bottom"
                                                        >
                                                            19:00 - 21:00
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="event-details">
                                                    <p
                                                        className="event-hall aos-init"
                                                        data-aos="fade-up"
                                                        data-aos-duration="1000"
                                                        data-aos-delay="450"
                                                        data-aos-anchor-placement="top-bottom"
                                                    >
                                                        Galea Belangi
                                                    </p>
                                                    <p
                                                        className="event-address aos-init"
                                                        data-aos="fade-up"
                                                        data-aos-duration="1000"
                                                        data-aos-delay="450"
                                                        data-aos-anchor-placement="top-bottom"
                                                    >
                                                        Jl. Mabes 2 No.5,
                                                        RT.001/RW.006,
                                                        Jatimurni, Kec. Pondok
                                                        Melati, Kota Bekasi,
                                                        Jawa Barat 17431
                                                    </p>
                                                    <p
                                                        className="event-city aos-init"
                                                        data-aos="fade-up"
                                                        data-aos-duration="1000"
                                                        data-aos-delay="450"
                                                        data-aos-anchor-placement="top-bottom"
                                                    >
                                                        Kota Bekasi
                                                    </p>
                                                    <div
                                                        className="event-link-wrap aos-init"
                                                        data-aos="fade-up"
                                                        data-aos-duration="1000"
                                                        data-aos-delay="450"
                                                        data-aos-anchor-placement="top-bottom"
                                                    >
                                                        <a
                                                            href="https://maps.app.goo.gl/wVXz5cyZLcGLrkp78"
                                                            className="event-link"
                                                            target="_blank"
                                                        >
                                                            View Maps
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="gap" />
                                    <div className="event-head">
                                        <div className="circle" />
                                        <div className="divider-continue"></div>
                                        <div className="circle" />
                                    </div>
                                    <div className="activity-wrap  same-location ">
                                        <div className="activity-item">
                                            <div className="activity-frame">
                                                <div
                                                    className="frame-wrap aos-init"
                                                    data-aos="zoom-in"
                                                    data-aos-duration="1000"
                                                    data-aos-delay="500"
                                                >
                                                    <img
                                                        src="/image/frame-odd-min.png"
                                                        alt=""
                                                        className=""
                                                        width="100"
                                                    />
                                                </div>
                                                <div className="ornaments-wrapper">
                                                    <div className="orn-event-1">
                                                        <div
                                                            className="image-wrap aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="550"
                                                        >
                                                            <img
                                                                src="/image/orn-flower-7-min.png"
                                                                alt=""
                                                                className=""
                                                                width="100"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="orn-event-2">
                                                        <div
                                                            className="image-wrap aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="600"
                                                        >
                                                            <img
                                                                src="/image/orn-flower-3-min.png"
                                                                alt=""
                                                                className=""
                                                                width="100"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="orn-event-3">
                                                        <div
                                                            className="image-wrap aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="650"
                                                        >
                                                            <img
                                                                src="/image/orn-tree-2.png"
                                                                alt=""
                                                                className=""
                                                                width="100"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="orn-event-4">
                                                        <div
                                                            className="image-wrap aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="700"
                                                        >
                                                            <img
                                                                src="/image/orn-bush-2.png"
                                                                alt=""
                                                                className=""
                                                                width="100"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="orn-event-5">
                                                        <div
                                                            className="image-wrap aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="700"
                                                        >
                                                            <img
                                                                src="/image/orn-grass.png"
                                                                alt=""
                                                                className=""
                                                                width="100"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="orn-event-6">
                                                        <div
                                                            className="image-wrap aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="750"
                                                        >
                                                            <img
                                                                src="/image/orn-flower-9-min.png"
                                                                alt=""
                                                                className=""
                                                                width="100"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="orn-event-7">
                                                        <div
                                                            className="image-wrap aos-init"
                                                            data-aos="zoom-in"
                                                            data-aos-duration="1000"
                                                            data-aos-delay="800"
                                                        >
                                                            <img
                                                                src="/image/orn-peacock.png"
                                                                alt=""
                                                                className=""
                                                                width="100"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="activity-content">
                                                <div className="activity-head">
                                                    <img
                                                        src="/image/gold-02.png"
                                                        alt="Agenda Icon"
                                                        className="activity-icon aos-init"
                                                        data-aos="fade-up"
                                                        data-aos-duration="1000"
                                                    />
                                                    <h3
                                                        className="activity-title aos-init"
                                                        data-aos="zoom-in"
                                                        data-aos-duration="1000"
                                                        data-aos-delay="450"
                                                        data-aos-anchor-placement="top-bottom"
                                                    >
                                                        Wedding Reception
                                                    </h3>
                                                    <p
                                                        className="activity-time aos-init"
                                                        data-aos="zoom-in"
                                                        data-aos-duration="1000"
                                                        data-aos-delay="450"
                                                        data-aos-anchor-placement="top-bottom"
                                                    >
                                                        19:00 - 21:00
                                                    </p>
                                                </div>
                                                <div className="event-details">
                                                    <p
                                                        className="event-hall aos-init"
                                                        data-aos="fade-up"
                                                        data-aos-duration="1000"
                                                        data-aos-delay="450"
                                                        data-aos-anchor-placement="top-bottom"
                                                    >
                                                        Galea Belangi
                                                    </p>
                                                    <p
                                                        className="event-address aos-init"
                                                        data-aos="fade-up"
                                                        data-aos-duration="1000"
                                                        data-aos-delay="450"
                                                        data-aos-anchor-placement="top-bottom"
                                                    >
                                                        Jl. Mabes 2 No.5,
                                                        RT.001/RW.006,
                                                        Jatimurni, Kec. Pondok
                                                        Melati, Kota Bekasi,
                                                        Jawa Barat 17431
                                                    </p>
                                                    <p
                                                        className="event-city aos-init"
                                                        data-aos="fade-up"
                                                        data-aos-duration="1000"
                                                        data-aos-delay="450"
                                                        data-aos-anchor-placement="top-bottom"
                                                    >
                                                        Kota Bekasi
                                                    </p>
                                                    <div
                                                        className="event-link-wrap aos-init"
                                                        data-aos="fade-up"
                                                        data-aos-duration="1000"
                                                        data-aos-delay="450"
                                                        data-aos-anchor-placement="top-bottom"
                                                    >
                                                        <a
                                                            href="https://maps.app.goo.gl/wVXz5cyZLcGLrkp78"
                                                            className="event-link"
                                                            target="_blank"
                                                        >
                                                            View Maps
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="save-date-wrap">
                        <div
                            className="save-date aos-init"
                            data-aos="zoom-out"
                            data-aos-duration="1200"
                        >
                            <div className="ornaments-wrapper">
                                <div className="orn-savedate-1">
                                    <div
                                        className="image-wrap aos-init"
                                        data-aos="fade-right"
                                        data-aos-duration="1200"
                                        data-aos-delay="1200"
                                    >
                                        <img
                                            src="/image/orn-tree-6.png"
                                            alt="orn"
                                        />
                                    </div>
                                </div>
                                <div className="orn-savedate-2">
                                    <div
                                        className="image-wrap aos-init"
                                        data-aos="fade-right"
                                        data-aos-duration="1200"
                                        data-aos-delay="1200"
                                    >
                                        <img
                                            src="/image/orn-bird.png"
                                            alt="orn"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="save-date-body">
                                <h1
                                    className="save-date-title aos-init"
                                    data-aos="zoom-in"
                                    data-aos-duration="1000"
                                >
                                    Countdown
                                </h1>
                                <div
                                    className="save-date-box aos-init"
                                    data-aos="zoom-out"
                                    data-aos-duration="1200"
                                    data-aos-delay="200"
                                >
                                    <Countdown />
                                    <div
                                        className="add-to-calendar-wrap aos-init"
                                        data-aos="fade-up"
                                        data-aos-duration="1000"
                                        data-aos-delay="800"
                                    >
                                        <a
                                            className="add-to-calendar"
                                            href="https://calendar.app.google/gfp8xDN8VPpeZdVW9"
                                            target="_blank"
                                            rel="nofollow"
                                            id="addToCalendar"
                                        >
                                            Add to Calendar{" "}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="wedding-gift-wrap">
                        <div className="wedding-gift-inner">
                            <div
                                className="gift-frame aos-init"
                                data-aos="zoom-in"
                                data-aos-duration="1200"
                                data-aos-delay="700"
                            >
                                <div className="frame-wrap">
                                    <div
                                        className="frame-gift"
                                        id="trigger-orn"
                                    >
                                        <div className="orn-top-part">
                                            <div className="image-wrap">
                                                <img
                                                    src="/image/top-part.png"
                                                    alt="orn-gift"
                                                />
                                            </div>
                                        </div>
                                        <div className="orn-center-part">
                                            <div className="image-wrap">
                                                <img
                                                    src="/image/center-part.png"
                                                    alt="orn-gift"
                                                />
                                            </div>
                                        </div>
                                        <div className="orn-bottom-part">
                                            <div className="image-wrap">
                                                <img
                                                    src="/image/top-part.png"
                                                    alt="orn-gift"
                                                />
                                            </div>
                                        </div>
                                        <div className="ornaments-wrapper">
                                            <div className="orn-gift-4">
                                                <div
                                                    className="image-wrap aos-init"
                                                    data-aos="zoom-in"
                                                    data-aos-duration="1200"
                                                    data-aos-delay="500"
                                                    data-aos-anchor="#trigger-orn"
                                                >
                                                    <img
                                                        src="/image/orn-flower-5-min.png"
                                                        alt="orn-gift"
                                                    />
                                                </div>
                                            </div>
                                            <div className="orn-gift-5">
                                                <div
                                                    className="image-wrap aos-init"
                                                    data-aos="zoom-in"
                                                    data-aos-duration="1200"
                                                    data-aos-delay="550"
                                                    data-aos-anchor="#trigger-orn"
                                                >
                                                    <img
                                                        src="/image/orn-flower-11-min.png"
                                                        alt="orn-gift"
                                                    />
                                                </div>
                                            </div>
                                            <div className="orn-gift-6">
                                                <div
                                                    className="image-wrap aos-init"
                                                    data-aos="zoom-in"
                                                    data-aos-duration="1200"
                                                    data-aos-delay="600"
                                                    data-aos-anchor="#trigger-orn"
                                                >
                                                    <img
                                                        src="/image/orn-flower-10-min.png"
                                                        alt="orn-gift"
                                                    />
                                                </div>
                                            </div>
                                            <div className="orn-gift-7">
                                                <div
                                                    className="image-wrap aos-init"
                                                    data-aos="zoom-in"
                                                    data-aos-duration="1200"
                                                    data-aos-delay="600"
                                                    data-aos-anchor="#trigger-orn"
                                                >
                                                    <img
                                                        src="/image/orn-flower-4-min.png"
                                                        alt="orn-gift"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wedding-gift-head">
                                        <h1
                                            className="wedding-gift-title aos-init"
                                            data-aos="fade-up"
                                            data-aos-duration="1200"
                                        >
                                            Event Kit
                                        </h1>
                                        <p
                                            className="wedding-gift-description aos-init"
                                            data-aos="fade-up"
                                            data-aos-duration="1200"
                                        >
                                            Silakan klik fitur di bawah ini
                                            untuk memudahkan Anda dalam
                                            menikmati acara pernikahan kami!
                                        </p>
                                    </div>
                                    <div className="wedding-gift-body">
                                        <div className="wedding-gift-bank-wrap">
                                            <div
                                                data-aos="fade-up"
                                                data-aos-duration="1000"
                                                data-aos-delay="450"
                                                className="aos-init"
                                            >
                                                <div
                                                    className="bank-item"
                                                    id="savingBook6826"
                                                >
                                                    <div className="bank-detail">
                                                        <div
                                                            data-aos="fade-up"
                                                            data-aos-duration="1200"
                                                            className="aos-init"
                                                        >
                                                            <h4 className="bank-name">
                                                                Map Area
                                                            </h4>
                                                        </div>
                                                        <div
                                                            data-aos="fade-up"
                                                            data-aos-duration="1200"
                                                            className="aos-init"
                                                        >
                                                            <a
                                                                href="https://noco.klabs.dev/download/noco/Project/image/image/7B3yZEICnbuL8aHOni.pdf"
                                                                target="_blank"
                                                            >
                                                                <h4
                                                                    className="bank-account-number"
                                                                    data-copy="6030501053"
                                                                >
                                                                    Place Name
                                                                    <span>
                                                                        Jakarta
                                                                        Escape
                                                                        <i className="ph ph-copy-simple">
                                                                            <ImNewTab />
                                                                        </i>
                                                                    </span>
                                                                </h4>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                data-aos="fade-up"
                                                data-aos-duration="1000"
                                                data-aos-delay="450"
                                                className="aos-init"
                                            >
                                                <div
                                                    className="bank-item"
                                                    id="savingBook6825"
                                                >
                                                    <div className="bank-detail">
                                                        <div
                                                            data-aos="fade-up"
                                                            data-aos-duration="1200"
                                                            className="aos-init"
                                                        >
                                                            <h4 className="bank-name">
                                                                Entrance Barcode
                                                            </h4>
                                                        </div>
                                                        <div
                                                            data-aos="fade-up"
                                                            data-aos-duration="1200"
                                                            className="aos-init"
                                                        >
                                                            <a
                                                                href={`/invitation-card?to=${data?.Nama}`}
                                                                target="_blank"
                                                            >
                                                                <h4
                                                                    className="bank-account-number"
                                                                    data-copy="2880135476"
                                                                >
                                                                    Invitation
                                                                    Name
                                                                    <span>
                                                                        {
                                                                            data?.Nama
                                                                        }
                                                                        <i className="ph ph-copy-simple">
                                                                            <ImNewTab />
                                                                        </i>
                                                                    </span>
                                                                </h4>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ornaments-wrapper">
                                <div className="orn-gift-1">
                                    <div
                                        className="image-wrap aos-init"
                                        data-aos="zoom-in"
                                        data-aos-duration="1200"
                                        data-aos-delay="550"
                                        data-aos-anchor="#trigger-orn"
                                    >
                                        <img
                                            src="/image/orn-tree-5.png"
                                            alt="orn-gift"
                                        />
                                    </div>
                                </div>
                                <div className="orn-gift-2">
                                    <div
                                        className="image-wrap aos-init"
                                        data-aos="zoom-in"
                                        data-aos-duration="1200"
                                        data-aos-delay="500"
                                        data-aos-anchor="#trigger-orn"
                                    >
                                        <img
                                            src="/image/orn-tree-2.png"
                                            alt="orn-gift"
                                        />
                                    </div>
                                </div>
                                <div className="orn-gift-3">
                                    <div
                                        className="image-wrap aos-init"
                                        data-aos="zoom-in"
                                        data-aos-duration="1200"
                                        data-aos-delay="600"
                                        data-aos-anchor="#trigger-orn"
                                    >
                                        <img
                                            src="/image/orn-bird.png"
                                            alt="orn-gift"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <ChatList />
                    <section className="quote-wrap">
                        <div className="ornaments-wrapper">
                            <div className="orn-quotes-1">
                                <div
                                    className="image-wrap aos-init"
                                    data-aos="fade-left"
                                    data-aos-duration="1200"
                                    data-aos-delay="600"
                                >
                                    <img
                                        src="/image/orn-tree-1.png"
                                        alt="orn-gift"
                                    />
                                </div>
                            </div>
                            <div className="orn-quotes-2">
                                <div
                                    className="image-wrap aos-init"
                                    data-aos="fade-left"
                                    data-aos-duration="1200"
                                    data-aos-delay="600"
                                >
                                    <img
                                        src="/image/orn-tree-7.png"
                                        alt="orn-gift"
                                    />
                                </div>
                            </div>
                            <div className="orn-quotes-3">
                                <div
                                    className="image-wrap aos-init"
                                    data-aos="fade-left"
                                    data-aos-duration="1200"
                                    data-aos-delay="600"
                                >
                                    <img
                                        src="/image/orn-flower-6-min.png"
                                        alt="orn-gift"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="quote-inner">
                            <p
                                className="quote-caption aos-init"
                                data-aos="fade-up"
                                data-aos-duration="1200"
                            >
                                <span>(Quran 30:21)</span>
                            </p>
                            <p
                                className="quote-caption aos-init"
                                data-aos="fade-up"
                                data-aos-duration="1200"
                            >
                                {` "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri,`}
                                <br />
                                {`agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."`}
                                <br />
                                <br />
                                {`(Quran 30:21)`}
                            </p>
                        </div>
                    </section>
                    <section className="footnote-wrap">
                        <div className="ornaments-wrapper">
                            <div className="orn-fc-1 left">
                                <div
                                    className="image-wrap aos-init"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="500"
                                >
                                    <img
                                        src="/image/orn-tree-5.png"
                                        alt="Orn 1"
                                    />
                                </div>
                            </div>
                            <div className="orn-fc-1 right">
                                <div
                                    className="image-wrap aos-init"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="500"
                                >
                                    <img
                                        src="/image/orn-tree-5.png"
                                        alt="Orn 1"
                                    />
                                </div>
                            </div>
                            <div className="orn-fc-2">
                                <div
                                    className="image-wrap aos-init"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="500"
                                >
                                    <img
                                        src="/image/orn-flower-7-min.png"
                                        alt="Orn 1"
                                    />
                                </div>
                            </div>
                            <div className="orn-fb-1">
                                <div
                                    className="image-wrap aos-init"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="500"
                                    style={{
                                        // @ts-ignore
                                        "--grass":
                                            "url('/image//orn-grass.png')",
                                    }}
                                >
                                    <img
                                        src="/image/orn-grass.png"
                                        alt="Orn 1"
                                    />
                                </div>
                            </div>
                            <div className="orn-fb-2">
                                <div
                                    className="image-wrap aos-init"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="500"
                                >
                                    <img
                                        src="/image/orn-bush-1.png"
                                        alt="Orn 1"
                                    />
                                </div>
                            </div>
                            <div className="orn-fb-3">
                                <div
                                    className="image-wrap aos-init"
                                    data-aos="fade-up"
                                    data-aos-duration="1000"
                                    data-aos-delay="500"
                                >
                                    <img
                                        src="/image/orn-bush-3.png"
                                        alt="Orn 1"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="logo-wrap">
                            <div
                                className="image-wrap foot-logo aos-init"
                                data-aos="zoom-in"
                                data-aos-duration="1200"
                            >
                                <img src="/image/HH1.png" alt="" />
                            </div>
                        </div>
                        <div className="footnote">
                            <p
                                className="top-text aos-init"
                                data-aos="fade-up"
                                data-aos-duration="1200"
                                data-aos-delay="100"
                            >
                                جَزَاكُمُ اللهُ خَيْرًا كَثِيْرًا
                            </p>
                            <p
                                className="footnote-title aos-init"
                                data-aos="fade-up"
                                data-aos-duration="1200"
                                data-aos-delay="200"
                            >
                                Merupakan suatu kehormatan dan kebahagiaan bagi
                                kami apabila Bapak/Ibu/Saudara/i berkenan hadir
                                untuk memberikan doa restu kepada kami
                            </p>
                            <p
                                className="bottom-text aos-init"
                                data-aos="fade-up"
                                data-aos-duration="1200"
                                data-aos-delay="400"
                            >
                                وَالسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ
                                وَبَرَكَاتُهُ
                            </p>
                        </div>
                    </section>
                    <section className="footer">
                        <a href="https://github.com/hilmanauz" target="_blank">
                            <div className="footer-inner flex">
                                <p className="!mr-1 cursor-pointer">
                                    Made With{" "}
                                </p>
                                <img
                                    src="/image/love.gif"
                                    alt="Orn 1"
                                    className="!w-6 cursor-pointer"
                                />
                            </div>
                        </a>
                    </section>
                </section>
            </section>

            <section
                className="music-outer"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="300"
            >
                <div
                    className={classNames(
                        "music-box auto",
                        (scrollDir === "up" || !scrollDir) && "hide",
                        isMusicPlay && "playing"
                    )}
                    onClick={() => {
                        setIsMusicPlay(!isMusicPlay);
                    }}
                    id="music-box"
                ></div>
            </section>

            <div className="alert" id="alert">
                <div className="alert-text"></div>
                <div className="alert-close fas fa-times"></div>
            </div>
            <audio id="audio" loop>
                <source src="/nature.mp3" type="audio/mpeg" />
            </audio>
        </React.Fragment>
    );
}
