import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const BookDetail = () => {
  const { params } = useRoute();
  const [book, setBook] = useState({});

  useEffect(() => {
    if (params && params.book) {
      setBook(params.book);
    }
  }, [params]);

  return (
    <ScrollView>
      <View className="flex-1 justify-center items-center p-3 m-3 bg-white border border-gray-300 rounded shadow-lg">
        <Text className="text-2xl font-bold text-center">
          {book?.title} - {book?.author}
        </Text>
        <Image
          source={{ uri: book.image }}
          className="h-96 w-64 mt-6 rounded-lg" // 96 birimi yaklaşık 384 px, 64 birimi 256 px'dir.
          resizeMode="cover"
        />
        <Text className="mt-8 text-xl font-bold text-center">Kitap Hakkında</Text>
        <Text className="mt-4 px-4 py-2 bg-green-300 text-green-900 rounded-full">Kategori: {book?.category}</Text>
        <Text className="mt-6 text-lg text-center text-gray-600 px-4">{book?.description}</Text>
      </View>
    </ScrollView>
  );
};

export default BookDetail;
