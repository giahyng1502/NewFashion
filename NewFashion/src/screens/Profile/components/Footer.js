import {Image, Text, View} from 'react-native';
import styles from '../styles';

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerWrapper}>
        <Image
          style={styles.icon}
          source={require(`../../../assets/icons/ic_lock.png`)}
        />
        <Text style={styles.footerText}>
          {'     '}
          New Fashion bảo vệ thông tin cá nhân của bạn và giữ cho nó riêng tư và
          an toàn.
        </Text>
      </View>
      <View style={styles.footerNotify}>
        <Text style={styles.footerNotifyTitle}>
          Cách chúng tôi sử dụng ảnh và tên cá nhân của bạn
        </Text>
        <Text style={styles.footerNotifyText}>
          Hình đại diện và tên người dùng của bạn có thể được hiển thị cho người
          khác khi bạn đánh giá một sản phẩm, thêm một mặt hàng vào giỏ hàng,
          tham gia một chương trình khuyến mãi hoặc sự kiện.
        </Text>
      </View>
    </View>
  );
}
