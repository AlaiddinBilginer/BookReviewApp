import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BooksScreen from '../Screens/BooksScreen';
import BookDetail from '../Screens/BookDetail';

const Stack = createStackNavigator();

const BookListScreenStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="books"
        component={BooksScreen}
        options={{
          headerShown: false,
        }}
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
};

export default BookListScreenStackNav;
