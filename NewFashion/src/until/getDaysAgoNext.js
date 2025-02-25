import moment from "moment";

export const getTimeAgoText = (timestamp) => {
    const now = moment();
    const time = moment(timestamp);

    const diffMinutes = now.diff(time, "minutes");
    const diffHours = now.diff(time, "hours");
    const diffDays = now.diff(time, "days");
    const diffMonths = now.diff(time, "months");
    const diffYears = now.diff(time, "years");

    if (diffMinutes < 1) return "Vừa xong";
    if (diffMinutes < 60) return `${diffMinutes} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 30) return `${diffDays} ngày trước`;
    if (diffMonths < 12) return `${diffMonths} tháng trước`;

    return `${diffYears} năm trước`;
};
