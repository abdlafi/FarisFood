import React from 'react';
import react_native from './src/utilities/AllImports/react_native'
import MainScreen from './src/screens/MainScreen/MainScreen';
import Second from './src/screens/SecondScreen/SecondScreen'

export default class App extends React.Component {
 
  render() {
    return (
      <Second/>
    );
  }
}

const styles = react_native.StyleSheet.create({
 
});
  