import styles from "../CurrentDate/CurrentDate.module.css";

export default function CurrentDate() {
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const currentDate = new Date();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = currentDate.toLocaleString("default", { month: "long" });
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;

    return (
        <div className={styles.date}>  
            <h1>{dayOfWeek}</h1>
            <span>{formattedDate}</span>
        </div>
    );
}
