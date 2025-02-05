import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BenefitsInfoBox from '../components/BenefitsInfoBox'
import FilledButton from '../components/FilledButton'
import ScreenSize from '../contants/ScreenSize'
import OutlinedButton from '../components/OutlinedButton'
import TextField from '../components/TextField'

const TestScreen = () => {
    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <BenefitsInfoBox icon={require('../asset/ic_freeReturns.png')} title="Free returns" subtitle="Up to 90 days" />
            <BenefitsInfoBox icon={require('../asset/ic_freeShipping.png')} title="Free shipping" subtitle="On all orders" />

            <FilledButton title="Continue" customStyle={{ backgroundColor: 'black', width: ScreenSize.width - 40, marginTop: 20 }} />
            <OutlinedButton icon={require('../asset/ic_freeShipping.png')} title="Sign in" customStyle={{ width: ScreenSize.width - 40, marginTop: 20 }} />
            <TextField placeholder="Enter your email" customStyle={{ width: ScreenSize.width - 40, marginTop: 20 }} />
            <TextField isPassword={true} placeholder="Enter your password" customStyle={{ width: ScreenSize.width - 40, marginTop: 20 }} />
        </View>
    )
}

export default TestScreen

const styles = StyleSheet.create({})