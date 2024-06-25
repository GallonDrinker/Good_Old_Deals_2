import { View, Text, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'



export default function PostItem({item}) {
    const navigation = useNavigation();
  return (
    <TouchableOpacity className='flex-1 m-1 p-2 rounded-lg border-[1px] border-y-sky-200 border-x-green-800'
    onPress={()=>navigation.push('product-detail',
    {
        product:item
    }
    )}>
              <Image source={{uri:item.image}} 
              className='w-full h-[140px] rounded-lg'
              />
              <View>
                
                <Text className='text-[15px] font-bold mt-2'>{item.title}</Text>
                <Text className='teext-[20px] font-bold text-green-900'>${item.price}</Text>
                <Text className=' text-purple-900 bg-fuchsia-100  mt-1 p-1 rounded-xl px-3 w-[100px]'>{item.category}</Text>

              </View>
          </TouchableOpacity>
  )
}