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
    ScrollableTab 
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
const link = LinkService;

const Screens = Dimensions.get('window')
const date = new Date()

const data = {
    labels: ["January", "February", "March",],
    datasets: [
        // {
        // data: [5136, 5516, 5923,],
        // color: (opacity = 1) => `orange${opacity}`, // optional
        // // strokeWidth: 5 // optional
        // },
        {
        data: [550, 575, 620,550, 575, 620,550, ],
        color: (opacity = 1) => `green${opacity}`, // optional
        // strokeWidth: 2 // optional
        },
        {
        data: [475, 475, 520,475, 475, 520,475,],
        color: (opacity = 1) => `red${opacity}`, // optional
        // strokeWidth: 2 // optional
        },
    ],
    // legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional
};

export class D_CountryGraph extends Component {
    constructor(props){
        super(props)
        this.state = {
            country : this.props.myCountry,
            worldCase : this.props.worldCase,
            graphCase : {
                recovered : this.props.myCase.recovered,
                confirmed : this.props.myCase.confirmed,
                deaths : this.props.myCase.deaths,
            },
            menu : [
                // {
                //     title : '7 Days',
                //     bool : true,
                // },
                // {
                //     title : '14 Days',
                //     bool : false,
                // },
                {
                    title : '30 Days',
                    bool : true,
                },
                {
                    title : 'This Month',
                    bool : false,
                },
                // {
                //     title : 'Custom',
                //     bool : false,
                // },
            ],

            monthData : [
                {
                    name : 'January',
                    num : 1,
                    daysLength : 31
                },
                {
                    name : 'February',
                    num : 2,
                    daysLength : 28
                },
                {
                    name : 'March',
                    num : 3,
                    daysLength : 31
                },
                {
                    name : 'April',
                    num : 4,
                    daysLength : 30
                },
                {
                    name : 'Mei',
                    num : 5,
                    daysLength : 31
                },
                {
                    name : 'June',
                    num : 6,
                    daysLength : 30
                },
                {
                    name : 'July',
                    num : 7,
                    daysLength : 31
                },
                {
                    name : 'August',
                    num : 8,
                    daysLength : 31
                },
                {
                    name : 'September',
                    num : 9,
                    daysLength : 30
                },
                {
                    name : 'October',
                    num : 10,
                    daysLength : 31
                },
                {
                    name : 'November',
                    num : 11,
                    daysLength : 30
                },
                {
                    name : 'Desember',
                    num : 12,
                    daysLength : 31
                },

            ],

            graphShow30 : false,
            graphShow14 : false,
            graphShow7 : false,
            dataGraph7 : [],
            dataGraph14 : [],
            dataGraph30 : [],

            daysShow : false,

            dateNow : date.getDate(),
            monthNow : date.getMonth()+1,
            yearNow : date.getFullYear(),
            dateLengthNow : 0,

            prevMonth : 0,
            prevYear : 0,
            prevDateStart : 0,
            prevDateLength : 0 ,


            dataPerMonth : this.props.dataPerMonth
        }
    }
    
    componentDidMount(){
        // console.warn(this.props.worldCase)
        this.setGraphState()
    }

    componentWillMount(){
        if(this.props.dataPerMonth.length == 0){
            // this.getDataCovidMonth()
        }else{
            this.setState({daysShow : true})
        }
    }
    setGraphState = () =>{
        // console.warn('masuk ke function graph state')
        if(this.props.dataPerMonth != 0){
            let label = []
            let dataConfirmed = []
            let dataRecovered = []
            let dataDeaths = []

            this.state.dataPerMonth.map((item,index)=>{
                let date = item.date.toString()
                let month = item.month.toString()
                let year = item.year.toString()
                label[index] = date+'-'+month+'-'+year
                dataConfirmed[index] = item.res.confirmed
                dataRecovered[index] = item.res.recovered
                dataDeaths[index] = item.res.deaths
                
                if(index == this.state.dataPerMonth.length-1){
                    // console.warn(label)
                    // console.warn(dataConfirmed)
                    // console.warn(dataRecovered)
                    // console.warn(dataDeaths)
                    // console.warn(dataDeaths.length)

                    this.setState({
                        dataGraph30 : {
                            labels : label,
                            datasets : [
                                {
                                    data : dataConfirmed,
                                    color : (opacity = 1) => `orange${opacity}`, // optional
                                    strokeWidth: 3 // optional
                                },
                                {
                                    data : dataRecovered,
                                    color : (opacity = 1) => `green${opacity}`, // optional
                                    strokeWidth: 1 // optional
                                },
                                {
                                    data : dataDeaths,
                                    color : (opacity = 1) => `red${opacity}`, // optional
                                    strokeWidth: 1 // optional
                                },
                            ]
                        },
                    },()=>{
                        let g30 = this.state.dataGraph30
                        g30.labels.splice(g30.labels.length-1,1)
                        g30.datasets[0].data.splice(g30.datasets[0].data.length-1,1)
                        g30.datasets[1].data.splice(g30.datasets[1].data.length-1,1)
                        g30.datasets[2].data.splice(g30.datasets[2].data.length-1,1)

                        this.setState({
                            dataGraph30 : g30,
                            graphShow30 : true
                        })

                    })
                }

            })
        }
    }

    // covid Start 22 January 2020
    // covid api date format MM-DD-YYYY

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
        this.setState({menu : b})
    }

    graphRender(){
        return( 
            <View>
                <View style={{ alignItems  :'center',}}>
                    <View style={{width : Screens.width * 90/100, height : 35, backgroundColor : 'red', borderRadius : 10, elevation : 5}}>
                        <View>
                            <View style={{width : Screens.width * 90/100, height : 35, backgroundColor : '#D6D6D6', borderRadius : 10, elevation : 5,}}>
                                <View style={{width : Screens.width * (this.state.graphCase.confirmed*90)/this.state.worldCase.confirmed/100, height : 35, backgroundColor : 'orange', borderRadius : 10, }}>
                                </View>
                            </View>
                            <View style={{flexDirection : 'row', paddingTop :10, width : Screens.width * 90/100}}>
                                <View style={{alignItems : 'flex-start', width : Screens.width * 50/100}}>
                                    <Text style={{fontSize : 18, fontWeight : 'bold', color : '#343434',paddingLeft : 5}}>{this.state.graphCase.confirmed} Confirmed</Text>
                                </View>
                                <View style={{alignItems : 'flex-end', width : Screens.width * 40/100}}>
                                    <Text style={{paddingRight : 5}}>{this.state.worldCase.confirmed}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{height : 10}}></View>
                        <View>
                            <View style={{width : Screens.width * 90/100, height : 35, backgroundColor : '#D6D6D6', borderRadius : 10, elevation : 5,}}>
                                <View style={{width : Screens.width * (this.state.graphCase.recovered*90)/this.state.worldCase.recovered/100, height : 35, backgroundColor : 'green', borderRadius : 10, }}>
                                </View>
                            </View>
                            <View style={{flexDirection : 'row', paddingTop :10, width : Screens.width * 90/100}}>
                                <View style={{alignItems : 'flex-start', width : Screens.width * 50/100}}>
                                    <Text style={{fontSize : 18, fontWeight : 'bold', color : '#343434',paddingLeft : 5}}>{this.state.graphCase.recovered} Recovered</Text>
                                </View>
                                <View style={{alignItems : 'flex-end', width : Screens.width * 40/100}}>
                                    <Text style={{paddingRight : 5}}>{this.state.worldCase.recovered}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{height : 10}}></View>
                        <View>
                            <View style={{width : Screens.width * 90/100, height : 35, backgroundColor : '#D6D6D6', borderRadius : 10, elevation : 5,}}>
                                <View style={{width : Screens.width * (this.state.graphCase.deaths*90)/this.state.worldCase.deaths/100, height : 35, backgroundColor : 'red', borderRadius : 10, }}>
                                </View>
                            </View>
                            <View style={{flexDirection : 'row', paddingTop :10, width : Screens.width * 90/100}}>
                                <View style={{alignItems : 'flex-start', width : Screens.width * 50/100}}>
                                    <Text style={{fontSize : 18, fontWeight : 'bold', color : '#343434',paddingLeft : 5}}>{this.state.graphCase.deaths} Deaths</Text>
                                </View>
                                <View style={{alignItems : 'flex-end', width : Screens.width * 40/100}}>
                                    <Text style={{paddingRight : 5}}>{this.state.worldCase.deaths}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{height : 10}}></View>
                        
                    </View>
                </View>
            </View>
        )
    }

    menuRender(){
        return(
            <View style={{flexDirection : 'row',}}>
                <ScrollView 
                    horizontal = {true}
                    showsHorizontalScrollIndicator = {false}
                >
                {this.state.menu.map((item,index)=>{
                    if(item.bool == false){
                        return(
                            <View style={{paddingLeft : 15, paddingVertical : 20, paddingRight : 5  }}>
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
                            <View style={{paddingLeft : 15, paddingVertical : 20, paddingRight : 5  }}>
                                <TouchableOpacity
                                    onPress={()=>{this.menuPress(item.bool, index)}}
                                >
                                    <View style={{paddingHorizontal : 10, paddingVertical : 5  , borderBottomWidth : 1, borderColor  : '#5C3098'}}>
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

    menuResultRender(){
        if(this.state.daysShow == true){
            return(
                <View >
                    {this.state.menu.map((item,index)=>{
                        if(item.title == 'This Month' && item.bool == true){
                            return(
                                <View>
                                    {/* {this.resultThisMonthRender()} */}
                                </View>
                            )
                        }else if(item.title == '30 Days' && item.bool == true){
                            return(
                                <View>
                                    {/* {this.result30DaysRender()} */}
                                    {this.result30DaysRender()}
                                </View>
                            )
                        }
                    })}
                </View>
            )
        }else if(this.state.dataPerMonth.length == 0 ){
            return(
                <View>
                    <Spinner color = '#5C3098'/>
                </View>
            )
        }
    }

    resultGraphRender30(){
        if(this.state.graphShow30 == true){
            return(
                <View>
                    <ScrollView
                        horizontal ={true}
                        showsHorizontalScrollIndicator = {false}
                    >
                        <LineChart
                            data={this.state.dataGraph30}
                            width={Screens.width * 4}
                            height={Screens.height * 50/100}
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
                            hasLegend = {false}
                            backgroundColor="transparent"
                            bezier
                        />
                    </ScrollView>
                </View>
            )
        }
        
    }
    result30DaysRender(){
        let a = 'white'
        return(
            <View >
                <View style={{width : Screens.width * 100/100,}}>
                    {this.resultGraphRender30()}
                </View>
                
                <View style={{width : Screens.width * 100/100,}}>
                <Text style={{fontSize : 18, fontWeight : 'bold', color : '#343434',paddingLeft : 10, paddingBottom : 10}}>Data Table </Text>
                    <View style={{width : Screens.width * 100/100,justifyContent : 'center', alignItems : 'center'}}>
                        <View style={{flexDirection : 'row',width : Screens.width *95/100, height : 35, backgroundColor : 'white', borderTopLeftRadius : 5, borderTopRightRadius : 5,justifyContent  :'center', alignItems : 'center'}}>
                            <View style={{width : Screens.width * 35/100, justifyContent : 'center', alignItems : 'center', }}>
                                {/* <Text>Date</Text> */}
                                <View style={{backgroundColor : '#5C3098',borderRadius : 5  ,}}>
                                    <Text style={{fontSize : 14,padding : 1, color : 'white', paddingHorizontal : 25 }}>Date</Text>
                                </View>
                            </View>
                            <View style={{width : Screens.width * 20/100, justifyContent : 'center', alignItems : 'center', }}>
                                {/* <Text>Confirmed</Text> */}
                                <View style={{backgroundColor : 'orange',borderRadius : 5  ,}}>
                                    <Text style={{fontSize : 14,padding : 1, color : 'white', paddingHorizontal : 5 }}>Confirmed</Text>
                                </View>
                            </View>
                            <View style={{width : Screens.width * 20/100, justifyContent : 'center', alignItems : 'center',}}>
                                {/* <Text>Recovered</Text> */}
                                <View style={{backgroundColor : 'green',borderRadius : 5  ,}}>
                                    <Text style={{fontSize : 14,padding : 1, color : 'white', paddingHorizontal : 5 }}>Recovered</Text>
                                </View>
                            </View>
                            <View style={{width : Screens.width * 20/100, justifyContent : 'center', alignItems : 'center',}}>
                                {/* <Text>Deaths</Text> */}
                                <View style={{backgroundColor : 'red',borderRadius : 5  ,}}>
                                    <Text style={{fontSize : 14,padding : 1, color : 'white', paddingHorizontal : 5 }}>Deaths</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                    <View style={{width : Screens.width *100/100,justifyContent  :'center', alignItems : 'center', }}>
                        <View style={{width : Screens.width *95/100,justifyContent  :'center', alignItems : 'center',}}>
                            <View style={{width : Screens.width *95/100, marginBottom : 20, elevation : 5,borderRadius : 5,justifyContent : 'center', alignItems  :'center',}}>
                                {this.state.dataPerMonth.map((item,index)=>{
                                    if(index < this.state.dataPerMonth.length - 1 && this.state.dataPerMonth[index].res.length !=0){
                                        if(index % 2==0){
                                            a = 'white'
                                        }else{
                                            a = '#E8DEF5'
                                        }
                                        return(
                                            <View style={{width : Screens.width * 95/100,alignItems : 'center', justifyContent :'center'}}>
                                                <View style={{flexDirection : 'row',width : Screens.width * 95/100, height : 35, backgroundColor : a,alignItems : 'center', justifyContent :'center'}}>
                                                    <View style={{flexDirection : 'row',width : Screens.width * 35/100, justifyContent : 'center', alignItems : 'center',}}>
                                                        <View style={{width : Screens.width * 10/100, justifyContent : 'center', alignItems : 'center',}}>
                                                            <Text style={{paddingRight : 10,fontSize : 14, fontWeight : 'bold', color : '#343434',}}>{item.date}</Text>
                                                        </View>
                                                        <View style={{width : Screens.width * 10/100, justifyContent : 'center', alignItems : 'center',}}>
                                                            <Text style={{paddingRight : 10,fontSize : 14, fontWeight : 'bold', color : '#343434',}}>{item.month}</Text>
                                                        </View>
                                                        <View style={{width : Screens.width * 15/100, justifyContent : 'center', alignItems : 'center',}}>
                                                            <Text style={{paddingRight : 10,fontSize : 14, fontWeight : 'bold', color : '#343434',}}>{item.year}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{flexDirection : 'row'}}>
                                                        <View style={{width : Screens.width * 20/100, justifyContent : 'center', alignItems : 'center', }}>
                                                            <Text style={{fontSize : 14, fontWeight : 'bold', color : '#343434',}}>{item.res.confirmed}</Text>
                                                        </View>
                                                        <View style={{width : Screens.width * 20/100, justifyContent : 'center', alignItems : 'center', }}>
                                                            <Text style={{fontSize : 14, fontWeight : 'bold', color : '#343434',}}>{item.res.recovered}</Text>
                                                        </View>
                                                        <View style={{width : Screens.width * 20/100, justifyContent : 'center', alignItems : 'center', }}>
                                                            <Text style={{fontSize : 14, fontWeight : 'bold', color : '#343434',}}>{item.res.deaths}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    }
                                })}
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{}}>
                {/* <ScrollView> */}
                    <View style={{height : Screens.height * 32/100, paddingTop : 20}}>
                        {this.graphRender()}
                    </View>
                    <View style={{paddingTop : 10}}>
                        {/* {this.menuRender()} */}
                        <Text style={{fontSize : 18, fontWeight : 'bold', color : '#343434',paddingLeft : 10, paddingBottom : 25, paddingTop : 25}}>Last 30 Days Graph</Text>
                    </View>
                    <View style={{alignItems  :'center'}}>
                        <View style={{width : Screens.width * 100/100, justifyContent : 'center', alignItems : 'center'}}>
                            {this.menuResultRender()}
                        </View>
                    </View>
                {/* </ScrollView>    */}
            </View>
        )
    }
}

// export default D_CountryGraph

function mapStateToProps ( state ) {
    return {
        // position : state.position,
        worldCase : state.worldCase,
        myCase : state.myCase,
        myCountry : state.myCountry,
        dataPerMonth : state.dataPerMonth
    }
}

function mapDispatchToProps ( dispatch ) {
    return {
        // setBranchId : ( branchId ) => {
        //     dispatch ( setBranchId ( branchId ) )
        // },

        setdataPerMonth : (dataPerMonth) =>{
            dispatch (setdataPerMonth(dataPerMonth))
        }
    }
}

export default connect ( mapStateToProps , mapDispatchToProps ) ( D_CountryGraph )