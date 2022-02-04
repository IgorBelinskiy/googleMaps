import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import GoogleMapScreen from './src/screens/GoogleMapScreen/GoogleMapScreen';
import {hasLocationPermission} from './src/helpers/helpers';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    hasLocationPermission();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{headerTitleAlign: 'center'}}
          name="Google Map"
          component={GoogleMapScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
