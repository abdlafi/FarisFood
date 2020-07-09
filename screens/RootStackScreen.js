import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import MenueScareen from '../src/screens/MenueScreen/MenueScreen'
import { View } from 'react-native-animatable';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
        <RootStack.Navigator headerMode='float'>

            <RootStack.Screen  name="SplashScreen" component={SplashScreen} 
            options={{headerShown: false}}
            />
            <RootStack.Screen name="SignInScreen" component={SignInScreen}
            options={{headerShown: false}}
            />
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>

            <RootStack.Screen name="MenueScareen" component={MenueScareen}/>
        </RootStack.Navigator>
  
);

export default RootStackScreen;