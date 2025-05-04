import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Image, StyleSheet, Keyboard } from 'react-native';

const SearchBar = ({ disable, onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);


  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(debouncedSearchText);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchText]);

  const handleTextChange = (text) => {
    setSearchText(text);
    setDebouncedSearchText(text);
  };

  const handleClearText = () => {
    setSearchText('');
    setDebouncedSearchText('');
  };

  const handleSearchButtonPress = () => {
    onSearch(searchText);
    Keyboard.dismiss();
  };

  const handleSubmitEditing = () => {
    onSearch(searchText);
    Keyboard.dismiss();
  };

  return (
      <View style={[styles.searchContainer]}>
        <TextInput
            value={searchText}
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
            placeholderTextColor={'#bbb'}
            onChangeText={handleTextChange}
            onSubmitEditing={handleSubmitEditing}
            editable={disable}
        />
        {searchText.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={handleClearText}>
              <Image source={require('../assets/bt_clearText.png')} style={styles.icon} />
            </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonPress}>
          <Image source={require('../assets/icons/ic_search.png')} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({

  searchContainer: {

    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 40
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
    color: '#000',
  },
  clearButton: {
    padding: 5,
  },
  searchButton: {
    backgroundColor: '#000',
    margin: 3,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 40
  },
  searchIcon: {
    width: 25,
    height: 25
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 7,
    resizeMode: 'contain',
  }
});

export default SearchBar;
