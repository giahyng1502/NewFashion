import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import BaseHeader from '../components/BaseHeader'
import TextField, { TextFieldType } from '../components/TextField'
import ScreenSize from '../contants/ScreenSize'
import FilledButton from '../components/FilledButton'

const AddAddressScreen = ({ navigation }) => {
    const [fullname, setFullname] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')
    const [streetName, setStreetName] = useState('')

    //errorLabel
    const [fullnameError, setFullnameError] = useState('')
    const [phoneNumberError, setPhoneNumberError] = useState('')
    const [cityError, setCityError] = useState('')
    const [districtError, setDistrictError] = useState('')
    const [wardError, setWardError] = useState('')
    const [streetNameError, setStreetNameError] = useState('')

    const validate = () => {
        let isValid = true
        if (fullname === '') {
            setFullnameError('Please enter a fullname')
            isValid = false
        }
        if (phoneNumber === '') {
            setPhoneNumberError('Please enter a phone number so we can call for any delivery issues.')
            isValid = false
        }
        if (city === '') {
            setCityError('Please select a city')
            isValid = false
        }
        if (district === '') {
            setDistrictError('Please select a district')
            isValid = false
        }
        if (ward === '') {
            setWardError('Please select a ward')
            isValid = false
        }
        if (streetName === '') {
            setStreetNameError('Please enter a street name')
            isValid = false
        }
        return isValid
    }

    const saveInfomation = () => {
        if (validate()) {
            //save to database
        }
    }

    return (
        <View style={st.container}>
            <BaseHeader title="Add an address to order" showLeftButton={true} onLeftButtonPress={() => { navigation.goBack() }} />

            <View style={st.descriptionContainer}>
                <Image source={require('../assets/icons/ic_lock.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
                <Text style={{ color: '#008D42', fontSize: 12, fontWeight: 'semibold' }}>All data is encripted</Text>
            </View>

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

            <View style={st.inputContainer}>
                {/* fullname */}
                <Text style={st.label}>
                    Full name {' '}
                    <Text style={{ color: '#F91616' }}>*</Text>
                    {' '}(First and last name)
                </Text>
                <TextField placeholder="Enter a fullname" customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }} onChangeText={setFullname} error={fullnameError.length > 0} />
                {fullnameError &&
                    <View style={st.errorContainer}>
                        <Image source={require('../assets/icons/ic_warningValidate.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
                        <Text style={st.errorLabel}>{fullnameError}</Text>
                    </View>
                }

                {/* phoneNumber */}
                <Text style={st.label}>
                    Phone number {' '}
                    <Text style={{ color: '#F91616' }}>*</Text>
                </Text>
                <TextField type={TextFieldType.PHONENUMBER} placeholder="Enter a phone number" customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }} onChangeText={setPhoneNumber} error={phoneNumberError.length > 0} />
                {phoneNumberError &&
                    <View style={st.errorContainer}>
                        <Image source={require('../assets/icons/ic_warningValidate.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
                        <Text style={st.errorLabel}>{phoneNumberError}</Text>
                    </View>
                }

                {/* city */}
                <Text style={st.label}>
                    City {' '}
                    <Text style={{ color: '#F91616' }}>*</Text>
                </Text>
                <TextField type={TextFieldType.DROPDOWN} placeholder="Select a city" customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }} onChangeText={setCity} error={cityError.length > 0} />
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
                <TextField type={TextFieldType.DROPDOWN} placeholder="Select a district" customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }} onChangeText={setDistrict} error={districtError.length > 0} />
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
                <TextField type={TextFieldType.DROPDOWN} placeholder="Select a ward" customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }} onChangeText={setWard} error={wardError.length > 0} />
                {wardError &&
                    <View style={st.errorContainer}>
                        <Image source={require('../assets/icons/ic_warningValidate.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
                        <Text style={st.errorLabel}>{wardError}</Text>
                    </View>
                }

                {/* fullname */}
                <Text style={st.label}>
                    Street name {' '}
                    <Text style={{ color: '#F91616' }}>*</Text>
                </Text>
                <TextField placeholder="Enter street name, building, house no., unit, floor, etc" customStyle={{ width: ScreenSize.width - 40, marginTop: 4 }} onChangeText={setStreetName} error={streetNameError.length > 0} />
                {streetNameError &&
                    <View style={st.errorContainer}>
                        <Image source={require('../assets/icons/ic_warningValidate.png')} resizeMode='contain' style={{ width: 16, height: 16 }} />
                        <Text style={st.errorLabel}>{streetNameError}</Text>
                    </View>
                }
            </View>

            <FilledButton title="Save" customStyle={{alignSelf: 'center', backgroundColor: '#EE640F', width: ScreenSize.width - 40, marginVertical: 20 }} onPress={() => {saveInfomation()}} />
        </View>
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
        flex: 1
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
        gap: 5
    },
    errorLabel: {
        fontSize: 12,
        fontWeight: 'semibold',
        color: '#F91616',
    }
})