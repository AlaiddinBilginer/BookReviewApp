import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Categories = ({categoryList}) => {
  return (
    <View className='mt-3'>
      <Text className='font-bold text-[20px] mb-2'>Categories</Text>
      <FlatList 
        data={categoryList}
        numColumns={4}
        renderItem={({item, index})=> (
            <TouchableOpacity className='flex-1 items-center justify-center p-2 m-1 border-[1px] border-green-200 h-[120px] rounded-lg bg-green-50'>
                <Image source={{uri: item.icon}} 
                  className='w-[40px] h-[60px]'
                />
                <Text className='text-[12px] mt-1'>{item.name}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default Categories;