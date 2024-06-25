import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';

import React from 'react';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
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
      <Image source={require('./../assets/images/LandingBG.jpg')}
            className=" w-full  h-2/4 object-cover"/>
        <View className='p-8 bg-white mt-[-20px] rounded-t-3xl shadow-md'>
            <Text className="text-[35px] text-center text-lime-800 font-bold" > Good Old Deals</Text>
            <Text className='text-[18px] text-slate-500 mt-6'>Buy Sell Marketplace where you can sell old item and make real money</Text>
            <TouchableOpacity onPress={onPress} className='p-4 mt-10  bg-green-300 rounded-full'>
                <Text className=' text-center font-semibold'>Get Started</Text>
            </TouchableOpacity>
            </View>
    </View>
  )
}