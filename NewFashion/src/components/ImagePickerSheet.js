// ImagePickerSheet.js
import React, { forwardRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';

const ImagePickerSheet = forwardRef(({ onActionSelect }, ref) => {
    return (
        <ActionSheet ref={ref}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.option} onPress={() => onActionSelect(0)}>
                    <Text style={styles.text}>Chụp ảnh</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => onActionSelect(1)}>
                    <Text style={styles.text}>Chọn từ thư viện</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => onActionSelect(2)}>
                    <Text style={[styles.text, { color: 'red' }]}>Hủy</Text>
                </TouchableOpacity>
            </View>
        </ActionSheet>
    );
});

const styles = StyleSheet.create({
    container: { padding: 20 },
    option: { paddingVertical: 15 },
    text: { fontSize: 16 },
});

export default ImagePickerSheet;
