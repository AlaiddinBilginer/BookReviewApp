import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoriteBooks from '../Screens/FavoriteBooks';
import BookDetail from '../Screens/BookDetail';

const Stack = createStackNavigator();

export default function FavoriteBookListNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="favorite-books"
        options={{
          headerShown: false,
        }}
        component={FavoriteBooks}
      />
      <Stack.Screen
        name="book-detail"
        component={BookDetail}
        options={({ route }) => ({
          title: route.params.title,
          headerStyle: {
            backgroundColor: '#75A47F',
          },
          headerTintColor: '#fff',
        })}
      />
    </Stack.Navigator>
  );
}
