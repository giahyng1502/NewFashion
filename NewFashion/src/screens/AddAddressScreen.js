import { Animated, Image, Modal, Pressable, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BaseHeader from '../components/BaseHeader'
import TextField, { TextFieldType } from '../components/TextField'
import ScreenSize from '../contants/ScreenSize'
import FilledButton from '../components/FilledButton'
import OutlinedButton from '../components/OutlinedButton'
import { useDispatch, useSelector } from 'react-redux'
import { addInformation, updateInformation } from '../redux/actions/infomationActions'

const addressData = require('../assets/address_local.json')

const AddAddressScreen = ({ navigation, route }) => {
    const { isFromCheckout,info } = route.params

    //fields
    const [fullname, setFullname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [selectedCity, setSelectedCity] = useState(null)
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const [selectedWard, setSelectedWard] = useState(null)
    const [streetName, setStreetName] = useState('')

    //current level
    const [currentLevel, setCurrentLevel] = useState('city')

    //errorLabel
    const [fullnameError, setFullnameError] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')
    const [cityError, setCityError] = useState('')
    const [districtError, setDistrictError] = useState('')
    const [wardError, setWardError] = useState('')
    const [streetNameError, setStreetNameError] = useState('')

    // Bottom sheet
    const [isVisible, setIsVisible] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const bottomSheetHeight = ScreenSize.height * 0.85
    const [searchText, setSearchText] = useState('');

    //Modal state
    const [modalVisible, setModalVisible] = useState(false);

    const { personalInfo } = useSelector(state => state.personalInfo)
    const dispatch = useDispatch()

    useEffect(() => {
        if (info) {
            const { address } = info;

            // Giả sử address là "So 16, to 8, Pho Chu Huy Man, Phường Phúc Đồng, Quận Long Biên, Thành phố Hà Nội"
            const addressParts = address.split(',').map(part => part.trim());

            // Tìm thành phố, quận, và phường
            const cityName = addressParts[addressParts.length - 1];
            const districtName = addressParts[addressParts.length - 2];
            const wardName = addressParts[addressParts.length - 3];
            const street = addressParts.slice(0, addressParts.length - 3).join(', ');

            // Cập nhật thông tin ban đầu
            setStreetName(street);
            setFullname(info.name);
            setPhoneNumber(info.phoneNumber);

            // Tìm thành phố
            const city = addressData.cities.find(city => city.name === cityName);
            if (city) {
                setSelectedCity(city);

                // Tìm quận
                const district = city.districts.find(district => district.name === districtName);
                if (district) {
                    setSelectedDistrict(district);

                    // Tìm phường
                    const ward = district.wards.find(ward => ward.name === wardName);
                    if (ward) {
                        setSelectedWard(ward);
                    }
                }
            }
        }
    }, [info]);

    // Bottom sheet functions
    const openBottomSheet = (level) => {
        if (level === 'city') {
            setCurrentLevel('city');
        }
        if (level === 'district') {
            if (selectedCity === null) {
                setCurrentLevel('city');
            } else {
                setCurrentLevel('district');
            }
        }
        if (level === 'ward') {
            if (selectedCity === null) {
                setCurrentLevel('city');
            } else if (selectedCity !== null && selectedDistrict === null) {
                setCurrentLevel('district');
            } else {
                setCurrentLevel('ward');
            }
        }
        setIsVisible(true);
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeBottomSheet = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setIsVisible(false)
            setSearchText('')

            validateField('city');
            validateField('district');
            validateField('ward');
        });
    };

    const backdropOpacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
    });

    const sheetTranslateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [bottomSheetHeight, 0],
    });

    useEffect(() => {
        if (selectedCity) {
            openBottomSheet('district');
        }
    }, [selectedCity]);

    useEffect(() => {
        if (selectedDistrict) {
            openBottomSheet('ward');
        }
    }, [selectedDistrict]);

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setSelectedDistrict(null);
        setSelectedWard(null);
        setSearchText('');
        setCityError('');
    };

    const handleDistrictSelect = (district) => {
        setSelectedDistrict(district);
        setSelectedWard(null);
        setSearchText('');
        setDistrictError('');
    };

    const handleWardSelect = (ward) => {
        setSelectedWard(ward);
        setSearchText('');
        setWardError('')
        setIsVisible(false);
    };

    const groupByFirstLetter = (arr) => {
        const grouped = arr.reduce((acc, city) => {
            const firstLetter = city.name.charAt(0).toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(city);
            return acc;
        }, {});

        return Object.keys(grouped)
            .sort()
            .map((letter) => ({
                title: letter,
                data: grouped[letter],
            }));
    };

    const getData = () => {
        if (currentLevel === 'city') return groupByFirstLetter(addressData.cities);
        if (currentLevel === 'district') return groupByFirstLetter(selectedCity?.districts || []);
        if (currentLevel === 'ward') return groupByFirstLetter(selectedDistrict?.wards || []);
        return [];
    };

    const filteredData = () => {
        if (currentLevel === 'city') {
            const filteredCities = addressData.cities.filter((city) =>
                city.name.toLowerCase().includes(searchText.toLowerCase())
            );
            return groupByFirstLetter(filteredCities);
        }

        if (currentLevel === 'district') {
            const filteredDistricts = selectedCity?.districts.filter((district) =>
                district.name.toLowerCase().includes(searchText.toLowerCase())
            );
            return groupByFirstLetter(filteredDistricts);
        }

        if (currentLevel === 'ward') {
            const filteredWards = selectedDistrict?.wards.filter((ward) =>
                ward.name.toLowerCase().includes(searchText.toLowerCase())
            );
            return groupByFirstLetter(filteredWards);
        }

        return [];
    }

    const validateField = (field, value) => {
        let error = '';

        switch (field) {
            case 'fullname':
                error = !value.trim() ? '   Vui lòng nhập tên đầy đủ' :
                    value.trim().length < 2 ? 'Please enter your full name with no less than 2 characters' : '';
                setFullnameError(error);
                return error;
            case 'phoneNumber':
                const phoneRegex = /^0\d{8,9}$/;
                error = !value ? 'Vui lòng nhập số điện thoại để chúng tôi có thể gọi để giải quyết bất kỳ vấn đề giao hàng nào' :
                    !phoneRegex.test(value) ? 'Vui lòng nhập số điện thoại hợp lệ gồm 9 chữ số hoặc 10 chữ số bắt đầu bằng 0' : '';
                setPhoneNumberError(error);
                return error;
            case 'city':
                error = !selectedCity ? 'Vui lòng chọn một thành phố' : '';
                setCityError(error);
                return error;
            case 'district':
                error = !selectedDistrict ? 'Vui lòng chọn một quận' : '';
                setDistrictError(error);
                return error;
            case 'ward':
                error = !selectedWard ? 'Vui lòng chọn một phường' : '';
                setWardError(error);
                return error;
            case 'streetName':
                error = !value ? 'Vui lòng nhập tên đường' : '';
                setStreetNameError(error);
                return error;
            default:
                return '';
        }
    };

    const saveInfomation = () => {
        const fullnameErr = validateField('fullname', fullname);
        const phoneErr = validateField('phoneNumber', phoneNumber);
        const cityErr = validateField('city');
        const districtErr = validateField('district');
        const wardErr = validateField('ward');
        const streetNameErr = validateField('streetName', streetName);

        if (!fullnameErr && !phoneErr && !cityErr && !districtErr && !wardErr && !streetNameErr) {
            setModalVisible(true);

            const information = {
                name: fullname,
                address: `${streetName}, ${selectedWard?.name}, ${selectedDistrict?.name}, ${selectedCity?.name}`,
                phoneNumber: phoneNumber,
            };
            console.log('Information: ', information);
        }
    };

    const confirmInformation = () => {
        const information = {
            name: fullname,
            address: `${streetName}, ${selectedWard?.name}, ${selectedDistrict?.name}, ${selectedCity?.name}`,
            phoneNumber: phoneNumber,
        };

        if (info) {
            dispatch(updateInformation({id: info._id, data: information}))
            .then(() => {
                console.log('Information: ', information);
                setModalVisible(false);
                navigation.goBack();
            })
            .catch((error) => {
                console.log('Update information failed: ', error);
            });
        } else {
            dispatch(addInformation(information))
            .then(() => {
                console.log('Information: ', information);
                setModalVisible(false);
                if (isFromCheckout) {
                    navigation.goBack();
                } else {
                    navigation.navigate("CheckOut")
                }
            })
            .catch((error) => {
                console.log('Add information failed: ', error);
            });
        }
    }


    return (
        <View style={st.container}>
            {/* Header */}
            <BaseHeader title="Thêm địa chỉ để đặt hàng" showLeftButton={true} onLeftButtonPress={() => { navigation.goBack() }} />

            {/* Description */}
            <View style={st.descriptionContainer}>
                <Image source={require('../assets/icons/ic_lock.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
                <Text style={{ color: '#008D42', fontSize: 12, fontWeight: 'semibold' }}>Tất cả dữ liệu được mã hóa</Text>
            </View>

            {/* Shipping benefit */}
            <View style={st.shippingContainer}>
                <View style={st.shippingItem}>
                    <Image source={require('../assets/icons/ic_greenCheck.png')} resizeMode='contain' style={{ width: 15, height: 15 }} />
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#008D42' }}>Miễn phí vận chuyển</Text>
                </View>
                <Text style={{ fontSize: 12, color: '#737373' }}>|</Text>
                <View style={st.shippingItem}>
                    <Image source={require('../assets/icons/ic_greenCheck.png')} resizeMode='contain' style={{ width: 15, height: 15 }} />
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#008D42' }}>Trả lại nếu sản phẩm bị hư hỏng</Text>
                </View>
            </View>

            {/* Input fields */}
            <View style={st.inputContainer}>
                {/* fullname */}
                <Text style={st.label}>
                Họ tên đầy đủ {' '}
                    <Text style={{ color: '#F91616' }}>*</Text>
                    {' '}(Họ và tên)
                </Text>
                <TextField
                    value={fullname}
                    placeholder="Nhập tên đầy đủ"
                    customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }}
                    onChangeText={(text) => {
                        setFullname(text);
                        validateField('fullname', text)
                    }}
                    error={fullnameError.length > 0}
                    onBlur={() => validateField('fullname', fullname)}
                />
                {fullnameError &&
                    <View style={st.errorContainer}>
                        <Image source={require('../assets/icons/ic_warningValidate.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
                        <Text style={st.errorLabel} numberOfLines={0}>{fullnameError}</Text>
                    </View>
                }

                {/* phoneNumber */}
                <Text style={st.label}>
                Số điện thoại {' '}
                    <Text style={{ color: '#F91616' }}>*</Text>
                </Text>
                <TextField
                    value={phoneNumber}
                    type={TextFieldType.PHONENUMBER}
                    placeholder="Nhập số điện thoại"
                    customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }}
                    onChangeText={(text) => {
                        setPhoneNumber(text);
                        validateField('phoneNumber', text)
                    }}
                    onBlur={() => validateField('phoneNumber', phoneNumber)}
                    error={phoneNumberError.length > 0}
                />
                {phoneNumberError &&
                    <View style={st.errorContainer}>
                        <Image source={require('../assets/icons/ic_warningValidate.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
                        <Text style={st.errorLabel} >{phoneNumberError}</Text>
                    </View>
                }

                {/* city */}
                <Text style={st.label}>
                Thành phố {' '}
                    <Text style={{ color: '#F91616' }}>*</Text>
                </Text>
                <TextField
                    type={TextFieldType.DROPDOWN}
                    placeholder="Chọn một thành phố"
                    customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }}
                    value={selectedCity ? selectedCity.name : 'Lựa chọn'}
                    onDropdown={() => { openBottomSheet('city') }}
                    error={cityError.length > 0}
                />
                {cityError &&
                    <View style={st.errorContainer}>
                        <Image source={require('../assets/icons/ic_warningValidate.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
                        <Text style={st.errorLabel}>{cityError}</Text>
                    </View>
                }

                {/* district */}
                <Text style={st.label}>
                Quận / Huyện {' '}
                    <Text style={{ color: '#F91616' }}>*</Text>
                </Text>
                <TextField
                    type={TextFieldType.DROPDOWN}
                    placeholder="Select a district"
                    customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }}
                    value={selectedDistrict ? selectedDistrict.name : 'Lựa chọn'}
                    onDropdown={() => { openBottomSheet('district') }}
                    error={districtError.length > 0}
                />
                {districtError &&
                    <View style={st.errorContainer}>
                        <Image source={require('../assets/icons/ic_warningValidate.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
                        <Text style={st.errorLabel}>{districtError}</Text>
                    </View>
                }

                {/* ward */}
                <Text style={st.label}>
                    Phường / Xã {' '}
                    <Text style={{ color: '#F91616' }}>*</Text>
                </Text>
                <TextField
                    type={TextFieldType.DROPDOWN}
                    placeholder="Select a ward"
                    customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }}
                    value={selectedWard ? selectedWard.name : 'Lựa chọn'}
                    onDropdown={() => { openBottomSheet('ward') }}
                    error={wardError.length > 0}
                />
                {wardError &&
                    <View style={st.errorContainer}>
                        <Image source={require('../assets/icons/ic_warningValidate.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
                        <Text style={st.errorLabel}>{wardError}</Text>
                    </View>
                }

                {/* street name */}
                <Text style={st.label}>
                    Tên đường {' '}
                    <Text style={{ color: '#F91616' }}>*</Text>
                </Text>
                <TextField
                    value={streetName}
                    placeholder="Nhập tên đường, tòa nhà, số nhà, căn hộ, tầng, v.v."
                    customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }}
                    onChangeText={(text) => {
                        setStreetName(text);
                        validateField('streetName', text);
                    }}
                    onBlur={() => validateField('streetName', streetName)}
                    error={streetNameError.length > 0}
                />
                {streetNameError &&
                    <View style={st.errorContainer}>
                        <Image source={require('../assets/icons/ic_warningValidate.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
                        <Text style={st.errorLabel}>{streetNameError}</Text>
                    </View>
                }
            </View>

            {/* Save button */}
            <FilledButton title="Lưu" customStyle={{ alignSelf: 'center', backgroundColor: '#EE640F', width: ScreenSize.width - 40, marginVertical: 20 }} onPress={() => { saveInfomation() }} />

            {/* Bottom Sheet */}
            {isVisible && (
                <View style={st.wrapper}>
                    {/* Background */}
                    <TouchableOpacity style={st.backdrop} activeOpacity={1} onPress={closeBottomSheet}>
                        <Animated.View style={[st.backdrop, { opacity: backdropOpacity }]} />
                    </TouchableOpacity>

                    {/* Sheet container */}
                    <Animated.View style={[st.sheetContainer, { transform: [{ translateY: sheetTranslateY }] }]}>
                        {/* sheet header */}
                        <BaseHeader
                            title="Select"
                            showRightButton={true}
                            rightIcon={require('../assets/bt_exit.png')}
                            onRightButtonPress={closeBottomSheet}
                        />
                        <View style={{ flexDirection: 'row', gap: 3, alignItems: 'center', marginHorizontal: 20, marginTop: 8 }}>
                            {/* address indicator */}
                            <TouchableOpacity onPress={() => {
                                openBottomSheet('city');
                            }}>
                                <Text style={currentLevel === 'city' ? st.currentLevel : st.defaultLevel}>
                                    {selectedCity ? selectedCity.name : "City"}
                                </Text>
                            </TouchableOpacity>

                            {selectedCity && (
                                <>
                                    <Image
                                        source={require('../assets/icons/ic_next.png')}
                                        resizeMode="contain"
                                        style={{ width: 12, height: 12 }}
                                    />
                                    <TouchableOpacity onPress={() => {
                                        openBottomSheet('district');
                                    }}>
                                        <Text style={currentLevel === 'district' ? st.currentLevel : st.defaultLevel}>
                                            {selectedDistrict ? selectedDistrict.name : "District"}
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                            {selectedDistrict && (
                                <>
                                    <Image
                                        source={require('../assets/icons/ic_next.png')}
                                        resizeMode="contain"
                                        style={{ width: 12, height: 12 }}
                                    />
                                    <TouchableOpacity onPress={() => {
                                        openBottomSheet('ward');
                                    }}>
                                        <Text style={currentLevel === 'ward' ? st.currentLevel : st.defaultLevel}>
                                            {selectedWard ? selectedWard.name : "Ward"}
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>

                        {/* search bar */}
                        <View style={{ backgroundColor: '#e8e8e8', marginHorizontal: 20, borderRadius: 4, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 10 }}>
                            <Image source={require('../assets/icons/ic_searchAddress.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
                            <TextInput
                                placeholder="Search"
                                style={{ flex: 1, marginLeft: 10 }}
                                onChangeText={setSearchText}
                                value={searchText}
                            />
                            {/* clear text button */}
                            {searchText.length > 0 && (
                                <TouchableOpacity onPress={() => setSearchText('')}>
                                    <Image source={require('../assets/bt_clearText.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* sectionList */}
                        <SectionList
                            style={{ flex: 1 }}
                            sections={searchText.length > 0 ? filteredData() : getData()}
                            keyExtractor={(item, index) => item.name + index}
                            stickySectionHeadersEnabled={true}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => {
                                const isSelected = (currentLevel === 'city' && item === selectedCity) ||
                                    (currentLevel === 'district' && item === selectedDistrict) ||
                                    (currentLevel === 'ward' && item === selectedWard);

                                return (
                                    <TouchableOpacity
                                        style={{
                                            height: 40,
                                            backgroundColor: isSelected ? '#d9d9d9' : 'transparent',
                                        }}
                                        onPress={() => {
                                            if (currentLevel === 'city') handleCitySelect(item);
                                            else if (currentLevel === 'district') handleDistrictSelect(item);
                                            else if (currentLevel === 'ward') handleWardSelect(item);
                                        }}
                                    >
                                        <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: 1, marginLeft: 20, height: "100%", justifyContent: 'center' }}>
                                            <Text>{item.name || item}</Text>
                                            {isSelected && (
                                                <Image
                                                    source={require('../assets/icons/ic_selectedItem.png')}
                                                    resizeMode="contain"
                                                    style={{ width: 15, height: 15, position: 'absolute', right: 20 }}
                                                />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                );
                            }}
                            renderSectionHeader={({ section: { title } }) => (
                                <View style={{ height: 40, justifyContent: 'center', backgroundColor: 'white' }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 12,
                                            marginLeft: 20,
                                        }}
                                    >
                                        {title}
                                    </Text>
                                </View>
                            )}
                        />
                    </Animated.View>
                </View>
            )}

            {/* Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <View style={st.modalContainer}>
                    {/* background */}
                    <TouchableOpacity
                        style={{ backgroundColor: '#00000050', flex: 1, position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}
                        activeOpacity={1}
                        onPress={() => setModalVisible(false)}
                    >
                    </TouchableOpacity>
                    <View style={st.modalView}>
                        <Pressable onPress={() => setModalVisible(false)} style={st.closeModal}>
                            <Image source={require('../assets/bt_exit.png')} resizeMode='contain' />
                        </Pressable>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginTop: 30 }}>
                            Nhân viên giao hàng có thể không giao được đơn hàng của bạn vì {' '}
                            <Text style={{ color: '#D96923' }}>
                                địa chỉ mà bạn cung cấp có thể thiếu số nhà hoặc số tòa nhà.
                            </Text>
                            {' '} Vui lòng kiểm tra lại địa chỉ được cung cấp.
                        </Text>
                        <Text style={{ fontSize: 13, fontWeight: 'bold', textAlign: 'left', marginTop: 10, width: '100%', color: '#737373' }}>
                            Địa chỉ giao hàng của bạn:
                        </Text>

                        <View style={{ padding: 10, borderRadius: 5, backgroundColor: '#F5F5F5', width: '100%', marginTop: 4 }}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
                                {streetName}, {selectedWard?.name}, {selectedDistrict?.name}, {selectedCity?.name}
                            </Text>
                        </View>

                        <FilledButton title="Chỉnh sửa" customStyle={{ backgroundColor: '#EE640F', width: '100%', marginTop: 20 }} onPress={() => setModalVisible(false)} />
                        <OutlinedButton title="Địa chỉ chuẩn xác" customStyle={{ width: '100%', marginTop: 10 }} onPress={confirmInformation} />
                    </View>
                </View>
            </Modal>


        </View >
    )
}

export default AddAddressScreen

const st = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    descriptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        gap: 5,
    },
    shippingContainer: {
        backgroundColor: '#FAFAFA',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        gap: 10,
        marginTop: 5
    },
    shippingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    inputContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 16
    },
    errorContainer: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    errorLabel: {
        fontSize: 12,
        fontWeight: 'semibold',
        color: '#F91616',
        flex: 1
    },
    currentLevel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1e1e1e',
    },
    defaultLevel: {
        fontSize: 12,
        fontWeight: 'semibold',
        color: '#737373',
    },
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#00000050',
    },
    sheetContainer: {
        width: '100%',
        height: ScreenSize.height * 0.85,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '75%'
    },
    closeModal: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 24,
        height: 24
    }
})