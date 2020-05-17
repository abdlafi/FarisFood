import React, { Component } from "react";
import react_native from '../../utilities/AllImports/react_native'
import native_base from '../../utilities/AllImports/native_base'
import FontAwesom from '../../utilities/AllImports/FontAwesom'
import Loader from "../../utilities/Loader";
import { callRemoteMethod } from "../../utilities/WebServiceHandler";
import Constants from "../../utilities/Constants";
import { renderIf } from "../../utilities/CommonMethods";
import Stories from "../Stories/Stories"
import mNotification from "../../services/notificationService"
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

  static navigationOptions = ({ navigation }) => ({
    title: "Settings",
    headerLeft: <Icon name="ios-menu" style={{ paddingLeft: 10 }} onPress={() => navigation.navigate('DrawerOpen')} />,
    drawerIcon:
    <FontAwesom.FontAwesomeIcon icon={ FontAwesom.faCoffee } style={[styles.icon]} />

})

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
    mNotification.requestUserPermission();
    this.setState({fcmToken : await react_native.AsyncStorage.getItem('fcmToken')});
  }
  closeDrawer() {
    this.drawer._root.close()
  }
  openDrawer() {
    this.drawer._root.open()
  }

  render() {
    return ( 
      <native_base.Drawer      
      ref={(ref) => { this.drawer = ref; }}
      content={<Sidebar navigator={this.navigator} />}
      onClose={() => this.closeDrawer()} >
              <native_base.Container> 
                <native_base.Header >
                  <native_base.Left>  
                   
                      <react_native.TouchableOpacity onPress={()=> this.openDrawer()}>
                        <FontAwesom.FontAwesomeIcon icon={ FontAwesom.faBars }  color="white" style={{marginLeft:'10%'}}/>
                      </react_native.TouchableOpacity>
                   
                  </native_base.Left>

                  <native_base.Right>
                      <react_native.TouchableOpacity>
                        <FontAwesom.FontAwesomeIcon icon={ FontAwesom.faCamera } color="white" style={{marginRight:'3%'}} />
                      </react_native.TouchableOpacity>
                  </native_base.Right>
                </native_base.Header>            
                <react_native.ScrollView
                showsVerticalScrollIndicator={false}
                >
                  {this.state.isLoading ? <Loader show={true} loading={this.state.isLoading} /> : null}
                <Stories/>
                <react_native.View style={{backgroundColor:'black',width:'100%',height:0.1,marginLeft:'3%',marginRight:'3%'}}/>
                {renderIf(this.state.noData, <react_native.Text style={{ textAlign: "center" }}>No data found.</react_native.Text>)}
                {renderIf(ConstantData.MainListData.length,
                  <react_native.FlatList
                        style={styles.fileList}
                        keyExtractor={(item, index) => item.ID}
                        data={ConstantData.MainListData}
                        showsVerticalScrollIndicator={false}
                        renderItem={itemData =>
                          <MainCard mData={itemData.item}/>
                          
                        }/>                  
                )}
                </react_native.ScrollView>
                <FooterBadge />
        </native_base.Container>
        </native_base.Drawer>
              
    );
  }
}

const styles = react_native.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },  containerDrawer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
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


