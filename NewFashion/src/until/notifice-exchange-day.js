import moment from "moment";
import "moment/locale/vi"; // Hiển thị tiếng Việt

export const groupNotificationsByDate = (notifications) => {
    const today = moment().startOf("day");
    const grouped = {};

    notifications.forEach((item) => {
        const date = moment(item.createdAt).startOf("day");
        let title;

        if (date.isSame(today, "day")) {
            title = "Hôm nay";
        } else if (date.isSame(today.clone().subtract(1, "day"), "day")) {
            title = "Hôm qua";
        } else if (date.isSame(today.clone().subtract(2, "day"), "day")) {
            title = "Hôm kia";
        } else if (date.isSameOrAfter(today.clone().subtract(6, "days"), "day")) {
            title = "Tuần này";
        }
        else {
            title = date.format("DD/MM/YYYY");
        }

        if (!grouped[title]) {
            grouped[title] = [];
        }
        grouped[title].push(item);
    });

    return Object.entries(grouped).map(([title, data], index) => ({
        title,
        data,
        key: `${title}-${index}`,
    }));
};
