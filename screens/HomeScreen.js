import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MainScreen from '../src/screens/MainScreen/MainScreen';
const HomeScreen = ({navigation}) => {
  const { colors } = useTheme();
  const theme = useTheme();
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
        <MainScreen theme={theme}/>
      </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
