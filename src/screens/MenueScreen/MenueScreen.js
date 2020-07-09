import React, { Component } from 'react';
import {
    View , 
    StyleSheet,
    Text } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/free-solid-svg-icons'
    
export default class SecondScreen extends Component{
    static navigationOptions = ({ navigation }) => ({
        title: "Settings",
        headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
        drawerIcon:
        <FontAwesomeIcon icon={ faAddressBook } style={[styles.icon]} />
   

    })
    render(){   
    return(
        <View style={styles.container}>
            <Text>Writehere</Text>
        </View>
    );
 }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems: 'center',
    },
});
