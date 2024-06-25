import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';

export default function ProductDetail() {
    const {params} = useRoute();
    const [product,setProduct]= useState([]);

    useEffect(()=>{
        console.log(params);
        params&&setProduct(params.product);
    },[params])

    const sendEmailMessage=()=>{
        const subject = 'Regarding ' + product.title;
        const body = "Hello" +product.userName+"\n"+"I am looking forward to this product"
        Linking.openURL('mailto: ' +product.userEmail+"?subject="+subject+"&body="+body)
    }
  return (
    <ScrollView>
      <Image source={{uri:product.image}}
            className='h-[340px] w-full'
      />
      <View className='p-3'>
        
        <Text className='text-[24px] font-bold'>{product?.title}</Text>
        <View className=' items-baseline'>
            <Text className=' text-purple-900 bg-fuchsia-100  mt-1 p-1 rounded-full px-3 '>{product.category}</Text>
        </View>
        <Text className='mt-3   text-center font-semibold text-[20px]'>Description</Text>
        <Text className='mt-1 text-[15px] '>{product?.desc}</Text>
      </View>


                              {/* USER Info */}
        <View className='p-3 flex flex-row items-center gap-3' >
            <Image source ={{uri:product.userImage}}
                className=' w-10 h-10 rounded-full'
            />
            <View>
               <Text className='font-bold text-[18px]'>{product.userName} </Text> 
               <Text>{product.userEmail} </Text> 
            </View>
        </View>
        <TouchableOpacity 
            onPress={() => sendEmailMessage()}
        className='z-10 p-3 m-2 bg-emerald-300 rounded-full'>
            <Text className='text-center'>Send Message</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}