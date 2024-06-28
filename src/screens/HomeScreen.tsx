import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { userStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { ScreenContainer } from 'react-native-screens'
import { COLORS } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'

const getCategoriesFromData = (data: any) => {
    let temp: any = {}
    for (let i = 0; i < data.length; i++) {
        if (temp[data[i].name] == undefined) {
            temp[data[i].name] = 1
        } else {
            temp[data[i].name]++
        }
    }
    let categories = Object.keys(temp)
    categories.unshift('All')
    return categories
}

const getCoffeeList = (category: string, data: any) => {
    if (category == 'All') {
        return data
    } else {
        let coffeeList = data.filter((item: any) => item.name == category)
        return coffeeList
    }
}

const HomeScreen = () => {
    const CoffeeList = userStore((state: any) => state.CoffeeList)
    const BeanList = userStore((state: any) => state.BeanList)
    const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList))
    const [searchText, setSearchText] = useState(undefined)
    const [categoryIndex, setCategoryIndex] = useState({
        index: 0,
        category: categories[0],
    })
    const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList))
    const bottomTabBarHeight = useBottomTabBarHeight()

    return (
        <View style={styles.screenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewFlex}
            >
                {/* App Header */}
                <HeaderBar title='Home Screen'/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex
    },
    scrollViewFlex: {
        flexGrow: 1
    }
})

export default HomeScreen