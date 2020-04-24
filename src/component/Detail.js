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
import { Container, Header, Left, Body, Right, Button, Icon, Title, Input, Item } from 'native-base';
import { } from 'react-native-gesture-handler';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import D_CountryGraph from './Detail/D_CountryGraph'
import D_CompareCountry from './Detail/D_CompareCountry'
import D_TopRank from './Detail/D_TopRank'
import D_LocalNews from './Detail/D_LocalNews'
import D_InternationalNews from './Detail/D_InternationalNews'


import Icons from 'react-native-vector-icons/Ionicons';
import {

} from '../redux/action/Action'
import LinkService from '../script/Link'
const link = LinkService;

const Screens = Dimensions.get('window')

export class CompareCountry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: [
                {
                    title: 'Country Graph',
                    bool: true,
                },
                {
                    title: 'Compare Country',
                    bool: false,
                },
                {
                    title: 'Top Rank',
                    bool: false,
                },
                {
                    title: 'Local News',
                    bool: false,
                },
                {
                    title: 'International News',
                    bool: false,
                },
            ]
        }
    }

    setMenufalse = () => {
        this.state.menu.map((item, index) => {
            let a = this.state.menu
            a[index].bool = false
            this.setState({ menu: a })
        })
    }
    menuPress = (bool, index) => {
        this.setMenufalse()
        let b = this.state.menu
        b[index].bool = true
        this.setState({ menu: b })
    }

    searchRender() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                <View style={{ width: Screens.width * 90 / 100, height: 40, borderColor: 'grey', borderBottomWidth: 1, marginBottom: 22, justifyContent: 'center', flexDirection: 'row', alignItems: 'center', }}>
                    <View style={{ width: Screens.width * 78 / 100, backgroundColor: 'white', }}>
                        <TextInput
                            style={{ paddingLeft: 18, fontSize: 18, justifyContent: 'center', fontWeight: '600', paddingBottom: 10, }}
                            placeholder={'Country Name'}
                            // onChangeText ={(value)=>{ this.searchCovid(value) }}
                            value={this.state.country}
                        // onEndEditing ={()=>{this.serviceCountryDetail()}}
                        ></TextInput>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <View style={{ width: Screens.width * 12 / 100, height: 20, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                                <Icons name={'ios-search'} size={24} color={'#C1C1C1'} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    menuRender() {
        return (
            <View style={{ flexDirection: 'row' }}>

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {this.state.menu.map((item, index) => {
                        if (item.bool == false) {
                            return (
                                <View style={{ paddingLeft: 15, paddingVertical: 20, paddingRight: 5 }}>
                                    <TouchableNativeFeedback
                                        onPress={() => { this.menuPress(item.bool, index) }}
                                    >
                                        <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: '#5C3098', backgroundColor: 'white', elevation: 5 }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#343434', }}>{item.title}</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            )
                        } else {
                            return (
                                <View style={{ paddingLeft: 15, paddingVertical: 20, paddingRight: 5 }}>
                                    <TouchableNativeFeedback
                                        onPress={() => { this.menuPress(item.bool, index) }}
                                    >
                                        <View style={{ paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, backgroundColor: '#5C3098', elevation: 5 }}>
                                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#343434', color: 'white' }}>{item.title}</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            )
                        }
                    })}
                </ScrollView>
            </View>

        )
    }

    menuResultRender() {
        return (
            <View>
                {this.state.menu.map((item, index) => {
                    if (item.title == 'Country Graph' && item.bool == true) {
                        return (
                            <View>
                                <D_CountryGraph />
                            </View>
                        )
                    } else if (item.title == 'Compare Country' && item.bool == true) {
                        return (
                            <View>
                                <D_CompareCountry />
                            </View>
                        )
                    } else if (item.title == 'Top Rank' && item.bool == true) {
                        return (
                            <View>
                                <D_TopRank />
                            </View>
                        )
                    } else if (item.title == 'Local News' && item.bool == true) {
                        return (
                            <View>
                                <D_LocalNews />
                            </View>
                        )
                    } else if (item.title == 'International News' && item.bool == true) {
                        return (
                            <View>
                                <D_InternationalNews />
                            </View>
                        )
                    }
                })}
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {/* <Text>CompareCountry</Text> */}
                <Header style={{ backgroundColor: '#5C3098' }}
                    androidStatusBarColor={'#5C3098'}
                >
                    <Left>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={require('../image/logo.png')}
                                style={{ height: Screens.height * 5 / 100, width: Screens.height * 5 / 100, marginLeft: 15 }}
                            ></Image>
                            {/* <Text style={{fontSize : 18, fontWeight : 'bold', color : 'white', paddingLeft : 5}}>VKWk</Text> */}
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
                <View>
                    {this.menuRender()}
                </View>
                <ScrollView>
                    {this.menuResultRender()}
                </ScrollView>
            </View>
        )
    }
}

// export default WebView



function mapStateToProps(state) {
    return {
        // position : state.position,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        // setBranchId : ( branchId ) => {
        //     dispatch ( setBranchId ( branchId ) )
        // },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareCountry)