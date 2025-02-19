import { Animated, FlatList, Image, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import BaseHeader from '../components/BaseHeader'
import TextField, { TextFieldType } from '../components/TextField'
import ScreenSize from '../contants/ScreenSize'
import FilledButton from '../components/FilledButton'

const addressData = require('../assets/address_local.json')

const AddAddressScreen = ({ navigation }) => {
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

    // Bottom sheet functions
    const openBottomSheet = (level) => {
        setCurrentLevel(level);
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

    const handleCitySelect = (city) => {
        setSelectedCity(city);
        setSelectedDistrict(null);
        setSelectedWard(null);
        setSearchText('');
        setCityError('');
        openBottomSheet('district');
    };

    const handleDistrictSelect = (district) => {
        setSelectedDistrict(district);
        setSelectedWard(null);
        setSearchText('');
        setDistrictError('');
        openBottomSheet('ward');
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
        switch (field) {
            case 'fullname':
                if (!value) setFullnameError('Please enter a full name')
                else if (value.trim().length < 2) setFullnameError('Please enter your full name with no less than 2 characters');
                else setFullnameError('');
                break;
            case 'phoneNumber':
                const phoneRegex = /^0\d{8,9}$/; 
                if (!value) setPhoneNumberError('Please enter a phone number so we can call for any delivery issues');
                else if (!phoneRegex.test(value)) setPhoneNumberError('Please enter a valid 9-digit or 10-digit phone number starting with 0');
                else setPhoneNumberError('')
                break;
            case 'city':
                if (!selectedCity) setCityError('Please select a city');
                else setCityError('');
                break;
            case 'district':
                if (!selectedDistrict) setDistrictError('Please select a district');
                else setDistrictError('');
                break;
            case 'ward':
                if (!selectedWard) setWardError('Please select a ward');
                else setWardError('');
                break;
            case 'streetName':
                if (!value) setStreetNameError('Please enter a street name');
                else setStreetNameError('');
                break;
            default:
                break;
        }
    };

    const saveInfomation = () => {
        validateField('fullname');
        validateField('phoneNumber');
        validateField('city');
        validateField('district');
        validateField('ward');
        validateField('streetName');

        if (!fullnameError && !phoneNumberError && !cityError && !districtError && !wardError && !streetNameError) {
            console.log('Save information');

        }
    };

    return (
        <View style={st.container}>
            {/* Header */}
            <BaseHeader title="Add an address to order" showLeftButton={true} onLeftButtonPress={() => { navigation.goBack() }} />

            {/* Description */}
            <View style={st.descriptionContainer}>
                <Image source={require('../assets/icons/ic_lock.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
                <Text style={{ color: '#008D42', fontSize: 12, fontWeight: 'semibold' }}>All data is encripted</Text>
            </View>

            {/* Shipping benefit */}
            <View style={st.shippingContainer}>
                <View style={st.shippingItem}>
                    <Image source={require('../assets/icons/ic_greenCheck.png')} resizeMode='contain' style={{ width: 15, height: 15 }} />
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#008D42' }}>Free shipping</Text>
                </View>
                <Text style={{ fontSize: 12, color: '#737373' }}>|</Text>
                <View style={st.shippingItem}>
                    <Image source={require('../assets/icons/ic_greenCheck.png')} resizeMode='contain' style={{ width: 15, height: 15 }} />
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#008D42' }}>Return if item damaged</Text>
                </View>
            </View>

            {/* Input fields */}
            <View style={st.inputContainer}>
                {/* fullname */}
                <Text style={st.label}>
                    Full name {' '}
                    <Text style={{ color: '#F91616' }}>*</Text>
                    {' '}(First and last name)
                </Text>
                <TextField
                    placeholder="Enter a fullname"
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
                    Phone number {' '}
                    <Text style={{ color: '#F91616' }}>*</Text>
                </Text>
                <TextField
                    type={TextFieldType.PHONENUMBER}
                    placeholder="Enter a phone number"
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
                    City {' '}
                    <Text style={{ color: '#F91616' }}>*</Text>
                </Text>
                <TextField
                    type={TextFieldType.DROPDOWN}
                    placeholder="Select a city"
                    customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }}
                    value={selectedCity ? selectedCity.name : 'Select'}
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
                    District {' '}
                    <Text style={{ color: '#F91616' }}>*</Text>
                </Text>
                <TextField
                    type={TextFieldType.DROPDOWN}
                    placeholder="Select a district"
                    customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }}
                    value={selectedDistrict ? selectedDistrict.name : 'Select'}
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
                    Ward {' '}
                    <Text style={{ color: '#F91616' }}>*</Text>
                </Text>
                <TextField
                    type={TextFieldType.DROPDOWN}
                    placeholder="Select a ward"
                    customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }}
                    value={selectedWard ? selectedWard.name : 'Select'}
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
                    Street name {' '}
                    <Text style={{ color: '#F91616' }}>*</Text>
                </Text>
                <TextField
                    placeholder="Enter street name, building, house no., unit, floor, etc"
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
            <FilledButton title="Save" customStyle={{ alignSelf: 'center', backgroundColor: '#EE640F', width: ScreenSize.width - 40, marginVertical: 20 }} onPress={() => { saveInfomation() }} />

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
})