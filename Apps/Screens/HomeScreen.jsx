import { View, Text } from 'react-native'
import React from 'react'
import Header from '../Components/HomeScreen/Header'

export default function HomeScreen() {
  return (
    <View className="py-12 px-6 bg-white flex-1">
      <Header />
    </View>
  )
}