import { View, Text, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
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

  const removeFromFavorites = async (bookId) => {
    try {
      await deleteDoc(doc(db, 'UserFavoriteBooks', bookId));
      setFavoriteBooks(favoriteBooks.filter((book) => book.id !== bookId));
      if (favoriteBooks.length % 2 !== 0) {
        favoriteBooks.push({ isPlaceholder: true });
      }
      alert('Kitap favorilerden kaldırıldı');
    } catch (error) {
      console.error('Error removing from favorites: ', error.message);
      alert('Favorilerden kaldırırken bir hata oluştu.');
    }
  };

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
            <View className="flex-1 m-2 p-3 bg-white border border-gray-300 rounded shadow-lg">
              <TouchableOpacity
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
              <Button title="Favorilerden Kaldır" onPress={() => removeFromFavorites(item.id)} />
            </View>
          );
        }}
      />
    </View>
  );
};

export default FavoriteBooks;
