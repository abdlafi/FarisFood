import React, { Component } from "react";
import react_native from '../../utilities/AllImports/react_native'
import Loader from "../../utilities/Loader";
import { callRemoteMethod } from "../../utilities/WebServiceHandler";
import Constants from "../../utilities/Constants";
import { renderIf } from "../../utilities/CommonMethods";
import Stories from "../Stories/Stories"
import mNotification from "../../services/notificationService";
import MainCard from './Components/MainCard';
import ConstantData from '../../utilities/ConstantData';
import MenueScreen from '../MenueScreen/MenueScreen'

/**
 * @author Vaibhav Padalia
 * @description This is the first screen that loads when the app starts. This screen shows the list of movies
 * according to the search query.
 */



 

export default class MainScreen extends Component {

  state = {
    DataList : [],
    isLoading: false,   // Whether loader is to be shown.
    searchText: "",     // Text that is to be searched.
    noData: false,      // If there are no results to be displayed.
    fcmToken: "",
    StoriesData : [],
    ListCount : 0,
  }
  GetChannelsData = () => {    
      var endpoint = Constants.URL.BASE_URL + Constants.API_Compleater.Profile;
      callRemoteMethod(this, endpoint, {IsActive: 1}, "ChannelsCallback", "GET", true,Constants.Enums.API.Main_XML,true);
  };

  GetMainProfilsData = () => {    
    var endpoint = Constants.URL.BASE_URL + Constants.API_Compleater.Profile_Type;
    callRemoteMethod(this, endpoint, {IsActive: 1}, "MainProfilesCallback", "GET", true,Constants.Enums.API.Main_XML,true);
};


  ChannelsCallback = (response) => {
    if (response.information.length) { 
      this.setState({ noData: false }); 
      this.setState({ StoriesData: response.information });
    } else { 
      this.setState({ StoriesData: [] });
      this.setState({ noData: true });
    }
  };

  MainProfilesCallback = (response) => {
    if (response.information.length) { 
      this.setState({ DataList: response.information});
      this.setState({ noData: false }); 
    } else { 
      this.setState({ DataList: [] });
      this.setState({ noData: true });
    }
  };
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }
  async componentDidMount() {
    this.GetChannelsData(); 
    this.GetMainProfilsData();
    mNotification.requestUserPermission();
    this.setState({fcmToken : await react_native.AsyncStorage.getItem('fcmToken')});
  }
/*
  MoveToMenue(ProfileID) {
    //this.props.navigation()
  }
*/
  render() {
    const { colors } = this.props.theme;
    return ( 
                <react_native.ScrollView showsVerticalScrollIndicator={false}>
                  {this.state.isLoading ? <Loader show={true} loading={this.state.isLoading} /> : null}
                <Stories theme={this.props.theme} StoriesData={this.state.StoriesData}/>
                <react_native.View style={{backgroundColor:colors.text,width:'100%',height:0.5,marginLeft:'3%',marginRight:'3%'}}/>
                {renderIf(this.state.noData, <react_native.Text style={{ textAlign: "center" }}>No data found.</react_native.Text>)}
                {renderIf(this.state.DataList.length,
                  <react_native.FlatList
                        style={styles.fileList}
                        keyExtractor={(item, index) => item.ID}
                        data={this.state.DataList}
                        showsVerticalScrollIndicator={false}
                        renderItem={itemData =>
                          <MainCard theme={this.props.theme} mData={itemData.item} /*MoveScreen={}*/ />                          
                        }/>                  
                )}
                </react_native.ScrollView>                    
    );
  }
}

const styles = react_native.StyleSheet.create({

  drawerHeader: {
    height: 200,
    backgroundColor: 'white'
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  }
});


