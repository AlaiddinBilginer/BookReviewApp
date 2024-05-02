import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Categories = ({categoryList}) => {
  const navigation = useNavigation();
  return (
    <View className='mt-3'>
      <Text className='font-bold text-[20px] mt-2 mb-2'>Categories</Text>
      <FlatList 
        data={categoryList}
        numColumns={4}
        renderItem={({item, index})=> (
            <TouchableOpacity 
              onPress={() => navigation.navigate('item-list', {
                category: item.name
              })}
              className='flex-1 m-1 p-2 bg-white border border-gray-300 rounded shadow-lg items-center justify-center h-[120px]'>
                <Image source={{uri: item.icon}} 
                  className='w-[40px] h-[60px]'
                />
                <Text className='text-[12px] mt-1 text-center'>{item.name}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Categories;