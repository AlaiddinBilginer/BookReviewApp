import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';
import { ClerkProvider } from '@clerk/clerk-expo';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

export default function App() {
    return (
        <ClerkProvider publishableKey="pk_test_ZXhjaXRpbmctbWluay05My5jbGVyay5hY2NvdW50cy5kZXYk">
            <View className="flex-1 bg-white">
                <StatusBar style="auto" />
                <SignedIn>
                    <Text>Giriş Yapıldı!</Text>
                </SignedIn>
                <SignedOut>
                    <LoginScreen />
                </SignedOut>
            </View>
        </ClerkProvider>
    );
}
