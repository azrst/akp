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
    Linking
} from 'react-native'
import { connect } from 'react-redux';
import {
    setdataPerMonth,
    setNewsLocal,
    setNewsInternational
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

export class D_InternationalNews extends Component {
    constructor(props) {
        super(props)
        this.state = {
            internationalNewsData: this.props.NewsInternational,
            headerImageUrl: '',
            titleImageUrl: '',
            linkImageUrl: '',
        }
    }

    componentDidMount() {
        // if (this.props.NewsInternational.length == 0) {
        this.serviceNewsInternational()
        // }
    }

    serviceNewsInternational = () => {
        this.setState({ log: 'Get Local News' })
        fetch(link.NewsLinkQueryInternational + 'covid' + link.NewsKey, {
            method: 'GET',
            // header : {},
            // body : {}
        })
            .then(response => response.json())
            .then(res => {
                console.log('NewsLocal status : ', res.status)
                if (res.status == 'ok') {
                    console.log('local articles : ', res.articles.length)
                    this.setState({ subLog: "news local length" + res.articles.lengt })
                    let mentah = res.articles
                    let mateng = []
                    if (mentah.length != 0) {
                        mentah.map((item, index) => {
                            mateng.push({
                                id: item.source.id,
                                name: item.source.name,
                                author: item.author,
                                title: item.title,
                                description: item.description,
                                url: item.url,
                                urlToImage: item.urlToImage,
                                publishedAt: item.publishedAt,
                                content: item.connect,
                                date: item.publishedAt.slice(0, 10)
                            })
                            if (index == mentah.length - 1) {
                                this.props.setNewsInternational(mateng)
                                this.setState({
                                    internationalNewsData: mateng,
                                    headerImageUrl: mentah[0].urlToImage,
                                    titleImageUrl: mentah[0].title,
                                    linkImageUrl: mentah[0].url
                                })
                            }
                        })
                    } else {
                        console.log('data local news 0')
                        this.setState({ subLog: "news local length 0" })
                        this.props.setNewsLocal(mentah)
                    }
                } else {
                    console.log('news local status bad request')
                    this.setState({ subLog: "news local fail" })
                }
            })
    }

    NewsRowRender() {
        if (this.props.NewsInternational.length != 0) {
            return (
                <View>
                    {this.state.internationalNewsData.map((item, index) => {
                        return (
                            <View style={{ width: Screens.width * 90 / 100, backgroundColor: 'white', padding: 10, elevation: 5, marginVertical: 5, borderRadius: 10 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}> */}
                                    <Image source={{ uri: item.urlToImage }} style={{ width: Screens.width * 30 / 100, resizeMode: 'stretch', height: Screens.width * 18 / 100 }} />
                                    {/* </View> */}
                                    <View style={{ width: Screens.width * 50 / 100, justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: 10 }}>
                                        <Text>{item.title}</Text>
                                        <TouchableOpacity
                                            onPress={async () => {
                                                const supported = await Linking.canOpenURL(item.url);
                                                if (supported) {
                                                    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                                                    // by some browser in the mobile
                                                    await Linking.openURL(item.url);
                                                } else {
                                                    console.log(`Don't know how to open this URL: ${item.url}`);
                                                }
                                            }}
                                        >
                                            <Text style={{ color: 'blue' }}>see more...</Text>
                                        </TouchableOpacity>
                                        <Text style={{ color: 'grey' }}>{item.publishedAt.slice(0, 10)}</Text>
                                    </View>

                                </View>
                            </View>
                        )
                    })
                    }
                </View>
            )
        } else {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner color='#5C3098' />
                </View>
            )
        }

    }

    NewsHeader() {
        if (this.props.NewsInternational.length != 0) {
            return (
                <View>
                    <Image source={{ uri: this.state.headerImageUrl }} style={{ width: Screens.width * 90 / 100, resizeMode: 'stretch', height: Screens.width * 50 / 100 }} />
                    <View style={{ position: 'absolute', width: Screens.width * 90 / 100, marginTop: Screens.width * 25 / 100, height: Screens.width * 25 / 100, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <TouchableOpacity
                            onPress={async () => {
                                const supported = await Linking.canOpenURL(this.state.linkImageUrl);
                                if (supported) {
                                    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                                    // by some browser in the mobile
                                    await Linking.openURL(this.state.linkImageUrl);
                                } else {
                                    console.log(`Don't know how to open this URL: ${this.state.linkImageUrl}`);
                                }
                            }}
                        >
                            <Text style={{ paddingVertical: 10, paddingHorizontal: 20, color: 'white', fontWeight: 'bold', fontSize: 18 }}>{this.state.titleImageUrl}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (
                <View>
                    <Spinner color='#5C3098' />
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{ width: Screens.width * 1, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    {this.NewsHeader()}
                </View>
                <View style={{ width: Screens.width * 95 / 100, paddingTop: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#343434', paddingLeft: 5 }}>News in Your Country</Text>
                </View>
                <View style={{ paddingVertical: 10 }}>
                    {this.NewsRowRender()}
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        // position : state.position,
        worldCase: state.worldCase,
        myCase: state.myCase,
        myCountry: state.myCountry,
        dataPerMonth: state.dataPerMonth,
        myAlpha2Code: state.myAlpha2Code,
        NewsLocal: state.NewsLocal,
        NewsInternational: state.NewsInternational
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // setBranchId : ( branchId ) => {
        //     dispatch ( setBranchId ( branchId ) )
        // },

        setNewsInternational: (NewsInternational) => {
            dispatch(setNewsInternational(NewsInternational))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(D_InternationalNews)