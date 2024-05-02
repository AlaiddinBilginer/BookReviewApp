import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

export default function WritersScreen() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const db = getFirestore(app);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const authors = [];
    const snapshot = await getDocs(collection(db, 'Authors'));
    snapshot.forEach((doc) => {
      authors.push(doc.data());
    });

    if (authors.length % 2 !== 0) {
      authors.push({ isPlaceholder: true });
    }
    setItems(authors);
    setFilteredItems(authors);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = items.filter((item) =>
      item.name?.toLowerCase().includes(query.toLowerCase())
    );
    if (filtered.length % 2 !== 0) {
      filtered.push({ isPlaceholder: true });
    }
    setFilteredItems(filtered);
  };

  return (
    <View className='flex-1 p-4 mt-10'>
      <TextInput
        className='border border-gray-300 rounded p-2 mb-4'
        placeholder="Yazar Ara"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredItems}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          if (item.isPlaceholder) {
            return <View className='flex-1 m-2' />;
          }

          return (
            <TouchableOpacity
              className= 'flex-1 m-2 p-3 bg-white border border-gray-300 rounded shadow-lg'
            >
              <Image
                source={{ uri: item.image }}
                className='w-full h-40 rounded'
              />
              <Text className='text-lg font-bold mt-3 text-[15px] text-center'>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
