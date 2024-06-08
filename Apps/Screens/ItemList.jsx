import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { FlatList } from 'react-native-gesture-handler';

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { params } = useRoute();
  const db = getFirestore(app);

  const navigation = useNavigation();

  useEffect(() => {
    if (params) {
      getItemListByCategory();
    }
  }, [params]);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const getItemListByCategory = async () => {
    const q = query(collection(db, 'Books'), where('category', '==', params.category));
    const snapshot = await getDocs(q);
    const tempItems = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    if (tempItems.length % 2 !== 0) {
      tempItems.push({ isPlaceholder: true });
    }

    setItems(tempItems);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = items.filter((item) =>
      item.title?.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length % 2 !== 0) {
      filtered.push({ isPlaceholder: true });
    }

    setFilteredItems(filtered);
  };

  return (
    <View className="flex-1">
      <TextInput
        className="border border-gray-300 rounded p-2 m-5"
        placeholder="Kitap Ara"
        value={searchQuery}
        onChangeText={(text) => handleSearch(text)}
      />
      <FlatList
        data={filteredItems}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          if (item.isPlaceholder) {
            return <View className="flex-1 m-1 p-2" />;
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
              <Image source={{ uri: item.image }} className="w-full h-[300px]" />
              <View className="m-1">
                <Text className="text-lg font-bold mt-2 text-center">{item.title}</Text>
                <Text className="text-sm text-gray-500 text-center">{item.author}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
