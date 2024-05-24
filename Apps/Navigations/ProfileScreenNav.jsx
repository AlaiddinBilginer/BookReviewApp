import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/ProfileScreen';
import FavoriteBooks from '../Screens/FavoriteBooks';

const Stack = createStackNavigator();

export default function ProfileScreenNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="profile-tab"
        options={{
          headerShown: false,
        }}
        component={ProfileScreen}
      />
      <Stack.Screen
        name="favorite-books"
        options={{
          headerStyle: {
            backgroundColor: '#75A47F',
          },
          headerTintColor: '#fff',
          headerTitle: 'Favori Kitaplarım',
        }}
        component={FavoriteBooks}
      />
    </Stack.Navigator>
  );
}
