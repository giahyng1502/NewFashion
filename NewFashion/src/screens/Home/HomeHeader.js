import { StyleSheet, Text, View, Image,TextInput,TouchableOpacity,FlatList } from 'react-native'
import React, { useState } from 'react'

const categories = ['All', 'Women', 'Men', 'Sports', 'Kids', 'Baby', 'Office', 'Sleepwear'];

const HomeHeader = () => {
    const [selectedCategory, setSelectedCategory] = useState('All')
  
    const renderItem = ({ item }) => {
        const isSelected = item === selectedCategory;
    
        return (
            <TouchableOpacity onPress={() => setSelectedCategory(item)}>
            <View style={st.categoryItem}>
                <Text style={[st.categoryText, isSelected && st.selectedText]}>
                {item}
                </Text>
                {isSelected && <View style={st.underline} />}
            </View>
            </TouchableOpacity>
        );
    };

  return (
    <View style={st.container}>
      {/* Banner Image */}
      <View style={st.bannerContainer}>
        <Image source={require('../../assets/img_banner2.png')} style={st.bannerImage} />
      </View>

      {/* Search Bar */}
      <View style={st.searchContainer}>
        <TextInput style={st.searchInput} placeholder="Search something..." />
        <TouchableOpacity style={st.searchButton}>
            <Image source={require('../../assets/icons/ic_search.png')} style={st.searchIcon} />
        </TouchableOpacity>
      </View>

        {/* Categories */}
        <FlatList
            data={categories}
            horizontal
            keyExtractor={(item) => item}
            renderItem={renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={st.listContainer}
        />

        {/* Discount */}
        <View style={st.discountContainer}>      
            {/* Free Shipping */}
            <View style={st.infoItem}>
                <View style={st.textContainer}>
                    <Image 
                    source={require('../../assets/icons/ic_greenReturn.png')} 
                    style={st.icon} 
                    />
                    <Text style={[st.title, { color: 'green' }]}>Free shipping</Text>
                </View>
                <Text style={st.subtitle}>Limited-time offer</Text>
            </View>

            {/* Divider */}
            <View style={st.divider} />

            {/* Free Returns */}
            <View style={st.infoItem}>
                <View style={st.textContainer}>
                    <Image 
                    source={require('../../assets/ic_freeReturns.png')} 
                    style={st.icon} 
                    />
                    <Text style={st.title}>Free returns</Text>
                </View>
                <Text style={st.subtitle}>Up to 90 days*</Text>
            </View>

            {/* Divider */}
            <View style={st.divider} />

            {/* Price Adjustment */}
            <View style={st.infoItem}>
                <View style={st.textContainer}>
                    <Image 
                    source={require('../../assets/icons/ic_freeAdjust.png')} 
                    style={st.icon} 
                    />
                    <Text style={st.title}>Price adjustment</Text>
                </View>
                <Text style={st.subtitle}>Within 30 days</Text>
            </View>
        </View>

    </View>
  )
}

export default HomeHeader

const st = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  bannerContainer: {
    width: '100%',
    height: 200,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  //search
  searchContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    borderWidth:1.5,
    borderColor:'#000',
    borderRadius:40
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
  },
  searchButton: {
    backgroundColor: '#000',
    margin:3,
    padding: 8,
    paddingHorizontal:16,
    borderRadius:40
  },
  searchIcon: {
    width:25,
    height:25
  },

  //categories
  listContainer: {
    padding: 5,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryText: {
    fontSize: 18,
    color: '#737373',
    fontWeight:'bold'
  },
  selectedText: {
    color: '#000',
  },
  underline: {
    height: 5,
    backgroundColor: '#000',
    width: '80%',
    marginTop: 2,
    borderRadius: 5,
  },

  //discount
  discountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginTop:5
  },
  infoItem: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 7,
    resizeMode: 'cover',
  },
  textContainer: {
    flexDirection:'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#383838',
  },
  divider: {
    width: 1.5,
    height: 30,
    backgroundColor: '#737373',
    marginHorizontal: 5,
  },
});