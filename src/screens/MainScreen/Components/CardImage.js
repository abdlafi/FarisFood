/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
//import {WebView} from 'react-native-webview'
import { 
  Container, Header, Content, Card, CardItem, 
  Thumbnail, Button, Icon, Left, Body, Right 
} from 'native-base';
import { renderIf, renderIfElse } from "../../../utilities/CommonMethods";
import  Constants  from "../../../utilities/Constants";



export default class CardImage extends Component {
  state = {
    fullImage: "",
    tempList: [],
  }
  
  
  render() { 
    //this.state.DataList.Item.guid   
    return (
        <Content>
          <View> 
            <CardItem>
              <Left style={styles.container}> 
              
                <Thumbnail source={{
                uri:
               "http://apps.prosysjo.com:1980/AssabeelRSS/AlDstor/icone/Localities.jpg" != null
                    ? "http://apps.prosysjo.com:1980/AssabeelRSS/AlDstor/icone/Localities.jpg"
                    : Constants.URL.PLACEHOLDER_IMAGE 
              }} /> 
                <Body>
                  <Text>{this.props.DataList.title}</Text>
                  <Text note>محليات</Text>
                </Body>  
              </Left> 
            </CardItem>    
            <CardItem cardBody> 

            {renderIfElse(typeof this.props.DataList['fullImage'] !== 'undefined', 
            <Image   
            source={{      
              uri:     
              this.props.DataList.fullImage != null
                  ? this.props.DataList.fullImage[0] 
                  : "http://apps.prosysjo.com:1980/AssabeelRSS/AlDstor/icone/A.jpg"
            }}   
            style={{height: 375, width: null, flex: 1}}/>
            ,
            null
            )} 
            </CardItem> 
            <CardItem>
              <Left> 
                <Button transparent> 
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text> 
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text> 
              </Right>
            </CardItem>
          </View>
        </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flexDirection:'row-reverse',
  },
});


