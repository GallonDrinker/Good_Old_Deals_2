import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../pages/HomeScreen';
import ItemList from '../pages/ItemList';
import ProductDetail from '../pages/ProductDetail';

const Stack = createStackNavigator();

export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='home' component={HomeScreen}
            options={{
                headerShown:false
            }}
        />
        <Stack.Screen name='item-list' component={ItemList}
            options={({ route }) => ({title: route.params.category,
                headerStyle:{
                    backgroundColor:'#02d170'}})}
            //options={({ route }) => console.log(route)}
            
            
        />
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