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
    TouchableWithoutFeedbackBase,
    KeyboardAvoidingView,
} from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Input, Item } from 'native-base';
// import {WebView} from 'react-native-webview'
import 'react-native-get-random-values'
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

} from '../../redux/action/Action'
import LinkService from '../../script/Link'
const link = LinkService;
const Screens = Dimensions.get('window')

const data = [
    {
        name: "Toronto",
        population: 2800000,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15

    },
    {
        name: "Beijing",
        population: 527612,
        color: "green",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Seoul",
        population: 21500000,
        color: "orange",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
];

class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
            country: '',
            covidData: this.props.CovidData,
            dataShow: false,

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
        }
    }


    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                {/* <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{flex : 1}}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                >
                </MapView> */}
                <View>
                    <Image source={require('../../image/comingSoon.png')} style={{ width: Screens.width * 80 / 100, height: Screens.height * 40 / 100 }} />
                </View>
                <View>
                    <Text>Coming Soon</Text>
                </View>
            </View>
        )
    }
}

// export default About


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

    }
}

function mapDispatchToProps(dispatch) {
    return {
        // setBranchId : ( branchId ) => {
        //     dispatch ( setBranchId ( branchId ) )
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(About)