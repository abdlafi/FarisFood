import { customAlert } from "./CommonMethods";
import  Constants  from './Constants'
/**
 * @param {*} obj scope of the class from where it is called.
 * @param {*} endpoint API endpoint.
 * @param {*} data Body if data is to be sent.
 * @param {*} returnMethod callback to main component.
 * @param {*} type Method i.e. POST,GET,DELETE etc.
 * @param {*} loader Whether loader is to be shown or not (boolean).
 */

export async function callRemoteMethod(obj, endpoint, data, returnMethod, type = "GET", loader, APIType , IsXMLResponse) {
  if (loader == true) {
    obj.setState({ isLoading: true });
  }
  var request = {
    method: type,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  if (type != "GET") {
    request.body = JSON.stringify(data);
  }
  
const parseString = require('react-native-xml2js').parseString;
if (IsXMLResponse){
    await fetch(endpoint)
    .then(response => response.text())
       .then((response) => { 
           parseString(response, function (err, result) {
      if (loader == true) {
        obj.setState({ isLoading: false });
      }
      var TempList ;
      if (APIType === Constants.Enums.API.Main_XML){
        TempList = result.rss.channel;
        eval("obj." + returnMethod + "(TempList)");
      }else if (APIType === Constants.Enums.API.Secodary_XML){
        TempList = result.rss.channel[0].item;
        eval("obj." + returnMethod + "(TempList)");
      }
      
    });   
    })   
    .catch(error => {
      obj.setState({ isLoading: false });
      setTimeout(() => {
        customAlert(error.message);
      }, 500);
    });
}
  
}
