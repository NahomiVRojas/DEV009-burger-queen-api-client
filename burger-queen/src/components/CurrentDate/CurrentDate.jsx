import { useState } from "react";
import style from "../CurrentDate/CurrentDate.module.css";

export default function CurrentDate() {
    const [currentDate] = useState(new Date());

    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = currentDate.toLocaleString("default", { month: "long" });
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();

    const formattedDate = `${month} ${day}, ${year}`;

    return (
        <div className={style.date}>  
            <h2>{dayOfWeek}</h2>
            <p>{formattedDate}</p>
        </div>
    );
}