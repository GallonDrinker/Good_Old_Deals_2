import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

export default function Slider({sliderList}) {
  return (
    <View>
        
      <FlatList
            data={sliderList}
            horizontal={true}
            renderItem = {({item,index})=>(
                <View className='mt-5'>
                    
                   <Image source={{uri: item?.image}}
                        className='h-[200px] w-[300px] mr-3 rounded-lg object-contain'
                        // style={{ height: 200, width: 300, marginRight: 3, borderRadius: 10 }}
                   />
                </View>
            )}
            //keyExtractor={(item, index) => index.toString()}
        />
    </View>
  )
}