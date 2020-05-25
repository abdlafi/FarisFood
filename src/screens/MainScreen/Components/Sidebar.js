/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground , 
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {  Button , Thumbnail, Content ,ListItem ,Separator ,List ,Left,Right,Icon,Body, Accordion} from 'native-base';
import ConstantData from '../../../utilities/ConstantData';
import FontAwesome from '../../../utilities/AllImports/FontAwesom';
import MainScreen from '../MainScreen';
import Second from '../../SecondScreen/SecondScreen'

export default class Sidebar extends Component {
 
  render() {
    //const { Drawer } = this.props.Drawer;
    return (
      <ScrollView style={styles.container}>
          <View style={styles.topImage}>
          <ImageBackground source={{uri: ConstantData.DrawerData.BackgroundImage}} style={styles.image}>       
              <TouchableOpacity >
                <Thumbnail large  source={{uri: ConstantData.DrawerData.UserImage}} style={styles.ThumbnailStyle}/>
                <Text style={styles.text}>{ConstantData.DrawerData.UserName}</Text>
              </TouchableOpacity>
          </ImageBackground>
          </View>
          <Content>
          <List>
          <ListItem itemDivider>
              <Text>A</Text>
            </ListItem>             

          </List>
        </Content>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginRight: 5
  },

  text: {
    color: '#fff',
    paddingBottom: '15%',
    marginLeft: '13%',
  },
  topImage: {
    flex: 1,
    flexDirection: "column"
  },
  topImageContainer:{
    flexDirection: "column",
  },
  ThumbnailStyle:{
    marginLeft:'7%',
    marginTop:'5%',
    borderRadius: 75,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#72bec5",
  },

 
  button: {
    flex:1,
    width:'100%',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    flexDirection: "column",
    justifyContent: "center"
  },
});
