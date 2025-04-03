/* import { Provider as PaperProvider, configureFonts, DefaultTheme } from 'react-native-paper';
import LoginForm from '.app/(tabs)/index.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';      
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './app/(tabs)/index';
import Two from './app/(tabs)/two';
import Three from './app/(tabs)/three';

const Stack = createNativeStackNavigator();



const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="index" component={LoginForm} />
        <Stack.Screen name="two" component={Two} />
        <Stack.Screen name="three" component={Three} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    accent: '#03dac4', 
  },
  fonts: configureFonts({
    regular: 'Roboto',
    medium: 'Roboto-Medium',
    light: 'Roboto-Light',
    thin: 'Roboto-Thin',
  }),
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <LoginForm />
    </PaperProvider>
  );
} */