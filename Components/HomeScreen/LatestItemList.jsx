import { View, Text, FlatList, Image, ScrollView, TouchableOpacity, ViewComponent } from 'react-native'
import React from 'react'
import PostItem from './PostItem'


export default function LatestItemList({latestItemList,heading}) {
  return (
    <View className='mt-3'>
      <Text className='font-bold text-[20px]'>{heading}</Text>
      <FlatList
        data={latestItemList}
        numColumns={2}
        renderItem={({item,index}) => (
          // <TouchableOpacity className='flex-1 m-1 p-2 rounded-lg border-[1px] border-y-sky-200 border-x-green-800'>
          //     <Image source={{uri:item.image}} 
          //     className='w-full h-[140px] rounded-lg'
          //     />
          //     <View>
                
          //       <Text className='text-[15px] font-bold mt-2'>{item.title}</Text>
          //       <Text className='teext-[20px] font-bold text-green-900'>${item.price}</Text>
          //       <Text className=' text-purple-900 bg-fuchsia-100  mt-1 p-1 rounded-xl px-3 w-[100px]'>{item.category}</Text>
                
          //     </View>
          // </TouchableOpacity>
         <PostItem item={item} />
        )}
      />  
    </View>
  )
}