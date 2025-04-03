import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

const LoadingDialog = ({loading}) => {

    return (
            <Modal
                transparent={true}
                animationType="fade"
                visible={loading}
            >
                <View style={styles.modalContainer}>
                        <ActivityIndicator size="large" color="#FA7806" />
                </View>
            </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ
    },
});

export default LoadingDialog;
