import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function BooksScreen() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const db = getFirestore(app);

  const navigation = useNavigation();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const books = [];
    const snapshot = await getDocs(collection(db, 'Books'));
    snapshot.forEach((doc) => {
      books.push(doc.data());
    });

    if (books.length % 2 !== 0) {
      books.push({ isPlaceholder: true });
    }
    setItems(books);
    setFilteredItems(books);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = items.filter((item) => item.title?.toLowerCase().includes(query.toLowerCase()));
    if (filtered.length % 2 !== 0) {
      filtered.push({ isPlaceholder: true });
    }
    setFilteredItems(filtered);
  };

  return (
    <View className="flex-1 p-4 mt-10">
      <TextInput className="border border-gray-300 rounded p-2 mb-4" placeholder="Kitap Ara" value={searchQuery} onChangeText={handleSearch} />
      <FlatList
        data={filteredItems}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          if (item.isPlaceholder) {
            return <View className="flex-1 m-2" />;
          }

          return (
            <TouchableOpacity
              className="flex-1 m-2 p-3 bg-white border border-gray-300 rounded shadow-lg"
              onPress={() =>
                navigation.push('book-detail', {
                  book: item,
                  title: item.title,
                })
              }
            >
              <Image source={{ uri: item.image }} className="w-full h-60 rounded" />
              <Text className="text-lg font-bold mt-3 text-[15px] text-center">{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
