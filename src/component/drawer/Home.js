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


import { connect } from 'react-redux';
import {
    setmyCase,
    setdataPerMonth
} from '../../redux/action/Action'
import LinkService from '../../script/Link'
const link = LinkService;

const Screens = Dimensions.get('window')
const date = new Date()

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            country: '',
            covidData: this.props.CovidData,
            dataShow: false,
            chartData: [
                {
                    name: "Deaths",
                    population: 0,
                    color: "red",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                },
                {
                    name: "Confirmed",
                    population: 0,
                    color: "green",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                },
                {
                    name: "Recovered",
                    population: 0,
                    color: "orange",
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 15
                }
            ],

            yAxis: 0,

            cSubregion: '',
            cRegion: '',
            cCapital: '',
            cPopulation: '',

            cCase: 4241,
            cDeaths: 370,
            cRecovered: 350,
            cIso2: 0,
            cIso3: 0,

            myRecovered: 0,
            myConfirmed: 0,
            myDeaths: 0,

            myCountry: this.props.myCountry,
            myCity: this.props.myCity,
            myRegion: this.props.myRegion,
            mySubregion: this.props.mySubregion,
            myCapital: this.props.myCapital,
            myPopulation: this.props.myPopulation,
            myAlpha2Code: this.props.myAlpha2Code,
            myAlpha3Code: this.props.myAlpha3Code,

            detailButton: false,

            //================================================================================================================================================================================================

            monthData: [
                {
                    name: 'January',
                    num: 1,
                    daysLength: 31
                },
                {
                    name: 'February',
                    num: 2,
                    daysLength: 28
                },
                {
                    name: 'March',
                    num: 3,
                    daysLength: 31
                },
                {
                    name: 'April',
                    num: 4,
                    daysLength: 30
                },
                {
                    name: 'Mei',
                    num: 5,
                    daysLength: 31
                },
                {
                    name: 'June',
                    num: 6,
                    daysLength: 30
                },
                {
                    name: 'July',
                    num: 7,
                    daysLength: 31
                },
                {
                    name: 'August',
                    num: 8,
                    daysLength: 31
                },
                {
                    name: 'September',
                    num: 9,
                    daysLength: 30
                },
                {
                    name: 'October',
                    num: 10,
                    daysLength: 31
                },
                {
                    name: 'November',
                    num: 11,
                    daysLength: 30
                },
                {
                    name: 'Desember',
                    num: 12,
                    daysLength: 31
                },

            ],

            dateNow: date.getDate(),
            monthNow: date.getMonth() + 1,
            yearNow: date.getFullYear(),
            dateLengthNow: 0,

            prevMonth: 0,
            prevYear: 0,
            prevDateStart: 0,
            prevDateLength: 0,


            dataPerMonth: this.props.dataPerMonth,

            statedataPerMonth: []


        }
    }

    componentDidMount() {
        this.headDataMap()
        // this.setTanggal()
        if (this.props.dataPerMonth.length == 0) {
            setTimeout(() => {
                // alert("Hello");
                this.setState({ detailButton: true })
            }, 8000);
        }
    }

    componentWillMount() {
        this.setTanggal()
    }

    loopService = async (dataTemp) => {
        let dataTempCopy = dataTemp
        console.log('masuk loop service')
        console.log(dataTempCopy)

        this.setState({ statedataPerMonth: dataTemp }, () => {
            if (this.state.statedataPerMonth.length != 0) {
                let satan = this.state.statedataPerMonth
                for (let q = 0; q < 31; q++) {
                    fetch('https://covid19.mathdro.id/api/daily/' + dataTempCopy[q].month + '-' + dataTempCopy[q].date + '-' + dataTempCopy[q].year, {
                        // fetch( 'https://covid19.mathdro.id/api/daily/3-20-2020',{
                        method: 'GET'
                    })
                        .then(response => response.json())
                        .then(res => {
                            if (res.length != 0) {
                                res.map((item, index) => {
                                    if (res[index].countryRegion.toLowerCase() == this.props.myCountry.toLowerCase()) {
                                        satan[q].date = dataTempCopy[q].date
                                        satan[q].month = dataTempCopy[q].month
                                        satan[q].year = dataTempCopy[q].year
                                        satan[q].res = {
                                            countryRegion: item.countryRegion,
                                            confirmed: item.confirmed,
                                            recovered: item.recovered,
                                            deaths: item.deaths,
                                        }
                                    }
                                })
                            } else {
                                satan[q].date = dataTempCopy[q].date
                                satan[q].month = dataTempCopy[q].month
                                satan[q].year = dataTempCopy[q].year
                                satan[q].res = {
                                    countryRegion: this.props.myCountry,
                                    confirmed: 0,
                                    recovered: 0,
                                    deaths: 0,
                                }
                            }
                            console.log('index : ', q)
                            console.log(res.length)
                        })
                    if (q == 30) {
                        this.props.setdataPerMonth(satan)
                        // do{
                        // this.setState({detailButton : true})
                        // }while(this.props.dataPerMonth[30].date != null)
                        console.log('selesai loop service')
                    }
                }
            }
        })



    }

    loop30Data = async () => {
        console.log('masuk loop data')
        let dataTemp = []
        let apaaja = []
        for (let i = this.state.prevDateStart; i <= this.state.prevDateLength; i++) {
            dataTemp.push(
                {
                    date: i,
                    month: this.state.prevMonth,
                    year: this.state.prevYear
                }
            )
            if (i == this.state.prevDateLength) {
                for (let v = 1; v <= this.state.dateNow; v++) {
                    dataTemp.push(
                        {
                            date: v,
                            month: this.state.monthNow,
                            year: this.state.yearNow
                        }
                    )
                    if (v == this.state.dateNow) {
                        // this.setState({dataPerMonth : dataTemp},()=>{
                        //     console.log("state length : ",this.state.dataPerMonth.length)
                        //     let satan = this.state.dataPerMonth
                        // })
                        console.log('selesai loop data')
                        this.loopService(dataTemp)
                    }
                }
            }
        }
    }

    setTanggal = async () => {
        if (this.state.yearNow % 4 == 0) {
            let x = this.state.monthData
            x[1].daysLength = 29
            this.setState({ monthData: x })
        }
        this.state.monthData.map((item, index) => {
            if (item.num == this.state.monthNow) {
                if (this.state.monthNow - 1 == 0) {
                    this.setState({
                        prevMonth: 12,
                        prevYear: this.state.yearNow - 1,
                        prevDateLength: this.state.monthData[11].daysLength,
                        dateLengthNow: item.daysLength,
                        prevDateStart: this.state.monthData[index - 1].daysLength - (30 - this.state.dateNow)
                    }, () => {
                        if (this.props.dataPerMonth.length == 0) {
                            this.loop30Data()
                        } else {
                            console.log('data history insya allah ada')
                            this.setState({ detailButton: true })
                        }
                    })
                } else {
                    this.setState({
                        prevMonth: this.state.monthNow - 1,
                        prevYear: this.state.yearNow,
                        prevDateLength: this.state.monthData[index - 1].daysLength,
                        dateLengthNow: item.daysLength,
                        // prevDateStart : this.state.dateNow
                        prevDateStart: this.state.monthData[index - 1].daysLength - (30 - this.state.dateNow)
                    }, () => {
                        if (this.props.dataPerMonth.length == 0) {
                            this.loop30Data()
                        } else {
                            console.log('data history insya allah ada')
                            this.setState({ detailButton: true })
                        }
                    })
                }
            }
        })
    }


    headDataMap = () => {
        this.state.covidData.map((item, index) => {
            let q = item.countryRegion.toLowerCase()
            if (this.state.myCountry.toLowerCase() == q) {
                let myCase = {
                    recovered: item.recovered,
                    confirmed: item.confirmed,
                    deaths: item.deaths
                }
                this.props.setmyCase(myCase)
                this.setState({
                    myRecovered: item.recovered,
                    myConfirmed: item.confirmed,
                    myDeaths: item.deaths,
                    chartData: [
                        {
                            name: "Deaths",
                            population: item.deaths,
                            color: "red",
                            legendFontColor: "#7F7F7F",
                            legendFontSize: 15
                        },
                        {
                            name: "Confirmed",
                            population: item.recovered,
                            color: "green",
                            legendFontColor: "#7F7F7F",
                            legendFontSize: 15
                        },
                        {
                            name: "Recovered",
                            population: item.confirmed,
                            color: "orange",
                            legendFontColor: "#7F7F7F",
                            legendFontSize: 15
                        }
                    ],
                })
            }
        })
    }

    onScroll = (event) => {
        const { navigation } = this.props;
        const currentOffset = event.nativeEvent.contentOffset.y;
        const dif = currentOffset - (this.offset || 0);

        if (dif < 0) {
            console.log('up : ', currentOffset)
            this.setState({ yAxis: currentOffset })
        } else {
            //   navigation.setParams({ showTabBar: false });
            console.log('down : ', currentOffset)
            this.setState({ yAxis: currentOffset })
        }
        //console.log('dif=',dif);

        this.offset = currentOffset;
    }

    searchCovid = (value) => {
        this.setState({ country: value })
        if (this.state.country != '') {
            this.setState({
                dataShow: false
            }, () => {
                this.state.covidData.map((item, index) => {
                    let c = item.countryRegion.toLowerCase()
                    if (value.toLowerCase() == c) {
                        this.setState({ dataShow: true })
                        this.setState({
                            country: item.countryRegion,
                            cCase: item.confirmed,
                            cDeaths: item.deaths,
                            cRecovered: item.recovered,
                            cIso2: item.iso2,
                            cIso3: item.iso3
                        })
                        console.log('ada cuy')
                    }
                })
            })
        }
    }

    serviceCountryDetail = () => {
        if (this.state.country != '') {
            console.log('masuk service country detail')
            fetch(link.CountryLink + this.state.country, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(res => {
                    if (res.length == 1) {
                        console.log('dapet data country detail')
                        console.log(res)
                        this.setState({
                            cSubregion: res[0].subregion,
                            cRegion: res[0].region,
                            cCapital: res[0].capital,
                            cPopulation: res[0].population,
                        })
                    }
                })
        }

    }

    detailButtonRender() {
        if (this.state.detailButton != false) {
            return (
                <View>
                    <TouchableNativeFeedback
                        onPress={() => { this.props.navigation.navigate('Detail') }}
                    >
                        <View style={{ marginTop: 20, elevation: 5 }}>
                            <Text style={{ padding: 10, color: 'white', fontWeight: 'bold', fontSize: 20 }}>Detail</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            )
        } else {
            return (
                <Spinner color='white' />
            )
        }
    }

    headRender() {
        // if(this.state.yAxis <= 100){
        return (
            <View style={{ width: Screens.width * 100 / 100, height: Screens.height * 25 / 100, backgroundColor: 'transparent', flexDirection: 'row', paddingTop: 10 }}>
                <View style={{ width: Screens.width * 50 / 100, }}>
                    <View style={{ paddingLeft: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', paddingRight: 10 }}>#StayHome</Text>
                            <Image
                                source={{ uri: 'https://www.countryflags.io/' + this.state.myAlpha2Code + '/flat/64.png' }}
                                style={{ width: 40, height: 40, }}
                            ></Image>
                            {/* <Text style={{paddingLeft : 10, color : 'white', fontWeight : 'bold', fontSize : 20}}>{this.state.myCountry}</Text> */}
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {/* <Icon active name="logo-googleplus" /> */}
                            <Icons style={{ paddingRight: 2 }} name={'ios-pin'} size={20} color={'white'} />
                            <Text style={{ paddingLeft: 10, color: 'white', fontWeight: 'bold', fontSize: 20 }}>{this.state.myCity}</Text>
                        </View>
                        <View style={{}}>
                            <Text style={{ paddingLeft: 10, color: 'white', fontWeight: 'bold', fontSize: 20 }}>{this.state.myCountry}</Text>
                        </View>
                        <View>
                            {this.detailButtonRender()}
                        </View>
                    </View>
                </View>
                <View style={{ width: Screens.width * 50 / 100, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                    <PieChart
                        data={this.state.chartData}
                        width={Screens.width * 50 / 100}
                        height={Screens.height * 25 / 100}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 5
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "0.5",
                                stroke: "#ffa726"
                            }
                        }}
                        accessor="population"
                        hasLegend={false}
                        backgroundColor="transparent"
                        paddingLeft="50"
                    // absolute
                    />
                    <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: Screens.width * 22 / 100, height: Screens.width * 22 / 100, backgroundColor: '#977BBD', borderRadius: 50 }}></View>
                    </View>
                </View>
            </View>
        )
    }

    myCountryDataRender() {
        return (
            <View style={{ width: Screens.width * 1, justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                <View style={{ width: Screens.width * 90 / 100, backgroundColor: 'transparent', borderRadius: 10, alignItems: 'center', elevation: 10, flexDirection: 'row', }}>
                    <View style={{ width: Screens.width * 30 / 100, backgroundColor: 'white', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ paddingVertical: 5, alignItems: 'center', paddingBottom: 10 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'green' }}>{this.state.myRecovered}</Text>
                            <View style={{ paddingTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Icons name={'md-add-circle'} size={24} color={'#C1C1C1'} />
                                <View style={{ backgroundColor: 'green', borderRadius: 10, marginTop: 2 }}>
                                    <Text style={{ padding: 1, paddingHorizontal: 5, color: 'white' }}>RECOVERED</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: Screens.width * 30 / 100, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ paddingVertical: 5, alignItems: 'center', paddingBottom: 10 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'black' }}>{this.state.myConfirmed}</Text>
                            <View style={{ paddingTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Icons name={'ios-analytics'} size={24} color={'#C1C1C1'} />
                                <View style={{ backgroundColor: 'orange', borderRadius: 10, marginTop: 2 }}>
                                    <Text style={{ padding: 1, paddingHorizontal: 5, color: 'white' }}>CONFIRMED</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: Screens.width * 30 / 100, backgroundColor: 'white', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ paddingVertical: 5, alignItems: 'center', paddingBottom: 10 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'red' }}>{this.state.myDeaths}</Text>
                            <View style={{ paddingTop: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Icons name={'md-alert'} size={24} color={'#C1C1C1'} />
                                <View style={{ backgroundColor: 'red', borderRadius: 10, marginTop: 2 }}>
                                    <Text style={{ padding: 1, paddingHorizontal: 5, color: 'white' }}>DEATHS</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    searchCountry() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'flex-start', backgroundColor: 'white', paddingLeft: 20, }}>
                <View style={{ paddingTop: Screens.height * 4 / 100, backgroundColor: 'transparent', paddingBottom: 20 }}>
                    <View style={{ flexDirection: 'row', width: Screens.width * 90 / 100 }}>
                        <View style={{ width: Screens.width * 70 / 100 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#343434', }}>Search Case Covid-19</Text>
                            <Text style={{ fontWeight: '200', color: 'grey' }}>you can search case data by country name, go to detail menu</Text>
                        </View>
                        <View style={{ width: Screens.width * 20 / 100, alignItems: 'flex-end', justifyContent: 'center' }}>
                            {/* <TouchableOpacity style={{justifyContent : 'center', alignItems  :'center'}}>
                                <Text style={{color : '#01BCF1', fontWeight : 'bold'}}>Compare</Text>
                                <Text style={{color : '#01BCF1', fontWeight : 'bold'}}>Country</Text>
                            </TouchableOpacity> */}
                            <Image
                                source={require('../../image/tenor.gif')}
                                // style={{width  : Screens.width *15/100,height : Screens.width * 15/100}}
                                style={{ width: 65, height: 65 }}
                            />
                        </View>
                    </View>
                </View>
                {/* <View style={{width : Screens.width *90/100, height : 40, borderColor : 'grey',borderBottomWidth : 1, marginBottom : 22,justifyContent : 'center', flexDirection : 'row', alignItems : 'center',}}>
                    <View style={{width : Screens.width *78/100, backgroundColor : 'white',}}>
                        <TextInput
                            style={{paddingLeft : 18, fontSize : 18,justifyContent : 'center' ,fontWeight : '600', paddingBottom : 10,}}
                            placeholder={'Country Name'}
                            // onChangeText ={(value)=>{ this.searchCovid(value) }}
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
                </View> */}
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../image/back2.png')}
                    style={{ flex: 1 }}
                >
                    <Header style={{ backgroundColor: '#5C3098' }}
                        androidStatusBarColor={'#5C3098'}
                    >
                        <Left>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={require('../../image/logo.png')}
                                    style={{ height: Screens.height * 5 / 100, width: Screens.height * 5 / 100, marginLeft: 15 }}
                                ></Image>
                                {/* <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', paddingLeft: 5 }}>Awas Kena Pirus</Text> */}
                            </View>
                        </Left>
                        <Body>
                            <Title>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', paddingLeft: 5 }}>Awas Kena Pirus</Text>
                            </Title>
                        </Body>
                        <Right>
                        </Right>
                    </Header>

                    <KeyboardAvoidingView
                        style={{ flex: 1, }}
                    >

                        {this.headRender()}
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            {this.myCountryDataRender()}
                            {this.searchCountry()}

                            <View>
                                <Image
                                    source={{ uri: 'https://covid19.mathdro.id/api/og' }}
                                    style={{ width: Screens.width * 1, height: Screens.height * 30 / 100, resizeMode: 'stretch', }}
                                >
                                </Image>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>

                </ImageBackground>

            </View>
        )
    }
}

// export default Home


function mapStateToProps(state) {
    return {
        // position : state.position,
        NewsInternational: state.NewsInternational,
        NewsLocal: state.NewsLocal,
        CovidData: state.CovidData,

        myCountry: state.myCountry,
        myCity: state.myCity,
        myRegion: state.myRegion,
        mySubregion: state.mySubregion,
        myCapital: state.myCapital,
        myPopulation: state.myPopulation,
        myAlpha2Code: state.myAlpha2Code,
        myAlpha3Code: state.myAlpha3Code,

        dataPerMonth: state.dataPerMonth

    }
}

function mapDispatchToProps(dispatch) {
    return {
        // setBranchId : ( branchId ) => {
        //     dispatch ( setBranchId ( branchId ) )
        // },

        setmyCase: (myCase) => {
            dispatch(setmyCase(myCase))
        },

        setdataPerMonth: (dataPerMonth) => {
            dispatch(setdataPerMonth(dataPerMonth))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
