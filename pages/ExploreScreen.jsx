import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getFirestore, orderBy, query,getDocs } from 'firebase/firestore'
import{app} from './../FirebaseConfig'
import LatestItemList from '../Components/HomeScreen/LatestItemList';
import { ScrollView } from 'react-native';

export default function ExploreScreen() {
   const db= getFirestore(app);
   const[productList, setproductList] = useState([]);


   useEffect(()=>{
    getAllProducts();
   },[])

   const getAllProducts=async()=>{
    setproductList([]);
    const q=query(collection(db,'UserPost'),orderBy('createdAt','desc'));

    const snapshot = await getDocs(q);

    snapshot.forEach((doc) =>{
      console.log(doc.data());
      setproductList(productList=>[...productList,doc.data()]);
    })
   }
  return (
    <ScrollView className='p-5 py-8'>
      <Text className='text-[24px] font-bold'>ExploreScreen</Text>
      <LatestItemList latestItemList={productList}/>
    </ScrollView >
  )
}