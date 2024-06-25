import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { FontAwesome6 } from '@expo/vector-icons';

export default function Header() {
  const{user} = useUser();
  return (
    <View>

      {/* User info Selection*/}
      <View className="flex flex-row gap:2">
        <Image source={{ uri: user?.imageUrl }}
          className='rounded-full w-12 h-12'
        />

        <View>
          <Text className='text-[16px]'>Welcome</Text>
          <Text className='text-[20px] font-bold'> {user?.fullName}</Text>
        </View>
      </View>


      {/* Search Bar */}
      <View className='p-3 bg-white mt-5 rounded-full flex flex-row  items-center'>
      <FontAwesome6 name="searchengin" size={24} color="green" />
        <TextInput placeholder='Search' className='ml-2 text-[18px]'
            onChangeText={(value)=> console.log(value)}
        />
            

      </View>


    </View>
  )
}