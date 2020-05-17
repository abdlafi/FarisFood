import React, { Component } from 'react';
import { AsyncStorage } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import {Notifications} from 'react-native-notifications';
import { customAlert } from "../utilities/CommonMethods";    


 class mNotification {
  async ReciveMsg(){  
    await messaging().onMessage(msg => {
      Notifications.postLocalNotification({ 
        title: msg.notification.title,
        body: msg.notification.body,
        sound: "default",
        extra: "data"
    });
    customAlert(msg.notification.body);
    });
  }
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
            this.setState({fcmToken : fcmToken});
        }
    }
  }
async RegesterTopic(){
  messaging()
  .subscribeToTopic('Addustour')
  .then(() => console.log('Subscribed to topic!'));
}
  async requestUserPermission() {
    try{
      const settings = await messaging().requestPermission();
  
      if (settings) {
        this.getToken();
        console.log('Permission settings:', settings);
      }
      this.RegesterTopic();
      this.ReciveMsg();
    }catch(error){
      console.log('error:', error.message);
      
    }

  }
    render(){   
    return(
       null
    );
 }
}


const Exportoin = new mNotification();
export default Exportoin;
