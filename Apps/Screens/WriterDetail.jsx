import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const WriterDetail = () => {
  const { params } = useRoute();
  const [writer, setWriter] = useState({});

  useEffect(() => {
    if (params && params.writer) {
      setWriter(params.writer);
    }
  }, [params]);

  return (
    <ScrollView>
      <View className="flex-1 justify-center items-center p-3 m-3 bg-white border border-gray-300 rounded shadow-lg">
        <Text className="text-2xl font-bold text-center">{writer?.name}</Text>
        <Image source={{ uri: writer.image }} className="h-96 w-64 mt-6 rounded-lg" resizeMode="cover" />
        <Text className="mt-8 text-xl font-bold text-center">{writer?.name} Hakkında</Text>
        <Text className="mt-4 px-4 py-2 bg-green-300 text-green-900 rounded-full">Doğum Tarihi: {writer?.birthDay}</Text>
        <Text className="mt-4 px-4 py-2 bg-red-300 text-green-900 rounded-full">Ölüm Tarihi: {writer?.deathDay}</Text>
        <Text className="mt-6 text-lg text-center text-gray-600 px-4">{writer?.description}</Text>
      </View>
    </ScrollView>
  );
};

export default WriterDetail;
