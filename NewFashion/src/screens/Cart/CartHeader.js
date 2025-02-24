import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import BaseHeader from "../../components/BaseHeader";

const CartHeader = ({ onLeftButtonPress }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isShowDeleteButton, setIsShowDeleteButton] = useState(false);
  const [title, setTitle] = useState("Cart");

  const addProduct = () => {
    setCartItems([
      {
        id: "1",
        name: "Embroidered Wool-blend Scarf Jacket",
        price: 268.443,
        oldPrice: 335.886,
        discount: 25,
        quantity: 1,
        image: require("../../assets/image/ig_product1.png"),
      },
      {
        id: "2",
        name: "Embroidered Wool-blend Scarf Jacket",
        price: 268.443,
        oldPrice: 335.886,
        discount: 25,
        quantity: 1,
        image: require("../../assets/image/ig_product1.png"),
      },
    ]);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const increaseQuantity = (id) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const deleteSelectedItems = () => {
    setCartItems(cartItems.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  useEffect(() => {
    if (selectedItems.length > 0) {
      setIsShowDeleteButton(true);
      setTitle(`Selected ${selectedItems.length} items`);
    } else {
      setIsShowDeleteButton(false);
      setTitle("Cart");
    }
  }, [selectedItems]);

  return (
    <View style={styles.container}>
      {/* Header Cart */}
      <BaseHeader
        title={title}
        showLeftButton={true}
        onLeftButtonPress={onLeftButtonPress}
        showRightButton={isShowDeleteButton}
        rightIcon={require("../../assets/bt_delete.png")}
        onRightButtonPress={() => { deleteSelectedItems() }}
      />

      {/* Shipping Info */}
      {cartItems.length === 0 ? (
        <View style={styles.shippingBox}>
          <View style={styles.subShippingBox}>
            <Image
              source={require("../../assets/icons/ic_truck.png")}
              style={styles.shippingIcon}
              resizeMode="contain"
            />
            <Text style={styles.shippingText}>FREE SHIPPING and free returns</Text>
          </View>

          <Text style={styles.exclusiveOffer}></Text>
        </View>
      ) : (
        <View style={styles.shippingBox}>
          <View style={styles.subShippingBox}>
            <Image
              source={require("../../assets/icons/ic_greenCheck.png")}
              style={styles.shippingIcon}
              resizeMode="contain"
            />
            <Text style={[styles.shippingText, { color: 'green' }]}>FREE SHIPPING and free returns</Text>
          </View>

          <Text style={styles.exclusiveOffer}>Exclusive offer</Text>
        </View>
      )}

      {/* Product*/}
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.subEmptyContainer}>
            <Image
              source={require("../../assets/icons/ic_emptyCart.png")}
              style={styles.cartImage}
            />
            <View>
              <Text style={styles.emptyText}>Your shopping cart is empty</Text>
              <Text style={styles.subText}>Add your favorite items in it.</Text>
            </View>
          </View>

          <TouchableOpacity onPress={addProduct} style={styles.addButton}>
            <Text>Thêm sản phẩm</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              {/* Checkbox */}
              <TouchableOpacity onPress={() => toggleSelectItem(item.id)}>
                <Image
                  source={
                    selectedItems.includes(item.id)
                      ? require("../../assets/icons/ic_greenCheck.png")
                      : require("../../assets/icons/ic_unchecked.png")
                  }
                  style={styles.checkbox}
                />
              </TouchableOpacity>

              {/* Product Image + Almost Sold Out Label */}
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.soldOutLabel}>
                  <Text style={styles.soldOutText}>Almost sold out</Text>
                </View>
              </View>

              {/* Product Details */}
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productSize}>Green / Label size: XL</Text>
                <Text style={styles.saleText}>Big sale | Last 3 days</Text>

                <View style={styles.priceRow}>
                  <Text style={styles.discountedPrice}>
                    {item.price.toFixed(3)}d
                  </Text>
                  <Text style={styles.oldPrice}>{item.oldPrice.toFixed(3)}d</Text>
                  <Text style={styles.discount}>-{item.discount}%</Text>
                </View>

                {/* Quantity Controls */}
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item.id)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => increaseQuantity(item.id)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },

  //header
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },

  //shipping
  shippingBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    marginVertical: 20,
    justifyContent: "space-between",
  },
  subShippingBox: {
    flexDirection: 'row'
  },
  shippingIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  shippingText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  exclusiveOffer: {
    fontSize: 12,
    color: "#666",
  },

  //without product
  emptyContainer: {
    alignItems: "center",
  },
  subEmptyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  cartImage: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  //with product
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    width: "100%",
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width: 100,
    height: 100,
  },
  soldOutLabel: {
    position: "absolute",
    bottom: 5,
    alignSelf: 'center',
    backgroundColor: "black",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 10,
  },
  soldOutText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  //detail
  productDetails: {
    flex: 1,
    marginLeft: 20
  },
  nameContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  productSize: {
    fontSize: 12,
    color: "#555",
  },
  saleText: {
    fontSize: 12,
    color: "orange",
    fontWeight: "bold",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E67E22",
  },
  oldPrice: {
    fontSize: 14,
    color: "#999",
    textDecorationLine: "line-through",
    marginHorizontal: 8,
  },
  discount: {
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#E74C3C",
    color: "#E74C3C",
    paddingHorizontal: 4,
    borderRadius: 3,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5
  },
  quantityButton: {
    width: 20,
    height: 20,
    borderColor: '#000',
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  quantityText: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});

export default CartHeader;