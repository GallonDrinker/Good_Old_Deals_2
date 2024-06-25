import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ExploreScreen from '../pages/ExploreScreen';
import ProductDetail from '../pages/ProductDetail';


const Stack= createStackNavigator();

export default function ExploreScreenStackNav() {
  return (
   <Stack.Navigator>
    <Stack.Screen name='explore-tab' component={ExploreScreen}/>
    <Stack.Screen name='product-detail' component={ProductDetail}
        options={{
            headerStyle:{
                backgroundColor:'#02d170'},
                headerTitle: 'Detail'
        }}    
    />
   </Stack.Navigator>
  )
}