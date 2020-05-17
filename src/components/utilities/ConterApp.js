
import React, { Component } from "react";
import { View,Text } from "react-native";
import {connect} from "react-redux"

export function controlCounter () {
    this.props.increasCounter()
}
class clsDB extends Component {

  render() {
   
    return  (
        <View>
            <View style={{flexDirection: 'row' , width: 200}}>
                    <Text>Viewed: </Text>
                    <Text>{this.props.counter}</Text>
            </View>
        </View>
    );
  } 
}



export default connect(mapStateToProps,mapDispatchToProps)(clsDB);

function mapDispatchToProps(dispatch){
    return{
        increasCounter : () => dispatch({type: "INCREASE_COUNTER"}),
    }
}

function mapStateToProps(state){
    return{
        counter: state.counter
    }
}



