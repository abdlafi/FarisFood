import React, { Component } from "react";
import react_native from '../../utilities/AllImports/react_native'
import native_base from '../../utilities/AllImports/native_base'
import FontAwesom from '../../utilities/AllImports/FontAwesom'
import Loader from "../../utilities/Loader";
import { callRemoteMethod } from "../../utilities/WebServiceHandler";
import Constants from "../../utilities/Constants";
import { renderIf } from "../../utilities/CommonMethods";
import Stories from "../Stories/Stories"
//import mNotification from "../../services/notificationService"
import MainCard from './Components/MainCard'
import FooterBadge from './Components/FooterBadge';
import Sidebar from './Components/Sidebar';
import ConstantData from '../../utilities/ConstantData'

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
    MainXMLData : [],
    ListCount : 0,
  }
  GetMainData = () => {    
      var endpoint = Constants.URL.BASE_URL;
      callRemoteMethod(this, endpoint, {}, "MainSearchCallback", "GET", true,Constants.Enums.API.Main_XML,true);
  };
  MainSearchCallback = (response) => {
    if (response.length) { 
      this.setState({ noData: false }); 
      this.setState({ MainXMLData: response });
      this.GetSecondaryData();
    } else { 
      this.setState({ MainXMLData: [] });
      this.setState({ DataList: [] });
      this.setState({ noData: true });
    }
  };
  GetSecondaryData = () => {    
    for(let i = 0 ; i< this.state.MainXMLData.length-1;i++){
      var endpoint = this.state.MainXMLData[i].link[0]
      this.setState({ ListCount: this.state.MainXMLData[i].Count[0] });
      callRemoteMethod(this,endpoint , {}, "secondarySearchCallback", "GET", true,Constants.Enums.API.Secodary_XML,true);
    }
  };
  secondarySearchCallback = (response) => {
    if (response.length) { 
      for(let i =0;i<this.state.ListCount;i++){
        this.setState({ DataList: this.state.DataList.concat(response[i])});
      }
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
    //this.GetMainData(); 
    //mNotification.requestUserPermission();
    this.setState({fcmToken : await react_native.AsyncStorage.getItem('fcmToken')});
  }
  render() {
    const { colors } = this.props.theme;
    return ( 
                <react_native.ScrollView showsVerticalScrollIndicator={false}>
                  {this.state.isLoading ? <Loader show={true} loading={this.state.isLoading} /> : null}
                <Stories theme={this.props.theme}/>
                <react_native.View style={{backgroundColor:colors.text,width:'100%',height:0.1,marginLeft:'3%',marginRight:'3%'}}/>
                {renderIf(this.state.noData, <react_native.Text style={{ textAlign: "center" }}>No data found.</react_native.Text>)}
                {renderIf(ConstantData.MainListData.length,
                  <react_native.FlatList
                        style={styles.fileList}
                        keyExtractor={(item, index) => item.ID}
                        data={ConstantData.MainListData}
                        showsVerticalScrollIndicator={false}
                        renderItem={itemData =>
                          <MainCard theme={this.props.theme} mData={itemData.item}/>                          
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


