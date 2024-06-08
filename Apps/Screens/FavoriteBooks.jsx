import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import { app } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const FavoriteBooks = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const navigation = useNavigation();
  const db = getFirestore(app);
  const { user } = useUser();

  useEffect(() => {
    const fetchFavoriteBooks = async () => {
      try {
        const userId = user.primaryEmailAddress.emailAddress;
        const q = query(collection(db, 'UserFavoriteBooks'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const books = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        if (books.length % 2 !== 0) {
          books.push({ isPlaceholder: true });
        }
        setFavoriteBooks(books);
      } catch (error) {
        console.error('Error fetching favorite books: ', error.message);
      }
    };

    fetchFavoriteBooks();
  }, [user]);

  return (
    <View className="flex-1 p-4 mt-10">
      <FlatList
        data={favoriteBooks}
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
              <Text className="text-lg font-bold mt-3 text-sm text-center">{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default FavoriteBooks;
