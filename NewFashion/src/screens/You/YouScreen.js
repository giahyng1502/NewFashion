import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import BenefitsInfoBox from '../../components/BenefitsInfoBox';
import FilledButton from '../../components/FilledButton';
import ProductCard from '../../components/ProductCard';
import AppManager from '../../utils/AppManager'
import { useSelector } from 'react-redux';

const browsingHistory = [
  {
    id: '1',
    image:
      'https://s3-alpha-sig.figma.com/img/4e98/161c/44889ce383fe72daa63daf3046238fe5?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=R9jCeHrJ2AcBylbzaG1BxXuPzuEdQbbWluD6UitzRT~v1kfTr32BYX3x6d6Gx~fq~Vg7fqk9to1pm4CE1gxig72SwrxzLnJPlYiT4dvxS~01b8bSxlk3hXQtIJybWxAfwst7Y5qFAfO~blkA1rzR4mnAwVHOjj3uTGP4rQnXRdVwr0IdmZKbBjyBQW9LBxj1MXysIs3C2alVegyryv9vazr6rv3vs9GdWgDbOiB5ECOW7U5LgX4MwlzdNajULXj6S0t57DL7OcegGavYPBYAcKpYNQF9pKelmynb36zdpiJZ82cuy4G6wh~ZqmpOh1BjNT5aZNOesRRel0CoAUMMWw__',
    title: 'Embroidered Wool-blend Scarf Jacket',
    price: '304.568đ',
    rating: 4.5,
    sold: '831 sold',
    almostSoldOut: true,
  },
  {
    id: '2',
    image:
      'https://s3-alpha-sig.figma.com/img/2cb2/2cb9/0b8b0b7e8d2c451d364a9cd9989daa2b?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MxUbCT~pKt~bzjJXTxOSdWg5~Id7~Axc0j1hwi00ShfmBMtCAMLSwb-V0EqGdDLX1VCwFzTwANx9bCqbYYyBx-aWdNfJo3YnTxaSJIuoY3hHdb4AsXKsSz6Uc3eRZCSwVC8etcVMrgehDfw3wyEYyRIQD9qbj9wpLe-RphjbRw13qD9xTIVvDJmaAj~9pxT~zegmA83tuF9oXpg~FDjjqEdLhfrnxTEWnGrWy8JieNcQP8Ieu9Vc0OXLgadNkXwxpFRE~JxNMgST8E6~NhvHrvRQjQ1JAf1IY9uZS7mlnTCI7p~RtBFtmb4K8A7hXRgqqGCSWARFJgDUhY7-TW6D-A__',
    title: 'Unisex Herringbone Black Cat Sweater',
    price: '153.229đ',
    rating: 4.3,
    sold: '8,1k+ sold',
    almostSoldOut: true,
  },
  {
    id: '3',
    image:
      'https://s3-alpha-sig.figma.com/img/892a/3ca0/8ed46d4501c5e0d775fe4d013edb9085?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lmpaoUFuLh35eiboH7yOY-TlPT3wqCYfl2T-Sa51vxbnEUmfivu4LFdVcuVu95vm-ywDI37UAnSGe1zOAUPSEzZlt6UV2yRNFMpYJUn1vYHDX8QBEPI4sUXuJhrZunJwEJ48hwk0XgVmtqALgt~EpW~qavpKaEFyJp9vrOeIRw29sywv0OiIlYbLuIsTRiiLUl-TmTdKrw5GzeMNYVyQvY12sCEhup8nR2xcetDspcbQ7PqMuldlK5m4YpoYLVDnR2BlBID5W1zKsi8kXWFchEHhGYPfoBIjJzh7og1bRtSrJAnukxFK1hknAImgYeEEEdWoapQWhGk~zRfwgTi5mA__',
    title: "Women's High-waisted Skinny Jeans",
    price: '337.008đ',
    rating: 4.6,
    sold: '2,5k+ sold',
    almostSoldOut: true,
  },
  {
    id: '4',
    image:
      'https://s3-alpha-sig.figma.com/img/72f7/b8b0/e25fdd35257029d4b6cd268bc6f370b4?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TdnCG7V3T~d5Gt2ASm2-pOcy6a39bFWuujLOBlo~31UTwV7eycPmfbOJTLB1hXaOI6UOZUwMBFEE2GMn3QlP3zjuoWOjOxX3X5-xbXkHH3n5c0OWPTSZeS64JrWUe~C3Itper3Sw8TgR4ywN0KlASznAJbq9ncxT4I1zQOqYGN-bvihHXMqtPaBfHKh9nXXeGWNKuLG7bAkVOu46XtHmp3eUps0qvVYIGv-w1ScY0cNclNmEj-W2sw6BrhJ2gUWfP33fRyH8aJ7-r2UqMHA1E9IJ61XLJztxeRiecSlU~hdX5wHqKdSf~Gl75qN1GxHJM~dNln8FLmf2oWODjoAoYA__',
    title: "Women's Long Skirt With Butterfly Slit",
    price: '282.459đ',
    rating: 4.7,
    sold: '4,2k+ sold',
    almostSoldOut: true,
  },
  {
    id: '5',
    image:
      'https://s3-alpha-sig.figma.com/img/82ec/e82c/0efa1df3f41ce0bafa2cd02b7871d6b7?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=pwIzqRZ2psvHLK-LXGZ5IrUcBsFrVxPEEBfWd-u~gYqUCvkKTQundeC9G15jR90KA7CICMbNEctyFx1oHWIB6i2uigPU0y5A0JSiJ985o3UQtSHr5h2cx6PGMvUeH64n-VJzQc3uyGDhnZukCq7cjLP4a1FUIjxbXlX-cjA5Ijkvc0uAQxwy6iSi7dXjbaN4eahZMHyFjaJo7bxv0KLylmNvm9FYoOda9WGPWvIjSqKUn~tn9CWWFLED43hTAIf8ZC9qda~M6AKj8WVwgfQtQ7VWMnIm-HWxc1qtDAv3HVg0QALC7AXlqe3u4kzoOAnEDfzqjpeU6eTJ9KdFLK1QUA__',
    title: "Women's Long Skirt With Butterfly Slit",
    price: '282.459đ',
    rating: 4.7,
    sold: '4,2k+ sold',
    almostSoldOut: true,
  },
  {
    id: '6',
    image:
      'https://s3-alpha-sig.figma.com/img/5409/bec0/1345f65ce96449305337b76b033dc4a8?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CLmcQfzKQQ4FzjV-VL7p0aSSOBKtVLO~M8JkuU46v~cliVtd0gUEfkOwTU5aqd0DZpcHwLbOOD2VVdCxtLO8zOmOlm4Y9Cb4cVAczq0X-p4OhzeeE9ZCCTs9nuCDUuznOdlkw35NbUwd670b2lztiBA0UZ6oY7AOghQe476-JcqLxz5dGbRgwTI5Vt7kQ9W5AyprHnFrorHs0DEZ6o4xAV0FD9cv~3WZ~k9mtORxCqLW30vBjT6NVjOPq0r1RBnTGUgYdsgxV0W4XZ6~WEPkYmcmZ8ML03faDnAFH6VcDMFp8siCDluNyIDvmKki7W5zCD0MDxiSKb6HTXRboSw45Q__',
    title: "Women's Long Skirt With Butterfly Slit",
    price: '282.459đ',
    rating: 4.7,
    sold: '4,2k+ sold',
    almostSoldOut: true,
  },
  {
    id: '7',
    image:
      'https://s3-alpha-sig.figma.com/img/72f7/b8b0/e25fdd35257029d4b6cd268bc6f370b4?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TdnCG7V3T~d5Gt2ASm2-pOcy6a39bFWuujLOBlo~31UTwV7eycPmfbOJTLB1hXaOI6UOZUwMBFEE2GMn3QlP3zjuoWOjOxX3X5-xbXkHH3n5c0OWPTSZeS64JrWUe~C3Itper3Sw8TgR4ywN0KlASznAJbq9ncxT4I1zQOqYGN-bvihHXMqtPaBfHKh9nXXeGWNKuLG7bAkVOu46XtHmp3eUps0qvVYIGv-w1ScY0cNclNmEj-W2sw6BrhJ2gUWfP33fRyH8aJ7-r2UqMHA1E9IJ61XLJztxeRiecSlU~hdX5wHqKdSf~Gl75qN1GxHJM~dNln8FLmf2oWODjoAoYA__',
    title: "Women's Long Skirt With Butterfly Slit",
    price: '282.459đ',
    rating: 4.7,
    sold: '4,2k+ sold',
    almostSoldOut: true,
  },
  {
    id: '8',
    image:
      'https://s3-alpha-sig.figma.com/img/72f7/b8b0/e25fdd35257029d4b6cd268bc6f370b4?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TdnCG7V3T~d5Gt2ASm2-pOcy6a39bFWuujLOBlo~31UTwV7eycPmfbOJTLB1hXaOI6UOZUwMBFEE2GMn3QlP3zjuoWOjOxX3X5-xbXkHH3n5c0OWPTSZeS64JrWUe~C3Itper3Sw8TgR4ywN0KlASznAJbq9ncxT4I1zQOqYGN-bvihHXMqtPaBfHKh9nXXeGWNKuLG7bAkVOu46XtHmp3eUps0qvVYIGv-w1ScY0cNclNmEj-W2sw6BrhJ2gUWfP33fRyH8aJ7-r2UqMHA1E9IJ61XLJztxeRiecSlU~hdX5wHqKdSf~Gl75qN1GxHJM~dNln8FLmf2oWODjoAoYA__',
    title: "Women's Long Skirt With Butterfly Slit",
    price: '282.459đ',
    rating: 4.7,
    sold: '4,2k+ sold',
    almostSoldOut: true,
  },
];

const menuItems = [
  {
    id: '1',
    image: require('../../assets/icons/ic_message.png'),
    text: 'Messages',
  },
  {
    id: '2',
    image: require('../../assets/icons/ic_yourOrder.png'),
    text: 'Your orders',
  },
  {
    id: '3',
    image: require('../../assets/icons/ic_couponPercent.png'),
    text: 'Coupons & offers',
  },
  {
    id: '4',
    image: require('../../assets/icons/ic_Adress.png'),
    text: 'Addresses',
  },
  {
    id: '5',
    image: require('../../assets/icons/ic_support.png'),
    text: 'Customer support',
  },
  {
    id: '6',
    image: require('../../assets/icons/ic_settings.png'),
    text: 'Settings',
  },
];

const userData = {
  name: 'Minhyu Do',
  avatar:
    'https://s3-alpha-sig.figma.com/img/c375/02e3/5d906d3d9698632a4b0f88206e88c6d5?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Vt1tkOomEuFPYabzA6hndU2ZQpzrK13gmW9hM9ipxVCzmmxh48FDgtZnd1Ry18GC-czFt-q0VPNTCcmN4R3o9vjiGTxnIJoWoYJFXnCWthe7mLgdxBbvPjg5o3pAaS3J-BU19OB4iKe2PW5er~Q8afqiRkLqBtpUhGuFylN615DvL8tcIIWZCcxXTR813AJR-10ZK2nXsASy4tQq9Cmpvew3~KJ-iDsZVOHLQqKu86Jgc8aTApJRRAKXhCJ1ak~bWels~hwDxuXa0pOdSl10Qua0s5qx4JGQG-uWNOr6qamXQp9v6IETZnWiwlMk9SlvCfFID5P-cqNgROCRfI~0tg__',
};

const bottomMenuItems = [
  {
    id: '1',
    title: 'Addresses',
    icon: require('../../assets/icons/ic_Adress.png'),
  },
  {
    id: '2',
    title: 'Notification',
    icon: require('../../assets/icons/ic_notification.png'),
  },
  {
    id: '3',
    title: 'Coupons & offers',
    icon: require('../../assets/icons/ic_couponPercent.png'),
  },
];

const YouScreen = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const handleNavigate = item => navigation.navigate(item.text);
  const { personalInfo } = useSelector(state => state.personalInfo);

  useEffect(() => {
    console.log('personalInfo:', personalInfo);
  }
    , [personalInfo]);


  return (
    <View style={st.container}>
      {/* Danh sách  lịch sử sản phẩm */}
      <FlatList
        data={browsingHistory}
        keyExtractor={item => item.id}
        numColumns={2}
        renderItem={({ item }) => <ProductCard item={item} />}
        contentContainerStyle={st.list}
        ListHeaderComponent={
          <View>
            {/* islogin = false */}
            {!AppManager.shared.isUserLoggedIn() && (
              <>
                <View>
                  <View style={st.header}>
                    <Text style={st.title}>
                      Sign in for the best experience
                    </Text>
                    <View style={st.infoContainer}>
                      <BenefitsInfoBox
                        icon={require('../../assets/icons/ic_freeReturns.png')}
                        title="Free returns"
                        subtitle="Up to 90 days"
                      />
                      <BenefitsInfoBox
                        icon={require('../../assets/icons/ic_freeShipping.png')}
                        title="Free shipping"
                        subtitle="On all orders"
                      />
                    </View>
                    <FilledButton
                      title="Sign in / Register"
                      customStyle={{
                        backgroundColor: 'black',
                        width: '100%',
                        marginTop: 20,
                      }}
                      onPress={() => navigation.navigate('Login')}
                    />
                  </View>
                  {/* menu item */}
                  <View style={st.separator} />
                  {menuItems.map(item => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      onPress={item => handleNavigate(item)}
                    />
                  ))}
                  <View style={st.historyItem}>
                    <Text style={st.sectionTitle}>Browsing history</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#737373',
                          fontWeight: '700',
                          flex: 1,
                        }}>
                        Sign in to view recently viewed items
                      </Text>
                      <Image
                        source={require('../../assets/icons/ic_next.png')}
                        style={{ height: 15, width: 15 }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </View>
              </>
            )}
            {/*  islogin = true */}
            {AppManager.shared.isUserLoggedIn() && (
              <>
                <View>
                  <View style={st.userInfo}>
                    <Image source={{ uri: personalInfo.avatar }} style={st.avatar} />
                    <Text style={st.userName}>{personalInfo.name}</Text>
                    <View style={st.headerIcons}>
                      <Image
                        source={require('../../assets/icons/ic_support.png')}
                        style={st.icon}
                      />
                      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Image
                          source={require('../../assets/icons/ic_settings.png')}
                          style={st.icon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {menuItems.slice(0, 2).map(item => (
                    <MenuItem key={item.id} item={item} onPress={item => handleNavigate(item)} />
                  ))}
                  <View style={st.bottomMenu}>
                    {bottomMenuItems.map(item => (
                      <TouchableOpacity key={item.id} style={st.bottomMenuItem} onPress={()=>navigation.navigate(item.title)}>
                        <Image source={item.icon} style={st.menuIcon} />
                        <Text style={st.menuText}>{item.title}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text
                    style={[st.sectionTitle, { marginLeft: 15, marginTop: 5 }]}>
                    Browsing history
                  </Text>
                </View>
              </>
            )}
          </View>
        }
      />
    </View>
  );
};

const MenuItem = ({ item, onPress }) => (
  <TouchableOpacity
    style={st.menuItem}
    onPress={() => {
      onPress(item);
    }}>
    <Image source={item.image} style={st.menuIcon} />
    <Text style={st.menuText}>{item.text}</Text>
    <Image
      source={require('../../assets/icons/ic_next.png')}
      style={{ height: 15, width: 15 }}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

export default YouScreen;

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    padding: 14,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 50,
  },
  menuItem: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#B1B1B1',
  },
  menuText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
  },
  historyItem: {
    padding: 13,
    borderTopWidth: 5,
    borderTopColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 3,
    backgroundColor: '#fff',
  },
  separator: {
    height: 5,
    backgroundColor: '#EEEEEE',
  },
  //
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    borderBottomWidth: 5,
    borderBlockColor: '#EEEEEE',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  menuIcon: {
    width: 24,
    height: 24,
  },
  menuBottomText: {
    fontSize: 16,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 13,
    backgroundColor: '#fff',
    borderTopWidth: 5,
    borderTopColor: '#EEEEEE',
    borderBottomWidth: 5,
    borderBlockColor: '#EEEEEE',
  },
  bottomMenuItem: {
    alignItems: 'center',
  },
});
