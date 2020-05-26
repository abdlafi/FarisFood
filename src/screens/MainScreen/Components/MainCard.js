import React, { Component } from 'react';
import { renderIfElse } from '../../../utilities/CommonMethods'
import native_base   from '../../../utilities/AllImports/native_base'
import react_native   from '../../../utilities/AllImports/react_native'    
import FontAwesom from '../../../utilities/AllImports/FontAwesom';
import { faStar }  from '@fortawesome/free-regular-svg-icons'
export default class MainCard extends Component{
    state={
        animatePress: new react_native.Animated.Value(1),
    }
    animateIn(){
        react_native.Animated.spring(this.state.animatePress,{
            toValue:0.95,
            duration:1,
            useNativeDriver:true,
        }).start()
    }
    animateOut(){
        react_native.Animated.timing(this.state.animatePress,{
            toValue:1,
            duration:500,
            useNativeDriver:true,
        }).start()
    }
    render(){
        
        const { colors } = this.props.theme;
    return(
           <react_native.View style={{flexDirection: 'column',flex: 1}}>
              
               <native_base.CardItem style={{backgroundColor:colors.background}} >
                    <native_base.Left style={{flexDirection: 'row'}}> 
                    <react_native.TouchableOpacity style={{width:'100%', flexDirection: 'row',}}>
                      <native_base.Thumbnail small source={{uri:this.props.mData.ImageURL}} /> 
                      <native_base.Text style={{color:colors.text}}>{this.props.mData.ListName}</native_base.Text>
                      </react_native.TouchableOpacity> 
                    </native_base.Left> 
                </native_base.CardItem>   
                        <react_native.FlatList
                         keyExtractor={(item, index) => item.ID}
                         data={this.props.mData.stories}
                         horizontal={true}
                         showsHorizontalScrollIndicator={false}
                         renderItem={itemData =>
                            <react_native.View style={{flex:1}}>
                                <react_native.TouchableWithoutFeedback 
                                onPressIn={()=>this.animateIn()}
                                onPressOut={()=>this.animateOut()}>
                                    <react_native.Animated.View style={{flex:1,
                                    transform:[{scale:this.state.animatePress}]}}>
                                        <react_native.Image
                                          style={styles.CardImages}
                                          source={{ uri: itemData.item.ImageURL }}
                                          isHorizontal
                                        />
                                    </react_native.Animated.View>
                                </react_native.TouchableWithoutFeedback>

                            <react_native.TouchableOpacity style={{flexDirection:'column',justifyContent:'space-around',marginLeft:'5%'}}>
                                <native_base.Text style={{color:colors.text,fontSize: 20,textAlign: 'left',}}>{ itemData.item.Name }</native_base.Text>
                                <react_native.View style={{flexDirection:'row'}}>
                                    <FontAwesom.FontAwesomeIcon icon={FontAwesom.faStarHalfAlt} color={colors.text}/>    
                                    <native_base.Text note style={{color:colors.text,fontSize:10,width:'30%',textAlign: 'left',paddingLeft:'2%',paddingTop:1}}>3.5</native_base.Text>
                                </react_native.View>
                                
                            </react_native.TouchableOpacity>
                            </react_native.View>
                           }/>
                           <react_native.View style={{backgroundColor:'gray',width:'100%',height:10, marginTop:10}}></react_native.View>
                </react_native.View>
            );
        }
    }


const styles = react_native.StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems: 'center',
    },
    CardImages: {
        width: 250,
        height: 150,
        margin: 10,
        marginStart:10,
        borderRadius: 15,
        borderWidth: 2,
        padding: '5%',
    },
    ImageCircle: {
        width: 33,
        height: 33,
        marginStart:10,
        borderRadius: 17,
        borderWidth: 2,
    },
    Thumbnail:{
        flexDirection: 'column',
    },

});
