import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import BooksScreen from '../Screens/BooksScreen';
import WritersScreen from '../Screens/WritersScreen';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreenStackNav from './HomeScreenStackNav';
import BookListScreenStackNav from './BookListScreenStackNav';
import WriterListScreenStackNav from './WriterListScreenStackNav';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#41B06E',
      }}
    >
      <Tab.Screen
        name="home-nav"
        component={HomeScreenStackNav}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color: color, fontSize: 12, marginBottom: 4 }}>Ana Sayfa</Text>,
          tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="books"
        component={BookListScreenStackNav}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color: color, fontSize: 12, marginBottom: 4 }}>Kitaplar</Text>,
          tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="bookshelf" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="writers"
        component={WriterListScreenStackNav}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color: color, fontSize: 12, marginBottom: 4 }}>Yazarlar</Text>,
          tabBarIcon: ({ color, size }) => <Entypo name="pencil" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color: color, fontSize: 12, marginBottom: 4 }}>Profil</Text>,
          tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
