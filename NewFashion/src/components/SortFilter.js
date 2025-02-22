import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Menu, Button, Divider } from "react-native-paper";

const SortFilter = ({ onSortChange }) => {

    const [visible, setVisible] = useState(false);
    const [selectedSort, setSelectedSort] = useState("Relevance");

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleSortChange = (sortOption) => {
        setSelectedSort(sortOption);
        onSortChange(sortOption);
        closeMenu();
    };

    return (
        <View style={styles.container}>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <Button mode="outlined" onPress={openMenu} style={styles.button}>
                        Sort by: {selectedSort}
                    </Button>
                }
            >
                <Menu.Item
                    onPress={() => handleSortChange("Relevance")}
                    title="Relevance"
                    titleStyle={selectedSort === "Relevance" ? styles.selected : null}
                />
                <Menu.Item
                    onPress={() => handleSortChange("Top sales")}
                    title="Top sales"
                    titleStyle={selectedSort === "Top sales" ? styles.selected : null}
                />
                <Menu.Item
                    onPress={() => handleSortChange("Most recent")}
                    title="Most recent"
                    titleStyle={selectedSort === "Most recent" ? styles.selected : null}
                />
                <Divider />
                <Menu.Item
                    onPress={() => handleSortChange("Price low to high")}
                    title="Price low to high"
                    titleStyle={selectedSort === "Price low to high" ? styles.selected : null}
                />
                <Menu.Item
                    onPress={() => handleSortChange("Price high to low")}
                    title="Price high to low"
                    titleStyle={selectedSort === "Price high to low" ? styles.selected : null}
                />
            </Menu>
        </View>
    )
}

export default SortFilter

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-end",
        margin: 10,
    },
    button: {
        backgroundColor: "#f0f0f0",
        borderRadius: 6,
        borderWidth: 0,
        borderColor: "#ccc",
    },
    selected: {
        fontWeight: "bold",
    },
})