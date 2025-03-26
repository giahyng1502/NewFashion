import {  Text, View, FlatList, TouchableOpacity, Alert, Image,ActivityIndicator } from 'react-native'
import React,{ useState, useEffect } from 'react'
import BaseHeader from '../../components/BaseHeader'
import { useDispatch, useSelector } from 'react-redux'
import { deleteInformation, updateDefaultInformation } from '../../redux/actions/infomationActions'

const AddressesScreen = ({navigation}) => {
  const { personalInfo } = useSelector(state => state.personalInfo);
  const [addresses, setAddresses] = useState(null)
  const dispatch = useDispatch()
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  const getDefaultInformation = () => {
    const defaultInformation = personalInfo.information.filter(infor => infor.isDefault);

    if (defaultInformation.length === 0) {
      return personalInfo.information[0];
    } else {
      return defaultInformation[0];
    }
  }

  useEffect(() => {
    console.log('personalInfo:', personalInfo);
    console.log('default address',defaultAddress);
    
    if (personalInfo && personalInfo.information) {
      setDefaultAddress(getDefaultInformation());
      setAddresses(personalInfo.information)
      setIsLoading(false);
    } else {
      console.log('No personalInfo data or empty information array');
    }
  }, [personalInfo]);

  const handleDeleteItem = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this address?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updateAddress = addresses.filter(item => item._id != id);
            setAddresses(updateAddress);

            // Gửi yêu cầu xóa lên server với các sản phẩm được chọn
            dispatch(deleteInformation(id))
              .then((result) => {
                console.log(result);
              })
              .catch((error) => {
                console.error("Error deleting address:", error);
              });
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleDefaultAddress = (item) => {
    setDefaultAddress(item)
    dispatch(updateDefaultInformation(item._id))
  }

  if (isLoading) {
    return (
      <View style={{flex: 1,justifyContent: 'center',alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading personal info...</Text>
      </View>
    );
  }

  return (
    <View style={{backgroundColor:'#fff',flex:1}}>
      <BaseHeader
        title='Addresses'
        showLeftButton={true}
        onLeftButtonPress={() => navigation.goBack()}
      />

      <View style={{ backgroundColor: "#F5F5F5", borderTopColor: '#BBBBBB', borderTopWidth: 0.5 }}>
        {personalInfo.information.length === 0 ? (
          <View style={{backgroundColor: "#fff", padding:20,flexDirection:'column',alignItems:'center',width:"100%"}}>
            <Image source={require('../../assets/icons/ic_Adress.png')} style={{width:50,height:50,marginTop:20}}/>
            <Text style={{color:'#737373',fontSize:18,fontWeight:'bold',marginTop:15}}>You don't have any addresses, please add at least one</Text>
          </View>
        ):(
          <FlatList
            data={personalInfo.information}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: "#fff", padding: 15, marginBottom: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <Text style={{ color: '#000', fontWeight: "bold", fontSize: 16 }}>{item.name}</Text>
                  <Text style={{ color: "#737373", fontWeight: "bold", fontSize: 14, marginLeft: 10 }}>+84 {item.phoneNumber}</Text>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text
                      style={{ color: '#000', fontWeight: 'bold', fontSize: 13, marginTop: 5 }}
                      ellipsizeMode="tail"  // Hiển thị dấu ba chấm nếu text bị cắt
                    >
                      {item.address}
                    </Text>
                  </View>
                  <View>
                  </View>
                </View>

                <View style={{ marginTop: 15, borderTopColor: '#BBBBBB', borderTopWidth: 0.5, flexDirection: 'row', justifyContent: 'space-between' }}>
                  {item._id === defaultAddress._id ? (
                          <TouchableOpacity style={{ marginTop: 10, flexDirection: "row", alignItems: "center" }}>
                            <View style={{ width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: "#000", alignItems: "center", justifyContent: "center" }}>
                              <View
                                style={{
                                  width: 9,
                                  height: 9,
                                  borderRadius: 5,
                                  backgroundColor: "#000",
                                }}
                              />
                            </View>
                            <Text style={{ marginLeft: 8, color: "#737373", fontWeight: 'bold' }}>Default</Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={{
                              marginTop: 10,
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                            onPress={() => handleDefaultAddress(item)}
                          >
                            <View
                              style={{
                                width: 18,
                                height: 18,
                                borderRadius: 9,
                                borderWidth: 2,
                                borderColor: "#000",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            />
                            <Text style={{ marginLeft: 8, color: "#737373", fontWeight: 'bold' }}>Set as default</Text>
                          </TouchableOpacity>
                        )}

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 12,
                    }}
                  >
                    {item._id === defaultAddress._id ? (
                      <View></View>
                    ) : (
                      <TouchableOpacity onPress={() => handleDeleteItem(item._id)}>
                        <Text style={{ marginRight: 5, color: "#737373", fontWeight: 'bold' }}>Delete</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => navigation.navigate('AddAddress', { isFromCheckout: true, info: item })}>
                      <Text style={{ marginLeft: 5, color: "#737373", fontWeight: 'bold' }}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        )}

      </View>
      
      <View style={{ position: 'absolute', bottom: 0,width: '100%', backgroundColor: '#fff', padding: 15, borderTopColor: '#BBBBBB', borderTopWidth: 0.5 }}>
          <TouchableOpacity style={{ backgroundColor: "#ff7f00", padding: 12, borderRadius: 40, alignItems: "center" }} onPress={() => navigation.navigate('AddAddress', { isFromCheckout: true })}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              Add a new address
            </Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddressesScreen