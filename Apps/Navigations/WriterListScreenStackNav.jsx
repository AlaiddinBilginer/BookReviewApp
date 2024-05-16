import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WritersScreen from '../Screens/WritersScreen';
import WriterDetail from '../Screens/WriterDetail';

const Stack = createStackNavigator();

const WriterListScreenStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="writers"
        component={WritersScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="writer-detail"
        component={WriterDetail}
        options={({ route }) => ({
          title: route.params.name,
          headerStyle: {
            backgroundColor: '#75A47F',
          },
          headerTintColor: '#fff',
        })}
      />
    </Stack.Navigator>
  );
};

export default WriterListScreenStackNav;
