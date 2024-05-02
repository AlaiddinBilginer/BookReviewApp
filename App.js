import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';
import { ClerkProvider } from '@clerk/clerk-expo';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Apps/Navigations/TabNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // GestureHandlerRootView ekle

export default function App() {
    return (
        <ClerkProvider publishableKey="pk_test_ZXhjaXRpbmctbWluay05My5jbGVyay5hY2NvdW50cy5kZXYk">
            <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar style="auto" />
                <SignedIn>
                    <NavigationContainer>
                        <TabNavigation />
                    </NavigationContainer>
                </SignedIn>
                <SignedOut>
                    <LoginScreen />
                </SignedOut>
            </GestureHandlerRootView>
        </ClerkProvider>
    );
}
