import { View, Text, Image, TextInput } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';

export default function Header() {
  const { user } = useUser();
  return (
    <View>
      <View className="flex flex-row items-center gap-2">
        <Image source={{ uri: user?.imageUrl }} className="rounded-full w-12 h-12" />
        <View>
          <Text className="text-[16px]">Hoş Geldin!</Text>
          <Text className="text-[20px] font-bold">{user?.fullName}</Text>
        </View>
      </View>
    </View>
  );
}
