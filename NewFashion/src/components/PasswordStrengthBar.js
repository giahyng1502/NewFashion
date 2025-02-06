import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const PasswordStrengthBar = ({ password, customStyle }) => {
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

        return strength;
    };

    const strength = getPasswordStrength(password);

    const getStrengthLabel = () => {
        switch (strength) {
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return '';
        }
    };

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
            <Text style={styles.strengthLabel}>{getStrengthLabel()}</Text>
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
