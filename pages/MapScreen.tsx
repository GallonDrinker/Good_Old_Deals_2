// MapScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen: React.FC<{ route: any }> = ({ route }) => {
  const userLocation = route.params.userLocation;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
          }}
          title="Your Location"
          description="This is your current location"
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

