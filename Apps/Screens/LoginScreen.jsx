import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {

    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);

    return (
        <View>
            <Image  source={require('../../assets/images/login.png')}
                className="w-full h-[250px] object-cover mt-16"
            />
            <View className="p-7 bg-white mt-[15px]">
                <Text className="text-[40px] font-bold">Kitap Rehberi</Text>
                <Text className="text-[16px] text-slate-500 mt-7">Binlerce kitap incelemesi arasında gezinerek yeni okuma maceralarına adım atın.</Text>
                <TouchableOpacity onPress={onPress} className="p-3 bg-blue-500 rounded-full mt-20">
                    <Text className="text-white text-center text-[18px]">Başla</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;