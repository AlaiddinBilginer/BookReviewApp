import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import BooksIcon from '../../assets/images/books.png';
import LogoutIcon from '../../assets/images/logout.png';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { user } = useUser();

  const navigation = useNavigation();
  const { isLoaded, signOut } = useAuth();

  const menuList = [
    {
      id: 1,
      name: 'Favori Kitaplarım',
      icon: BooksIcon,
      path: 'favorite-books',
    },
    {
      id: 2,
      name: 'Çıkış Yap',
      icon: LogoutIcon,
    },
  ];

  const onMenuPress = (item) => {
    if (item.name === 'Çıkış Yap') {
      signOut();
      return;
    }
    item?.path ? navigation.navigate(item.path) : null;
  };
  return (
    <View className="p-5 bg-white flex-1">
      <View className="items-center mt-20">
        <Image source={{ uri: user?.imageUrl }} className="w-[100px] h-[100px] rounded-full" />
        <Text className="font-bold text-[25px] mt-6">{user?.fullName}</Text>
        <Text className="text-[17px] mt-1 text-gray-500">
          {user?.primaryEmailAddress.emailAddress}
        </Text>
      </View>

      <FlatList
        data={menuList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            className="flex-1 p-5 border-[1px] items-center mt-10 mx-5 rounded-xl border-green-500 bg-green-50"
            onPress={() => onMenuPress(item)}
          >
            {item.icon && <Image source={item?.icon} className="w-[50px] h-[50px]" />}
            <Text className="text-[15px] mt-2 text-green-900">{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
