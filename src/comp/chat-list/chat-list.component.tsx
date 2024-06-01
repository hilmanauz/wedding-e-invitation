import { client } from "@/utlis/client";
import { useDataContext } from "@/utlis/data-provider";
import { Group, Radio } from "@mantine/core";
import moment from "moment";
import React from "react";
import { useForm } from "react-hook-form";
import { AiFillCloseSquare } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { FaMinusSquare } from "react-icons/fa";
import { FaSquareCheck, FaSquareXmark } from "react-icons/fa6";
import useSWR from "swr";

const limit = 10;

export function ChatList() {
    const [submitLoading, setSubmitLoading] = React.useState(false);
    const [moreLoading, setMoreLoading] = React.useState(false);
    const [value, setValue] = React.useState<string>("Bersedia Hadir");
    const [comments, setComments] = React.useState<Array<any>>([]);
    const [pagination, setPagination] = React.useState(0);
    const { setData, data: AccountData } = useDataContext();
    const { data, mutate } = useSWR(
        [pagination, limit],
        async ([pagination, limit]) => {
            if (pagination) setMoreLoading(true);
            const { data } = await client.get(
                `/Project/chat?limit=${limit}&sort=-CreatedAt&offset=${
                    pagination * limit === 0
                        ? pagination * limit
                        : pagination * limit + 1
                }`
            );
            setComments(!pagination ? data.list : [...comments, ...data.list]);
            setMoreLoading(false);
            return data;
        },
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        }
    );
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = async (formData: Record<string, any>) => {
        setSubmitLoading(true);
        try {
            await client.post(`/Project/chat`, {
                ...formData,
                rencana_hadir: value,
                undangan_id: AccountData?.Id,
            });
            setPagination(0);
            await mutate();
            reset({
                nama: "",
                ucapan: "",
            });
            setValue("Bersedia Hadir");
            setSubmitLoading(false);
        } catch (error) {
            setSubmitLoading(false);
        }
    };
    const handleMoreComment = async () => {
        setPagination(pagination + 1);
    };
    return (
        <section className="wedding-wish-wrap" data-template="">
            <div className="wedding-wish-inner">
                <div className="wedding-wish-head">
                    <h1
                        className="wedding-wish-title aos-init"
                        data-aos="fade-up"
                        data-aos-duration="1200"
                    >
                        Wedding Wish
                    </h1>
                    <p
                        className="wedding-wish-description aos-init"
                        data-aos="fade-up"
                        data-aos-duration="1200"
                        data-aos-delay="200"
                    >
                        Wishing us Sakinah, Mawaddah, Warahmah . . .
                    </p>{" "}
                </div>
                <div className="wedding-wish-body">
                    <div className="wedding-wish-form">
                        <form
                            id="weddingWishForm"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div
                                className="form-group guest-name-wrap aos-init"
                                data-aos="fade-up"
                                data-aos-duration="1200"
                                data-aos-delay="200"
                            >
                                <input
                                    type="text"
                                    className="form-control guest-name"
                                    placeholder="Nama"
                                    {...register("nama", { required: true })}
                                />
                            </div>
                            <div
                                className="form-group guest-comment-wrap aos-init"
                                data-aos="fade-up"
                                data-aos-duration="1200"
                                data-aos-delay="300"
                            >
                                <textarea
                                    className="form-control guest-comment"
                                    placeholder="Berikan ucapan"
                                    {...register("ucapan", { required: true })}
                                ></textarea>
                            </div>
                            <div
                                className="form-group guest-comment-wrap aos-init"
                                data-aos="fade-up"
                                data-aos-duration="1200"
                                data-aos-delay="300"
                            >
                                <Radio.Group
                                    className="form-group guest-comment-wrap aos-init"
                                    data-aos="fade-up"
                                    data-aos-duration="1200"
                                    data-aos-delay="300"
                                    value={value}
                                    onChange={setValue}
                                >
                                    <Group mt="xs">
                                        <Radio
                                            value="Bersedia Hadir"
                                            size="xs"
                                            checked={value === "Bersedia Hadir"}
                                            label={
                                                <label
                                                    className="flex items-center gap-1"
                                                    onClick={() =>
                                                        setValue(
                                                            "Bersedia Hadir"
                                                        )
                                                    }
                                                >
                                                    {"Bersedia Hadir"}{" "}
                                                    <FaSquareCheck color="green" />
                                                </label>
                                            }
                                            className="form-control guest-comment w-fit"
                                        />
                                        <Radio
                                            value="Mungkin Hadir"
                                            label={
                                                <label
                                                    className="flex items-center gap-1"
                                                    onClick={() =>
                                                        setValue(
                                                            "Mungkin Hadir"
                                                        )
                                                    }
                                                >
                                                    {"Mungkin Hadir"}{" "}
                                                    <FaMinusSquare color="orange" />
                                                </label>
                                            }
                                            checked={value === "Mungkin Hadir"}
                                            size="xs"
                                            className="form-control guest-comment w-fit"
                                        />
                                        <Radio
                                            value="Tidak Bisa Hadir"
                                            checked={
                                                value === "Tidak Bisa Hadir"
                                            }
                                            label={
                                                <label
                                                    className="flex items-center gap-1"
                                                    onClick={() =>
                                                        setValue(
                                                            "Tidak Bisa Hadir"
                                                        )
                                                    }
                                                >
                                                    {"Tidak Bisa Hadir"}{" "}
                                                    <FaSquareXmark color="red" />
                                                </label>
                                            }
                                            size="xs"
                                            className="form-control guest-comment w-fit"
                                        />
                                    </Group>
                                </Radio.Group>
                            </div>
                            <div
                                className="submit-comment-wrap aos-init"
                                data-aos="fade-up"
                                data-aos-duration="1200"
                                data-aos-delay="400"
                            >
                                <button
                                    type="submit"
                                    className="submit submit-comment !flex justify-center items-center gap-2"
                                    data-last=""
                                >
                                    {submitLoading ? (
                                        <React.Fragment>
                                            <div className="animate-spin">
                                                <BiLoaderCircle />
                                            </div>
                                            Loading
                                        </React.Fragment>
                                    ) : (
                                        "Send Wedding Wish"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="comment-wrap show">
                        {comments?.map(
                            (item: {
                                Id: number;
                                nama: string;
                                CreatedAt: string;
                                ucapan: string;
                                rencana_hadir:
                                    | "Bersedia Hadir"
                                    | "Mungkin Hadir"
                                    | "Tidak Bisa Hadir";
                            }) => (
                                <div
                                    key={item.Id}
                                    className="comment-item aos-init w-fit"
                                    id="comment0"
                                    data-aos="fade-up"
                                    data-aos-duration="1200"
                                >
                                    <div className="comment-head">
                                        <h3 className="comment-name !capitalize flex items-baseline gap-1.5">
                                            {item.nama}{" "}
                                            {item.rencana_hadir ===
                                            "Bersedia Hadir" ? (
                                                <FaSquareCheck
                                                    color="green"
                                                    size={13}
                                                />
                                            ) : item.rencana_hadir ===
                                              "Mungkin Hadir" ? (
                                                <FaMinusSquare
                                                    color="orange"
                                                    size={13}
                                                />
                                            ) : item.rencana_hadir ===
                                              "Tidak Bisa Hadir" ? (
                                                <FaSquareXmark
                                                    color="red"
                                                    size={13}
                                                />
                                            ) : undefined}
                                        </h3>
                                        <small className="comment-date">
                                            {moment(item.CreatedAt).format(
                                                "DD MMM YYYY, hh:mm"
                                            )}
                                        </small>
                                    </div>
                                    <div className="comment-body mb-3">
                                        <p className="comment-caption">
                                            {item.ucapan}
                                        </p>
                                    </div>
                                    <div className="border-b border-b-amber-600 border-opacity-40" />
                                </div>
                            )
                        )}
                    </div>
                    {data?.pageInfo.totalRows > (pagination + 1) * limit && (
                        <div
                            className="more-comment-wrap aos-init show"
                            data-aos="fade-up"
                            data-aos-duration="1200"
                        >
                            <button
                                type="button"
                                id="moreComment"
                                className="!flex justify-center items-center gap-2"
                                data-template=""
                                data-start="0"
                                data-load-text="Loading"
                                onClick={handleMoreComment}
                            >
                                {moreLoading ? (
                                    <React.Fragment>
                                        <div className="animate-spin">
                                            <BiLoaderCircle />
                                        </div>
                                        Loading
                                    </React.Fragment>
                                ) : (
                                    "Show more comments"
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
