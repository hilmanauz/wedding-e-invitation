import moment from "moment";
import React from "react";
import { FlipCard } from "../flipcard/flipcard.component";
import { capitalize } from "lodash";

export function Countdown() {
    const [durations, setDurations] = React.useState({});
    React.useEffect(() => {
        let interval = setInterval(() => {
            const now = moment();
            const targetDate = moment({
                date: 29,
                year: 2024,
                month: 5,
                hours: 19,
                minute: 0,
                second: 0,
            });
            // @ts-ignore
            const duration = moment.duration(targetDate.diff(now));

            setDurations({
                hari: duration.days() > 0 ? duration.days() : 0,
                jam: duration.hours() > 0 ? duration.hours() : 0,
                menit: duration.minutes() > 0 ? duration.minutes() : 0,
                detik: duration.seconds() > 0 ? duration.seconds() : 0,
            });
        }, 1000);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, []);
    return (
        <div className="countdown">
            {Object.entries(durations).map(([key, value], idx) => (
                <div
                    className="count-item aos-init"
                    data-aos="fade-up"
                    data-aos-duration="1200"
                    data-aos-delay={`${idx * 100 + 100}`}
                    key={key}
                >
                    <FlipCard>{Number(value)}</FlipCard>
                    <small className="count-text">{capitalize(key)}</small>
                </div>
            ))}
        </div>
    );
}
