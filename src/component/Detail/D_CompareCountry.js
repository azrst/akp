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

export class D_CompareCountry extends Component {
    constructor(props){
        super(props)
        this.state = {
            country : '',
            covidDataAll : this.props.CovidData,
            covidDataFilter : [
                // {
                //     provinceState  : '',
                //     countryRegion : '',
                //     lastUpdate  : '',
                //     lat  : '',
                //     long : '',
                //     confirmed  : '',
                //     recovered  : '',
                //     deaths  : '',
                //     active  : '',
                //     admin2  : '',
                //     fips  : '',
                //     combinedKey  : '',
                //     incidentRate  : '',
                //     peopleTested  : '',
                //     peopleHospitalized  : '',
                //     uid  : '',
                //     iso3  : '',
                //     iso2  : '',
                //     bool : '',
                //     id : '',
                // }
            ],
            covidSearchLengthResult : 0,
            lengthShow : 25,
            covidDataCompare : [],
            graphCompareShow : false,
            widthGraphCompare :  1
        }
    }

    componentDidMount(){
        this.setBoolData()
    }

    setBoolData=()=>{
        let dataTemp = this.state.covidDataAll
        this.state.covidDataAll.map((item, index)=>{

            dataTemp[index].provinceState  = item.provinceState
            dataTemp[index].countryRegion = item.countryRegion
            dataTemp[index].lastUpdate  = item.lastUpdate
            dataTemp[index].lat  = item.lat
            dataTemp[index].long = item.long
            dataTemp[index].confirmed  = item.confirmed
            dataTemp[index].recovered  = item.recovered
            dataTemp[index].deaths  = item.deaths
            dataTemp[index].active  = item.active
            dataTemp[index].admin2  = item.admin2
            dataTemp[index].fips  = item.fips
            dataTemp[index].combinedKey  = item.combinedKey
            dataTemp[index].incidentRate  = item.incidentRate
            dataTemp[index].peopleTested  = item.peopleTested
            dataTemp[index].peopleHospitalized  = item.peopleHospitalized
            dataTemp[index].uid  = item.uid
            dataTemp[index].iso3  = item.iso3
            dataTemp[index].iso2  = item.iso2
            dataTemp[index].bool = false
            dataTemp[index].id = index

            if(index == this.state.covidDataAll.length-1){
                this.setState({covidDataAll : dataTemp})
            }

        })
    }

    searchCovid = (value) =>{
        this.setState({country : value},()=>{
            // this.setState({covidSearchLengthResult : 0})
            // if(value.length > 2){
            //     this.state.covidDataAll.map((item,index)=>{
            //         let a = item.combinedKey.toLowerCase()
            //         let b = a.includes(this.state.country.toLowerCase())
            //         if(b == true){
            //             this.setState({covidSearchLengthResult : this.state.covidSearchLengthResult + 1})
            //         }
            //     })
            // }
        })
    }

    searchBarRender (){
        return(
            <View>
                <View style={{width : Screens.width *90/100, height : 40, borderColor : 'grey',borderBottomWidth : 1, marginBottom : 22,justifyContent : 'center', flexDirection : 'row', alignItems : 'center',}}>
                    <View style={{width : Screens.width *78/100, backgroundColor : 'white',}}>
                        <TextInput
                            style={{paddingLeft : 18, fontSize : 18,justifyContent : 'center' ,fontWeight : '600', paddingBottom : 10,}}
                            placeholder={'Country Name'}
                            onChangeText ={(value)=>{ this.searchCovid(value) }}
                            value = {this.state.country}
                            // onEndEditing ={()=>{this.serviceCountryDetail()}}
                        ></TextInput>
                    </View>
                    <View>
                    <TouchableOpacity>
                        <View style={{width : Screens.width *12/100, height : 20 , backgroundColor : 'transparent', justifyContent : 'center', alignItems : 'center'}}>
                            <Icons name={'ios-search'} size={24} color={'#C1C1C1'} />
                        </View> 
                    </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }

    addRender(index){
        if(index == this.state.lengthShow && this.state.country.length == 0){
            return(
                <View style={{width : Screens.width * 20/100, alignItems : 'center', backgroundColor : 'white', justifyContent : 'center',marginRight : 20}}>
                    {/* <Text>aadd</Text> */}
                    <TouchableOpacity 
                        onPress={()=>{this.setState({lengthShow : this.state.lengthShow + 25})}}
                    >
                        <Icons name={'ios-refresh'} color={'#5C3098'} size={28}/>
                    </TouchableOpacity>
                </View>
            )
        }
    }


    addCountry = (index,a) =>{
        this.state.covidDataFilter.push(
            {
                provinceState  : this.state.covidDataAll[index].provinceState,
                countryRegion : this.state.covidDataAll[index].countryRegion,
                lastUpdate  : this.state.covidDataAll[index].lastUpdate,
                lat  : this.state.covidDataAll[index].lat,
                long : this.state.covidDataAll[index].long,
                confirmed  : this.state.covidDataAll[index].confirmed,
                recovered  : this.state.covidDataAll[index].recovered,
                deaths  : this.state.covidDataAll[index].deaths,
                active  : this.state.covidDataAll[index].active,
                admin2  : this.state.covidDataAll[index].admin2,
                fips  : this.state.covidDataAll[index].fips,
                combinedKey  : this.state.covidDataAll[index].combinedKey,
                incidentRate  : this.state.covidDataAll[index].incidentRate,
                peopleTested  : this.state.covidDataAll[index].peopleTested,
                peopleHospitalized  : this.state.covidDataAll[index].peopleHospitalized,
                uid  : this.state.covidDataAll[index].uid,
                iso3  : this.state.covidDataAll[index].iso3,
                iso2  : this.state.covidDataAll[index].iso2,
                bool : a,
                id : index,
            }
        )
        console.log('data data : ',this.state.covidDataFilter.length)
        
    }
    spliceCountry = (index,a) =>{
        // if(this.state.covidDataFilter.length != 0){
            this.state.covidDataFilter.map((items,indexs)=>{
                if(this.state.covidDataAll[index].id == items.id){
                    this.state.covidDataFilter.splice(indexs,1)
                    console.log('data data : ',this.state.covidDataFilter.length)
                }
            })
        // }
    }
    checkerChange = (index) =>{
        if(this.state.covidDataAll[index].bool == false){
            if(this.state.covidDataFilter.length > 9){
                Toast.show({
                    text: "Max Country Selected 10",
                    buttonText: "Okay",
                    type: "warning",
                    duration: 3000
                })
                console.log('data data : ',this.state.covidDataFilter.length)
            }else{
                let a = this.state.covidDataAll
                a[index].bool = true
                this.setState({covidDataAll : a},()=>{
                    this.addCountry(index,a)
                })
            }
            
        }else{
            let a = this.state.covidDataAll
            a[index].bool = false
            this.setState({covidDataAll : a},()=>{
                this.spliceCountry(index,a)
            })
        }
    }

    compareOnPress = ()=>{
        if(this.state.covidDataFilter.length < 2){
            Toast.show({
                text: "Country Must Selected Atleast 2",
                buttonText: "Okay",
                type: "loging",
                duration: 3000
            })
        }else{
            let dataFilter  = this.state.covidDataFilter

            let  label = []
            let  dataArr = []

            let dataComperred = []

            dataFilter.map((item,index)=>{
                label[index] =  item.countryRegion
                dataArr[index] = [item.confirmed,item.recovered,item.deaths]

                if(index == dataFilter.length -1){
                    let  legenda = ['Confirmed', 'Recovered', 'Deaths']
                    let logaBar =  ['orange', 'green', 'red']
                    dataComperred = {
                        labels : label,
                        legend : legenda,
                        barColors : logaBar,
                        data : dataArr
                    }
                    this.setState({covidDataCompare : dataComperred,},()=>{
                        let w = this.state.covidDataFilter.length * 0.3
                        
                        this.setState({
                            widthGraphCompare  : w,
                            graphCompareShow : true
                        })
                    })
                }
            })

        }
    }

    checkerRender(index){
        if (this.state.covidDataAll[index].bool == false){
            return(
                <TouchableOpacity 
                    onPress={()=>{this.checkerChange(index)}}
                >   
                <View style={{padding : 10, }}>
                    <Icons name={'ios-add-circle-outline'} color={'#5C3098'} size={28}/>
                </View>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity 
                    onPress={()=>{this.checkerChange(index)}}
                >
                    <View style={{padding : 10, }}>
                        <Icons name={'ios-checkmark-circle'} color={'green'} size={28}/>
                    </View>
                </TouchableOpacity>
            )
        }
    }
    covidDataAllRender () {
        if(this.state.country.length > 2){
            return(
                <View>
                    <View style={{flexDirection : 'row'}}>
                        <ScrollView
                            horizontal = {true}
                            showsHorizontalScrollIndicator = {false}
                        >
                            {this.state.covidDataAll.map((item,index)=>{
                                let a = item.combinedKey.toLowerCase()
                                let b = a.includes(this.state.country.toLowerCase())
                                let province = item.provinceState
                                if(item.provinceState == null){
                                    province = '-'
                                }
                                if(b == true){
                                    return(
                                        <View style={{flexDirection : 'row', justifyContent  :'center', alignItems : 'center'}}>
                                            <View style={{width : Screens.width * 40/100, alignItems : 'center', backgroundColor : 'white', justifyContent : 'center', flexDirection : 'row'}}>
                                                <View style={{width : Screens.width * 35/100, paddingVertical : 20}}>
                                                    <View style={{backgroundColor : 'white', borderRadius  : 10, elevation : 5, marginLeft : 10, marginRight : 2, alignItems : 'center'}}>
                                                        <View style={{paddingVertical : 10, paddingHorizontal : 10,justifyContent : 'center', alignItems : 'center'}}>
                                                            <Image 
                                                                source = {{uri : 'https://www.countryflags.io/'+item.iso2+'/flat/64.png'}}
                                                                style={{width : 40, height : 40,}}    
                                                            ></Image>
                                                            <Text style={{paddingTop : 2}}>{item.countryRegion}</Text>
                                                            <Text style={{paddingTop : 2}}>{province}</Text>
                                                            <View style={{backgroundColor : 'orange',borderRadius : 5  ,}}>
                                                                <Text style={{fontSize : 14,padding : 1, color : 'white', paddingHorizontal : 5 }}>Confirmed</Text>
                                                            </View>
                                                            <Text style={{paddingTop : 2, paddingBottom : 5}}>{item.confirmed}</Text>
                                                            <View style={{backgroundColor : 'green',borderRadius : 5  ,}}>
                                                                <Text style={{fontSize : 14,padding : 1, color : 'white', paddingHorizontal : 5 }}>Recovered</Text>
                                                            </View>
                                                            <Text style={{paddingTop : 2, paddingBottom : 5}}>{item.recovered}</Text>
                                                            <View style={{backgroundColor : 'red',borderRadius : 5  ,}}>
                                                                <Text style={{fontSize : 14,padding : 1, color : 'white', paddingHorizontal : 5 }}>Deaths</Text>
                                                            </View>
                                                            <Text style={{paddingTop : 2, paddingBottom : 5}}>{item.deaths}</Text>
                                                            <View style={{paddingTop : 10}}>
                                                                {this.checkerRender(index)}
                                                            </View>
                                                        </View>
                                                        
                                                    </View>
                                                </View>
                                                
                                            </View>
                                            <View >
                                                {this.addRender(index)}
                                            </View>
                                        </View>
                                    )
                                }
                                
                            })}
                        </ScrollView>
                        
                    </View>
                </View>
            )
        }else{
            return(
                <View>
                    <View style={{flexDirection : 'row'}}>
                        <ScrollView
                            horizontal = {true}
                            showsHorizontalScrollIndicator = {false}
                        >
                            {this.state.covidDataAll.map((item,index)=>{
                                let province = item.provinceState
                                if(item.provinceState == null){
                                    province = '-'
                                }
                                if(index <= this.state.lengthShow){
                                    return(
                                        <View style={{flexDirection : 'row', justifyContent  :'center', alignItems : 'center'}}>
                                            <View style={{width : Screens.width * 40/100, alignItems : 'center', backgroundColor : 'white', justifyContent : 'center', flexDirection : 'row'}}>
                                                <View style={{width : Screens.width * 35/100, paddingVertical : 20}}>
                                                    <View style={{backgroundColor : 'white', borderRadius  : 10, elevation : 5, marginLeft : 10, marginRight : 2, alignItems : 'center'}}>
                                                        <View style={{paddingVertical : 10, paddingHorizontal : 10,justifyContent : 'center', alignItems : 'center'}}>
                                                            <Image 
                                                                source = {{uri : 'https://www.countryflags.io/'+item.iso2+'/flat/64.png'}}
                                                                style={{width : 40, height : 40,}}    
                                                            ></Image>
                                                            <Text style={{paddingTop : 2}}>{item.countryRegion}</Text>
                                                            <Text style={{paddingTop : 2}}>{province}</Text>
                                                            <View style={{backgroundColor : 'orange',borderRadius : 5  ,}}>
                                                                <Text style={{fontSize : 14,padding : 1, color : 'white', paddingHorizontal : 5 }}>Confirmed</Text>
                                                            </View>
                                                            <Text style={{paddingTop : 2, paddingBottom : 5}}>{item.confirmed}</Text>
                                                            <View style={{backgroundColor : 'green',borderRadius : 5  ,}}>
                                                                <Text style={{fontSize : 14,padding : 1, color : 'white', paddingHorizontal : 5 }}>Recovered</Text>
                                                            </View>
                                                            <Text style={{paddingTop : 2, paddingBottom : 5}}>{item.recovered}</Text>
                                                            <View style={{backgroundColor : 'red',borderRadius : 5  ,}}>
                                                                <Text style={{fontSize : 14,padding : 1, color : 'white', paddingHorizontal : 5 }}>Deaths</Text>
                                                            </View>
                                                            <Text style={{paddingTop : 2, paddingBottom : 5}}>{item.deaths}</Text>
                                                            <View style={{paddingTop : 10}}>
                                                                {this.checkerRender(index)}
                                                            </View>
                                                        </View>
                                                        
                                                    </View>
                                                </View>
                                                
                                            </View>
                                            <View >
                                                {this.addRender(index)}
                                            </View>
                                        </View>
                                    )
                                }
                                
                            })}
                        </ScrollView>
                        
                    </View>
                </View>
            )
        }
        
    }

    textLengthResult(){
        // if(this.state.covidSearchLengthResult != 0){
        //     return(
        //         <View>
        //             <Text>{this.state.covidSearchLengthResult}</Text>
        //         </View>
        //     )
        // }else{
        //     return(
        //         <View>
        //             <Text>{this.state.lengthShow} / {this.state.covidDataAll.length}</Text>
        //         </View>
        //     )
        // }
        if(this.state.country.length == 0){
            return(
                <View>
                    <Text>{this.state.lengthShow} / {this.state.covidDataAll.length}</Text>
                </View>
            )
        }
    }
    chartRender(){
        if(this.state.graphCompareShow == true){
            let lebar = this.state.covidDataCompare.length * 0.3
            return(
                <ScrollView
                    horizontal ={true}
                    showsHorizontalScrollIndicator = {false}
                >
                <View>
                    {/* <ScrollView
                        horizontal ={true}
                        showsHorizontalScrollIndicator = {false}
                    > */}
                        <StackedBarChart
                            style={{paddingLeft : 20}}
                            data={this.state.covidDataCompare}
                            width={Screens.width * this.state.widthGraphCompare + 0.3}
                            height={Screens.height * 35/100}
                            verticalLabelRotation={30}
                            chartConfig={{
                                backgroundColor: "white",
                                backgroundGradientFrom: "white",
                                backgroundGradientTo: "white",
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`, // garis putus putus
                                labelColor: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`, // font color
                                style: {
                                    borderRadius: 5
                                },
                                propsForDots: {
                                    r: "3",
                                    strokeWidth: "1",
                                    stroke: "white"
                                }
                                }}
                            // hasLegend = {false}
                            backgroundColor="transparent"
                            bezier
                        />
                    {/* </ScrollView> */}
                </View>
                </ScrollView>
            )
        }
    }


    render() {
        return (
            <View style={{width  : Screens.width * 1, justifyContent  :'center' , alignItems  :'center'}}>
                {/* <ScrollView> */}
                    <View>
                        {this.searchBarRender()}
                    </View>
                    <View>
                        {this.covidDataAllRender()}
                    </View>
                    <View>
                        {this.textLengthResult()}
                    </View>
                    <View>
                        <View style={{backgroundColor : 'white', width : Screens.width * 1, justifyContent : 'center', alignItems : 'center'}}>
                            <TouchableNativeFeedback
                                onPress={()=>this.compareOnPress()}
                            >
                                <View style={{width : Screens.width * 90/100, justifyContent : 'center', alignItems : 'center', backgroundColor : '#5C3098', borderRadius : 15, elevation : 5, marginVertical : 20}}>
                                    <Text style={{fontSize : 18, fontWeight : 'bold', color : 'white', paddingVertical : 15}}>Compare</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                    {/* <View style={{paddingLeft : 20}}> */}
                        {this.chartRender()}
                    {/* </View> */}
                {/* </ScrollView> */}
               
            </View>
        )
    }
}

// export default D_CompareCountry


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

export default connect ( mapStateToProps , mapDispatchToProps ) ( D_CompareCountry )
