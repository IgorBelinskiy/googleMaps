import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import markerLogo from '../../../assets/icon/marker.svg';
import {hasLocationPermission} from '../../helpers/helpers';

const GoogleMapScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [location, setLocation] = useState(null);
  const isDarkMode = useColorScheme() === 'dark';
  const styles = StyleSheet.create({
    container: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      flex: 1,
      alignItems: 'center',
    },
    containerMap: {
      height: '100%',
      width: '100%',
    },
    map: {
      height: '100%',
      width: '100%',
    },
  });
  const getLocationData = async () => {
    const hasPermission = await hasLocationPermission();
    if (hasPermission) {
      Geolocation.getCurrentPosition(
        ({coords: {latitude, longitude}}) => {
          setLocation({latitude, longitude});
          setLoading(false);
        },
        error => {
          Alert.alert(`Code ${error.code}`, error.message);
          console.log(error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
        },
      );
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    getLocationData();
  }, []);
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {!loading && (
        <View style={styles.containerMap}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              icon={markerLogo}
            />
          </MapView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default GoogleMapScreen;
