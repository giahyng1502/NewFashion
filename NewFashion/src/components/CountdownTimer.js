import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const CountdownTimer = ({ expire, onExpire }) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [expired, setExpired] = useState(false); // Trạng thái kiểm tra đã hết thời gian

    useEffect(() => {
        // Hàm tính toán thời gian còn lại
        const calculateTimeLeft = () => {
            const now = new Date();
            const expireTime = new Date(expire);
            const difference = expireTime - now;

            if (difference > 0) {
                const hours = Math.floor(difference / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeLeft({ hours, minutes, seconds });
            } else {
                // Nếu đã hết thời gian
                setExpired(true); // Đánh dấu trạng thái hết thời gian
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                if (onExpire) {
                    onExpire(); // Gọi callback khi hết thời gian nếu có
                }
            }
        };

        // Tính toán ban đầu
        calculateTimeLeft();

        // Cập nhật mỗi giây
        const timer = setInterval(() => {
            calculateTimeLeft();
        }, 1000);

        // Clear interval khi component bị huỷ
        return () => clearInterval(timer);
    }, [expire]);

    if (expired) {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: 'semibold', padding: 10 }}>
                Khuyến mại chớp nhoáng đã kết thúc
                </Text>
            </View>
        );
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'semibold', padding: 10 }}>
            Kết thúc trong
            </Text>

            {/* Hiển thị thời gian đếm ngược với 3 ô */}
            <View style={{ flexDirection: 'row' }}>
                <View style={{ backgroundColor: 'black', borderRadius: 5, padding: 5 }}>
                    <Text style={{ color: 'white', fontSize: 12 }}>{timeLeft.hours.toString().padStart(2, '0')}</Text>
                </View>
                <View style={{ padding: 5 }}>
                    <Text style={{ color: 'white', fontSize: 12 }}>:</Text>
                </View>
                <View style={{ backgroundColor: 'black', borderRadius: 5, padding: 5 }}>
                    <Text style={{ color: 'white', fontSize: 12 }}>{timeLeft.minutes.toString().padStart(2, '0')}</Text>
                </View>
                <View style={{ padding: 5 }}>
                    <Text style={{ color: 'white', fontSize: 12 }}>:</Text>
                </View>
                <View style={{ backgroundColor: 'black', borderRadius: 5, padding: 5 }}>
                    <Text style={{ color: 'white', fontSize: 12 }}>{timeLeft.seconds.toString().padStart(2, '0')}</Text>
                </View>
            </View>
        </View>
    );
};



export default CountdownTimer;
