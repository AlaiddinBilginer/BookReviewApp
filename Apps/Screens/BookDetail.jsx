import { View, Text, Image, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import { app } from '../../firebaseConfig';

const BookDetail = () => {
  const { params } = useRoute();
  const [book, setBook] = useState({});
  const db = getFirestore(app);
  const { user } = useUser();

  useEffect(() => {
    if (params && params.book) {
      setBook(params.book);
    }
  }, [params]);

  const addToFavorites = async () => {
    console.log(book);
    try {
      const userId = user.primaryEmailAddress.emailAddress;

      // Favorilere eklemek istediğimiz kitabın zaten favorilerde olup olmadığını kontrol etme
      const querySnapshot = await getDocs(
        query(
          collection(db, 'UserFavoriteBooks'),
          where('userId', '==', userId),
          where('title', '==', book.title)
        )
      );

      if (!querySnapshot.empty) {
        // Kullanıcı zaten bu kitabı favorilere eklemişse uyarı ver ve işlemi durdur
        alert('Bu kitap zaten favorilerinizde.');
        return;
      }

      await addDoc(collection(db, 'UserFavoriteBooks'), {
        userId,
        title: book.title,
        author: book.author,
        category: book.category,
        description: book.description,
        image: book.image,
      });
      alert('Kitap favorilere eklendi');
    } catch (error) {
      console.error('Error adding to favorites: ', error.message);
      alert('Favorilere eklerken bir hata oluştu.');
    }
  };

  return (
    <ScrollView>
      <View className="flex-1 justify-center items-center p-3 m-3 bg-white border border-gray-300 rounded shadow-lg">
        <Text className="text-2xl font-bold text-center">
          {book?.title} - {book?.author}
        </Text>
        <Image
          source={{ uri: book.image }}
          className="h-96 w-64 mt-6 rounded-lg"
          resizeMode="cover"
        />
        <Text className="mt-6 text-lg text-center text-gray-600 px-4">
          Sayfa Sayısı: {book?.page}
        </Text>

        <Text className="mt-6 text-lg text-center text-gray-600 px-4">
          Tahmini Okuma Süresi {book?.reading}
        </Text>
        <Text className="mt-8 text-xl font-bold text-center">Kitap Hakkında</Text>
        <Text className="mt-4 px-4 py-2 bg-green-300 text-green-900 rounded-full">
          Kategori: {book?.category}
        </Text>
        <Text className="mt-6 text-lg text-center text-gray-600 px-4">{book?.description}</Text>
        <Text className="mt-6 text-lg text-center text-gray-600 px-4">
          Yayın Tarihi: {book?.publicationDate}
        </Text>
        <Button title="Favorilere Ekle" onPress={addToFavorites} />
      </View>
    </ScrollView>
  );
};

export default BookDetail;
