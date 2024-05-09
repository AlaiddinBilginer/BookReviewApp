import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ItemList from '../Screens/ItemList';
import BookDetail from '../Screens/BookDetail';

const Stack = createStackNavigator();

export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="item-list"
        component={ItemList}
        options={({ route }) => ({
          title: route.params.category,
          headerStyle: {
            backgroundColor: '#75A47F',
          },
          headerTintColor: '#fff',
        })}
      />
      <Stack.Screen
        name="book-detail"
        component={BookDetail}
        options={{
          headerStyle: {
            backgroundColor: '#75A47F',
          },
          headerTintColor: '#fff',
          headerTitle: 'Kitap Detayları',
        }}
      />
    </Stack.Navigator>
  );
}
