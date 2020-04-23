import React, { Component } from 'react'
import {View, 
    Text, 
    Dimensions, 
    TouchableOpacity, 
    TouchableNativeFeedback, 
    Image, 
    ScrollView,
    AsyncStorage
} from 'react-native'
import Carousel, {Pagination} from 'react-native-snap-carousel'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const Screens = Dimensions.get('window')

export class FirstPage extends Component {
    constructor(props){
        super (props)
        this.state={
            data : [
                {
                    gambar : require('../image/F1.jpg'),
                    judul : 'Information About Covid-19 Virus',
                    isi  : '',
                },
                {
                    gambar : require('../image/F2.jpg'),
                    judul : 'Get Information Statistic per Country',
                    isi  : ''
                },
                {
                    gambar : require('../image/F3.jpg'),
                    judul : 'Tips and Tricks for a Healthy Life',
                    isi  : ''
                },
                {
                    gambar : require('../image/F4.jpg'),
                    judul : 'Get Your Information by Your Region and Location',
                    isi  : '',
                },
            ],

            carouselIndex : 0,
            carouselFirstIndex : 0,
            isRead : 'false',
            isLocationEnable : false

        }
    }

    componentDidMount(){
        console.warn(this.state.carouselIndex)
    }

    componentWillMount(){
        // this.skipCarousel()
    }


    indexChange(index){
        this.setState({carouselIndex : index},()=>{
            // console.warn(this.state.carouselIndex)
        })
    }

    firstPass(){
        AsyncStorage.setItem('firstPass','true')
    }

    gotoHome = () =>{
        if(this.state.isLocationEnable == true){
            this.props.navigation.replace('Homes', {screen : 'Home'})
        }else{
            this.locationEnabler()
        }
    }

    locationEnabler = async () =>{
        AsyncStorage.setItem('firstPass','true')
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 10000 })
        .then(() => {
            this.setState({isLocationEnable : true},()=>{
                this.gotoHome()
            })
        }).catch(() => {
            this.locationEnabler()
        });
    }

    agreeButtonRender(){
        if(this.state.carouselIndex == this.state.data.length-1 || this.state.isRead == 'true'){
            return(
                <View>
                    <TouchableNativeFeedback 
                        style={{justifyContent : 'center', alignItems : 'center', borderRadius : 20}}
                        onPress = {()=>{this.locationEnabler()}}>
                        <View style={{elevation : 5, backgroundColor : '#01BCF1', borderRadius : 20, alignItems : 'center'}}>
                            <Text style={{padding : 15,fontWeight : 'bold', fontSize : 22, color : 'white'}}>Accept and Continue</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={{paddingTop : 20}}>
                        <Text style={{color : 'grey', fontWeight : "600"}}>by using this apps you agree to the terms of service</Text>
                    </View>
                </View>
            )
        }
    }

    _renderCarousel = ({item, index}) => {
        return (
            <ScrollView 
                showsVerticalScrollIndicator = {false}
            >
                <View style={{ alignItems : 'center', backgroundColor : 'white', }}>
                    <View>
                        <Image 
                            source={item.gambar}
                            style={{width : Screens.width * 80/100,height : Screens.height * 50/100, resizeMode : 'cover'}}
                        ></Image>
                    </View>
                    {/* <View>
                        <Image source={item.gambar}></Image>
                    </View> */}
                    <View style={{alignItems : 'flex-start'}}>
                        <View style={{paddingTop : 15}}>
                            <Text style={{fontSize : 34, fontWeight : 'bold', color : '#484848'}}>{ item.judul }</Text>
                        </View>
                        <View style={{paddingTop : 10, paddingBottom : 20}}>
                            <Text >{ item.isi }</Text>
                        </View>
                    </View>
                    
                </View>
            </ScrollView>
            
        );
    }

    render() {
        return (
            <View style={{backgroundColor : 'white'}}>
                <View style={{justifyContent : 'center', alignItems : 'center', backgroundColor :'white', height : Screens.height *80/100}}>
                    <Pagination
                        dotsLength={this.state.data.length}
                        activeDotIndex={this.state.carouselIndex}
                        // containerStyle={{ backgroundColor: 'white' }}
                        dotStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            marginHorizontal: 8,
                            backgroundColor: 'rgba(102, 102, 102, 1)'
                        }}
                        inactiveDotStyle={{
                            // Define styles for inactive dots here
                        }}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        tappableDots = {true}
                    />
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.data}
                        renderItem={this._renderCarousel}
                        sliderWidth={Screens.width * 1}
                        itemWidth={Screens.width * 85/100}
                        loop ={false}
                        layout = {'default'}
                        firstItem = {this.state.carouselFirstIndex}
                        onSnapToItem ={(index)=>this.indexChange(index)}

                    />
                </View>

                <View style={{ backgroundColor : 'white', height : Screens.height *25/100, justifyContent : 'flex-start', alignItems : 'center',paddingTop : 10}}>
                    {this.agreeButtonRender()}
                </View>
            </View>
        )
    }
}

export default FirstPage
