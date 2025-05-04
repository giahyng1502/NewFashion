import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const PasswordStrengthBar = ({ password, customStyle, onChangeText }) => {
    const getPasswordStrength = (password) => {
        const minLength = 8;
        let strength = 0;

        if (password.length >= minLength) {
            strength += 1;
        }

        if (/[A-Z]/.test(password)) {
            strength += 1;
        }

        if (/[a-z]/.test(password)) {
            strength += 1;
        }

        if (/[0-9]/.test(password)) {
            strength += 1;
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            strength += 1;
        }

        switch (strength) {
            case 1:
                onChangeText('Yếu');
                break
            case 2:
                onChangeText('Trung bình');
                break
            case 3:
                onChangeText('Tốt');
                break
            case 4:
                onChangeText('Mạnh');
                break
            default:
                onChangeText('');
        }

        return strength;
    };

    const strength = getPasswordStrength(password);

    // const getStrengthLabel = () => {
        
    // };

    // useEffect(() => {
    //     getStrengthLabel();
    // }, []);

    const getStrengthColor = () => {
        switch (strength) {
            case 1:
                return '#DF0808';
            case 2:
                return '#EE640F';
            case 3:
                return '#EF9E1C';
            case 4:
                return '#239759';
            default:
                return 'lightgray';
        }
    };

    return (
        <View style={[styles.container, customStyle]}>
            <ProgressBar progress={strength / 4} color={getStrengthColor()} style={styles.progressBar} />
        </View>
    );
};

export default PasswordStrengthBar;

const styles = StyleSheet.create({
    container: {
    },
    progressBar: {
        height: 8,
        borderRadius: 8,
        backgroundColor: 'lightgray',
    },
    strengthLabel: {
        marginTop: 5,
        fontSize: 12,
        color: 'gray',
        textAlign: 'right',
    },
});
