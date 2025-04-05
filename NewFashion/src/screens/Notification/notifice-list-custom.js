import React from "react";
import { View, Text, Image, SectionList, StyleSheet } from "react-native";
import moment from "moment";
import { groupNotificationsByDate } from "../../until/notifice-exchange-day";
import { getTimeAgoText } from "../../until/getDaysAgoNext";

const TYPE_NOTIFICATIONS = {
    order_update: "Thông báo đơn hàng"
};

const NotificationList = ({ notifications }) => {
    const groupedData = groupNotificationsByDate(notifications);

    const renderMessage = (message) => {
        return message.split(/(@[\w.]+)/g).map((part, index) => {
            if (part.startsWith("@")) {
                return <Text key={`${index} username`} style={styles.boldText}>{part.substring(1)}</Text>;
            }
            return part;
        });
    };


    return (
        <View style={styles.container}>
            <SectionList
                sections={groupedData}
                keyExtractor={(item) => item._id.toString()}
                renderSectionHeader={({ section }) => {
                    const index = groupedData.findIndex((s) => s.title === section.title);
                    return (
                        <Text style={[styles.header, index > 0 ? styles.borderTop : null]}>
                            {section.title}
                        </Text>
                    );
                }}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        {/* Avatar + Nội dung */}
                        <View style={styles.contentWrapper}>
                            <View style={{ position: "relative", paddingVertical: 10 }}>
                                <Image source={{ uri: item.image }} style={styles.avatar} />
                            </View>
                            <View style={styles.textWrapper}>
                                <Text style={{fontSize : 16,fontWeight : '800'}}>{TYPE_NOTIFICATIONS[item.type]}</Text>
                                <Text style={styles.message}>{renderMessage(item.message)}</Text>
                                <Text style={styles.time}>{getTimeAgoText(item.createdAt)}</Text>
                            </View>
                        </View>

                        {/* Hình ảnh thông báo */}
                        {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingBottom: 10 },

    header: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        color: "#333",
        paddingHorizontal: 15,
        paddingTop: 15,
    },

    borderTop: {
        borderTopWidth: 2,
        borderStyle: "dashed",
        borderTopColor: "#747474",
        marginTop: 10,
    },
    icon: {
        width: 20,
        position: "absolute",
        right: 12
    },
    icon_like: { height: 30, },
    item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomColor: "#b1b1b1",
    },

    contentWrapper: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 30,
    },

    textWrapper: {
        flex: 1,
        flexShrink: 1,
    },

    message: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
        flexWrap: "wrap",
    },

    boldText: {
        fontWeight: "bold",
        color: "#000",
    },

    time: {
        fontSize: 12,
        color: "gray",
        marginTop: 4,
    },

    image: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginLeft: 10,
    },
});

export default NotificationList;
