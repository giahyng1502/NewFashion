import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const reviews = [
  {
    id: "1",
    name: "Ngaan nè",
    avataruser: require("../assets/icons/ic_user.png"),
    date: "Nov 22, 2024",
    color: "Black",
    size: "M",
    rating: 5,
    review:
      "Tôi rất thích thiết kế này, mặc vào rất tôn dáng và lộng lẫy, rất xứng đáng với giá tiền. Sẽ ủng hộ shop thật nhiều nhiều hơn nữa trong tương lai.",
  },
  {
    id: "2",
    name: "Do Duyen",
    avataruser: require("../assets/icons/ic_user2.png"),
    date: "Nov 24, 2024",
    color: "Blue",
    size: "M",
    rating: 4,
    review:
      "Trời ơi xinh xỉu shop ơi, mãi iuuu, mặc lên xinh quá thế, mong rằng shop có thêm nhiều thiết kế như thế này, sẽ ủng hộ dài dài.",
  },
];

export const ReviewItem = ({ name, avataruser, date, color, size, review, rating }) => {
  return (
    <View>
      <View style={st.userInfo}>
        <Image source={avataruser} style={st.avatar} />
        <TouchableOpacity style={st.lableuser}>
          <Text style={st.userName}>{name}</Text>
          <Text style={st.userDetails}>ở Việt Nam vào {date}</Text>
        </TouchableOpacity>
      </View>

      <View style={st.ratingContainer}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Image
            key={index}
            source={
              index < rating
                ? require("../assets/icons/ic_staralone.png")
                : require("../assets/icons/ic_staralone.png")
            }
            style={st.starIcon}
          />
        ))}
      </View>

      <Text style={st.productInfo}>
      Đã mua: {color} / Kích thước nhãn: {size}
      </Text>
      <Text style={st.reviewText}>{review}</Text>
    </View>
  )
}

const ReviewFormUser = () => {
  return (
    <View style={st.container}>
      <View style={st.topButtons}>
        <TouchableOpacity style={st.filterButton}>
          <Text style={st.buttonText}>Đồ mặc mùa đông (2)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={st.filterButton}>
          <Text style={st.buttonText}>Chất lượng tốt (2)</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={reviews}
        keyExtractor={(item,index) =>`${item._id}${index} review in reviewFromUser`}

        renderItem={({ item }) => <ReviewItem {...item} />}
        contentContainerStyle={st.listContainer}
      />
    </View>
  );
};

export default ReviewFormUser

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  topButtons: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
    zIndex: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },

  listContainer: {
    padding: 12,
    backgroundColor: "#fff",
  },
  reviewContainer: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 14,
  },
  userDetails: {
    fontSize: 12,
    color: "gray",
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  starIcon: {
    marginRight: 2,
  },
  productInfo: {
    fontSize: 12,
    color: "gray",
    marginBottom: 6,
  },
  reviewText: {
    fontSize: 14,
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginLeft: 230,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 17,
  },
  actionIcon: {
    marginRight: 5,
  },
  actionText: {
    fontSize: 12,
  },
  moreIcon: {
    marginLeft: "auto",
  },
  lableuser: {
    flexDirection: "row",
    alignItems: "center",
  },
  lablecata: {
    flexDirection: "row",
    alignItems: "center"
  },
  catalist: {
    borderWidth: 1,
    width: 120,
    height: 30,
    borderRadius: 20,
    marginLeft: 5,
  },
  fontcata: {
    alignSelf: "center",
    textAlign: "center",
  },
})