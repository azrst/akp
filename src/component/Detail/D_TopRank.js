import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    Dimensions,
    TextInput,
    StatusBar,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    ScrollView,
    ImageBackground,
    KeyboardAvoidingView,
} from 'react-native'
import { connect } from 'react-redux';
import { 
    setdataPerMonth ,

} from '../../redux/action/Action'
import { 
    Container, 
    Header, 
    Left, 
    Body, 
    Right,
    Button, 
    Icon, 
    Title, 
    Input, 
    Item, 
    Spinner, 
    Tab, 
    Tabs, 
    ScrollableTab,
    Toast
} from 'native-base';
import { } from 'react-native-gesture-handler';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import Icons from 'react-native-vector-icons/Ionicons';

import LinkService from '../../script/Link'
import { Colors } from 'react-native/Libraries/NewAppScreen';
const link = LinkService;

const Screens = Dimensions.get('window')
const date = new Date()

export class D_TopRank extends Component {
constructor(props){
    super(props)
    this.state={    
        covidData : this.props.CovidData,
        covidDataResult : [],
        covidMaxResult  : 10,
        resultRenderShow : true,
        menu : [
            {
                title : 'confirmed',
                bool : true,
            },
            {
                title : 'recovered',
                bool : false,
            },
            {
                title : 'deaths',
                bool : false,
            },
            // {
            //     title : 'crash fatality',
            //     bool : false,
            // },
            // {
            //     title : 'recovered precentage',
            //     bool : false,
            // },
        ]

    }
}

    componentDidMount(){
        this.covidLoop()
    }

    covidLoop = () =>{
        let x = this.state.covidData
        this.state.covidData.map((item,index)=>{
            x[index].provinceState  = item.provinceState
            x[index].countryRegion = item.countryRegion
            x[index].lastUpdate  = item.lastUpdate
            x[index].lat  = item.lat
            x[index].long = item.long
            x[index].confirmed  = item.confirmed
            x[index].recovered  = item.recovered
            x[index].deaths  = item.deaths
            x[index].active  = item.active
            x[index].admin2  = item.admin2
            x[index].fips  = item.fips
            x[index].combinedKey  = item.combinedKey
            x[index].incidentRate  = item.incidentRate
            x[index].peopleTested  = item.peopleTested
            x[index].peopleHospitalized  = item.peopleHospitalized
            x[index].uid  = item.uid
            x[index].iso3  = item.iso3
            x[index].iso2  = item.iso2
            x[index].bool = false
            x[index].id = index
            x[index].crashFatality = (item.deaths*100)/item.confirmed
            x[index].recoveredPrecentage = (item.recovered*100)/item.confirmed
            // x[index].recoveredPrecentage = 0

            if(index == this.state.covidData.length - 1){
                this.setState({covidDataResult : x},()=>{
                    console.log('state covid result : ',this.state.covidDataResult.length)
                })
            }
        })
    }


    sortingRecovered = () =>{
        // this.setState({resultRenderShow : false})
        this.state.covidDataResult.sort((a,b)=> (a.recovered < b.recovered) ? 1 : -1)
        // this.setState({resultRenderShow : true})
    }
    sortData = (index) =>{
        switch(index){
            case 0 :
                this.setState({resultRenderShow : false})
                this.state.covidDataResult.sort((a,b)=> (a.confirmed < b.confirmed) ? 1 : -1)
                this.setState({resultRenderShow : true})
                break;
            case 1 :
                this.setState({resultRenderShow : false})
                this.state.covidDataResult.sort((a,b)=> (a.recovered < b.recovered) ? 1 : -1)
                this.setState({resultRenderShow : true})
                break;
            case 2 : 
                this.setState({resultRenderShow : false})
                this.state.covidDataResult.sort((a,b)=> (a.deaths < b.deaths) ? 1 : -1)
                this.setState({resultRenderShow : true})
                break;
            // case 3 :
            //     this.setState({resultRenderShow : false})
            //     this.state.covidDataResult.sort((a,b)=> (a.crashFatality < b.crashFatality && a.provinceState == null) ? 1 : -1)
            //     this.setState({resultRenderShow : true})
            //     break;
            // case 4 :
            //     console.log(index)
            //     break;
        }
    }
    setMenufalse = () =>{
        this.state.menu.map((item,index)=>{
            let a = this.state.menu
            a[index].bool = false
            this.setState({menu : a})
        })
    }
    menuPress = (bool, index) =>{
        this.setMenufalse()
        let b = this.state.menu
        b[index].bool = true
        this.setState({menu : b},()=>{
            this.sortData(index)
        })
    }
    sortByRender(){
        return(
            <View style={{flexDirection : 'row',}}>
                <ScrollView 
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                >
                {this.state.menu.map((item,index)=>{
                    if(item.bool == false){
                        return(
                            <View style={{paddingLeft : 15, paddingTop : 5, paddingRight : 5,paddingBottom : 30 }}>
                                <TouchableOpacity
                                    onPress={()=>{this.menuPress(item.bool, index)}}
                                >
                                    <View style={{paddingHorizontal : 10, paddingVertical : 5  , }}>
                                        <Text style={{fontSize : 14, fontWeight : 'bold', color : '#343434',}}>{item.title}</Text>
                                    </View> 
                                </TouchableOpacity>
                            </View>
                        )
                    }else{
                        return(
                            <View style={{paddingLeft : 15, paddingTop : 5, paddingRight : 5,paddingBottom : 30 }}>
                                <TouchableOpacity
                                    onPress={()=>{this.menuPress(item.bool, index)}}
                                >
                                    <View style={{paddingHorizontal : 10, paddingVertical : 5  , borderWidth : 1, borderColor  : '#5C3098', borderRadius : 10}}>
                                        <Text style={{fontSize : 14, fontWeight : 'bold', color : '#5C3098',}}>{item.title}</Text>
                                    </View> 
                                </TouchableOpacity>
                            </View>
                        )
                    }
                })}
                </ScrollView>
            </View>       
        )
    }


    addButton(index){
        if(index == this.state.covidMaxResult-1){
            return(
                <View style={{justifyContent : 'center', alignItems : 'center', paddingVertical : 20,backgroundColor : 'white'}}>
                    <TouchableOpacity
                        onPress={()=>{this.setState({covidMaxResult : this.state.covidMaxResult + 10})}}
                    >
                        <Icons name={'ios-add-circle-outline'} color={'#5C3098'} size={35}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }
    resultRankRender(){
        if(this.state.covidDataResult.length != 0 && this.state.resultRenderShow == true){
            return(
                <View>
                    {this.state.covidDataResult.map((item,index)=>{
                        if(index < this.state.covidMaxResult){
                            return(
                                <View style={{width : Screens.width *1, justifyContent : 'center', alignItems : 'center', backgroundColor : 'white', paddingVertical : 5}}>
                                    <View style={{width : Screens.width * 95/100, justifyContent : 'center', alignItems : 'flex-start',borderRadius :10, backgroundColor : 'white', elevation : 2}}>
                                        <View style={{flexDirection : 'row', paddingVertical : 10}}>
                                            <View style={{width : Screens.width * 10/100, justifyContent : 'center', alignItems : 'center'}}>
                                                <Text>{index+1}</Text>
                                            </View>
                                            <View style={{width : Screens.width * 15/100, justifyContent : 'center', alignItems : 'center',}}>
                                                <Image 
                                                    source = {{uri : 'https://www.countryflags.io/'+item.iso2+'/flat/64.png'}}
                                                    style={{width : 40, height : 40,}}    
                                                ></Image>
                                            </View>
                                            <View style={{width : Screens.width * 60/100,paddingTop : 2, justifyContent  : 'center'}}>
                                                <View style={{flexDirection : 'row', alignItems : 'flex-end'}}>
                                                    <Text style={{fontSize : 18, fontWeight : 'bold', color : '#343434',paddingLeft : 5}}>{item.countryRegion}</Text>
                                                    <Text style={{fontSize : 12, paddingLeft : 10, }}>{item.provinceState}</Text>
                                                </View>
                                                <View style={{flexDirection : 'row', alignItems : 'flex-start'}}>
                                                    <View style={{width : Screens.width * 20/100, justifyContent : 'center', alignItems : 'center', }}>
                                                        <View style={{backgroundColor : 'white',borderRadius : 5  ,alignItems : 'center'}}>
                                                            <Text style={{fontSize : 14,padding : 1, color : 'orange', paddingHorizontal : 5 , fontWeight : 'bold'}}>Confirmed</Text>
                                                            <Text style={{fontSize : 14,padding : 1, color : '#343434', paddingHorizontal : 5 , fontWeight : 'bold'}}>{item.confirmed}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{width : Screens.width * 20/100, justifyContent : 'center', alignItems : 'center', }}>
                                                        <View style={{backgroundColor : 'white',borderRadius : 5  ,alignItems : 'center'}}>
                                                            <Text style={{fontSize : 14,padding : 1, color : 'green', paddingHorizontal : 5 , fontWeight : 'bold'}}>Recovered</Text>
                                                            <Text style={{fontSize : 14,padding : 1, color : '#343434', paddingHorizontal : 5 , fontWeight : 'bold'}}>{item.recovered}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{width : Screens.width * 20/100, justifyContent : 'center', alignItems : 'center', }}>
                                                        <View style={{backgroundColor : 'white',borderRadius : 5  ,alignItems : 'center'}}>
                                                            <Text style={{fontSize : 14,padding : 1, color : 'red', paddingHorizontal : 5 , fontWeight : 'bold'}}>Deaths</Text>
                                                            <Text style={{fontSize : 14,padding : 1, color : '#343434', paddingHorizontal : 5 , fontWeight : 'bold'}}>{item.deaths}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{width : Screens.width * 95/100, alignItems : 'center', paddingBottom : 10}}>
                                            <View style={{flexDirection : 'row', alignItems : 'center',}}>
                                                <View style={{flexDirection : 'row'}}>
                                                    <Text style={{fontSize : 12,padding : 1, color : 'green', paddingRight : 2 , }}>Recovered Percentage</Text>
                                                    <Text style={{fontSize : 12,padding : 1, color : 'green', }}>{item.recoveredPrecentage.toFixed(2)} %</Text>
                                                </View>
                                                <View style={{flexDirection : 'row', paddingLeft : 5}}>
                                                    <Text style={{fontSize : 12,padding : 1, color : 'red', paddingRight : 2 , }}>Crash Fatality</Text>
                                                    <Text style={{fontSize : 12,padding : 1, color : 'red', }}>{item.crashFatality.toFixed(2)} %</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{width : Screens.width * 20/100,}}>
                                        {this.addButton(index)}
                                    </View>
                                </View>
                            )
                        }
                    })}
                </View>
            )
        }
    }
    myCountryRender(){
        if(this.state.covidDataResult.length != 0 && this.state.resultRenderShow == true){
            return(
                <View>
                    {this.state.covidDataResult.map((item,index)=>{
                        if(item.countryRegion == this.props.myCountry){
                            return(
                                <View style={{width : Screens.width *1, justifyContent : 'center', alignItems : 'center', backgroundColor : 'white', paddingVertical : 5}}>
                                    <View style={{width : Screens.width * 95/100, justifyContent : 'center', alignItems : 'flex-start',borderRadius :10, backgroundColor : '#F5F5F5', elevation : 2}}>
                                        <View style={{flexDirection : 'row', paddingVertical : 10}}>
                                            <View style={{width : Screens.width * 10/100, justifyContent : 'center', alignItems : 'center'}}>
                                                <Text>{index+1}</Text>
                                            </View>
                                            <View style={{width : Screens.width * 15/100, justifyContent : 'center', alignItems : 'center',}}>
                                                <Image 
                                                    source = {{uri : 'https://www.countryflags.io/'+item.iso2+'/flat/64.png'}}
                                                    style={{width : 40, height : 40,}}    
                                                ></Image>
                                            </View>
                                            <View style={{width : Screens.width * 60/100,paddingTop : 2, justifyContent  : 'center'}}>
                                                <View style={{flexDirection : 'row', alignItems : 'flex-end'}}>
                                                    <Text style={{fontSize : 18, fontWeight : 'bold', color : '#343434',paddingLeft : 5}}>{item.countryRegion}</Text>
                                                    <Text style={{fontSize : 12, paddingLeft : 10, }}>{item.provinceState}</Text>
                                                </View>
                                                <View style={{flexDirection : 'row', alignItems : 'flex-start', backgroundColor : 'white'}}>
                                                    <View style={{width : Screens.width * 20/100, justifyContent : 'center', alignItems : 'center', }}>
                                                        <View style={{backgroundColor : 'white',borderRadius : 5  ,alignItems : 'center'}}>
                                                            <Text style={{fontSize : 14,padding : 1, color : 'orange', paddingHorizontal : 5 , fontWeight : 'bold'}}>Confirmed</Text>
                                                            <Text style={{fontSize : 14,padding : 1, color : '#343434', paddingHorizontal : 5 , fontWeight : 'bold'}}>{item.confirmed}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{width : Screens.width * 20/100, justifyContent : 'center', alignItems : 'center', }}>
                                                        <View style={{backgroundColor : 'white',borderRadius : 5  ,alignItems : 'center'}}>
                                                            <Text style={{fontSize : 14,padding : 1, color : 'green', paddingHorizontal : 5 , fontWeight : 'bold'}}>Recovered</Text>
                                                            <Text style={{fontSize : 14,padding : 1, color : '#343434', paddingHorizontal : 5 , fontWeight : 'bold'}}>{item.recovered}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{width : Screens.width * 20/100, justifyContent : 'center', alignItems : 'center', }}>
                                                        <View style={{backgroundColor : 'white',borderRadius : 5  ,alignItems : 'center'}}>
                                                            <Text style={{fontSize : 14,padding : 1, color : 'red', paddingHorizontal : 5 , fontWeight : 'bold'}}>Deaths</Text>
                                                            <Text style={{fontSize : 14,padding : 1, color : '#343434', paddingHorizontal : 5 , fontWeight : 'bold'}}>{item.deaths}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{width : Screens.width * 95/100, alignItems : 'center', paddingBottom : 10}}>
                                            <View style={{flexDirection : 'row', alignItems : 'center',}}>
                                                <View style={{flexDirection : 'row'}}>
                                                    <Text style={{fontSize : 12,padding : 1, color : 'green', paddingRight : 2 , }}>Recovered Percentage</Text>
                                                    <Text style={{fontSize : 12,padding : 1, color : 'green', }}>{item.recoveredPrecentage.toFixed(2)} %</Text>
                                                </View>
                                                <View style={{flexDirection : 'row', paddingLeft : 5}}>
                                                    <Text style={{fontSize : 12,padding : 1, color : 'red', paddingRight : 2 , }}>Crash Fatality</Text>
                                                    <Text style={{fontSize : 12,padding : 1, color : 'red', }}>{item.crashFatality.toFixed(2)} %</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{width : Screens.width * 20/100,}}>
                                        {this.addButton(index)}
                                    </View>
                                </View>
                            )
                        }
                    })}
                </View>
            )
        }
    }
    render() {
        return (
            <View style={{width  :Screens.width *1, justifyContent : 'center', alignItems : 'center'}}>
                <View style={{width  :Screens.width *95/100}}>
                    <Text style={{fontSize : 18, fontWeight : 'bold', color : '#343434',paddingLeft : 5}}>My Country</Text>
                </View>
                <View>
                    {this.myCountryRender()}
                </View>
                <View style={{width  :Screens.width *95/100}}>
                    <Text style={{fontSize : 14, fontWeight : 'bold', color : '#343434',paddingLeft : 5}}>Sort By</Text>
                </View>
                <View>
                    {this.sortByRender()}
                </View>
                <View style={{width  :Screens.width *95/100}}>
                    <Text style={{fontSize : 18, fontWeight : 'bold', color : '#343434',paddingLeft : 5}}>World Case</Text>
                </View>
                <View>
                    {this.resultRankRender()}
                </View>
            </View>
        )
    }
}


function mapStateToProps ( state ) {
    return {
        // position : state.position,
        worldCase : state.worldCase,
        myCase : state.myCase,
        myCountry : state.myCountry,
        dataPerMonth : state.dataPerMonth,
        CovidData : state.CovidData
    }
}

function mapDispatchToProps ( dispatch ) {
    return {
        // setBranchId : ( branchId ) => {
        //     dispatch ( setBranchId ( branchId ) )
        // },

    }
}

export default connect ( mapStateToProps , mapDispatchToProps ) ( D_TopRank )
