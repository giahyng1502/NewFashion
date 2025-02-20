import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ProgressBar } from 'react-native-paper'

const Ratingbar = ({ label, percentage }) => {
    return (
        <View style={st.row}>
            <Text style={st.label}>{label}</Text>
            <ProgressBar progress={percentage / 100} color='black' style={st.progress} />
            <Text style={st.percentage}>{percentage}%</Text>
        </View>
    )
}

const ReviewDetail = () => {
    return (
        <TouchableOpacity style={st.container}>
            <Text style={st.rating}>4.5 ★★★★★ (61)</Text>
                <View style={st.editlable}>
                    <Text style={st.title}>Item reviews</Text>
                    <Text style={st.title}>See all > </Text>
                </View>
            <Ratingbar label="Small" percentage={11} />
            <Ratingbar label="True to size" percentage={86} />
            <Ratingbar label="Large" percentage={3} />
            <View style={st.line}/>
        </TouchableOpacity>
        
    )
}

export default ReviewDetail

const st = StyleSheet.create({

    container: {
        padding: 12,
        backgroundColor: "white",
      },
      rating: {
        fontSize: 18,
        fontWeight: "bold",
      },
      title: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 8,
        fontWeight: "bold",
      },
      row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 2,
      },
      label: {
        width: 100,
        fontSize: 14,
        fontWeight: "bold",
      },
      progress: {
        width: 220,
        height: 6,
        marginHorizontal: 8,
        borderRadius: 4,
      },
      percentage: {
        width: 40,
        textAlign: "right",
        fontSize: 14,
      },
      editlable:{
        flexDirection: "row",
        justifyContent:"space-between"
      },
      line:{
        marginTop: 10,
        height: 1,
        backgroundColor: "#ccc",
      },
})