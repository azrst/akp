import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    AsyncStorage
} from 'react-native'
import GetLocation from 'react-native-get-location'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { connect } from 'react-redux';
import {
    setLatitude,
    setLongitude,
    setmyCountry,
    setmyCity,
    setNewsInternational,
    setNewsLocal,
    setCovidData,
    setmyRegion,
    setmySubregion,
    setmyPopulation,
    setmyCapital,
    setmyAlpha2Code,
    setmyAlpha3Code,
    setworldCase
} from '../redux/action/Action'

import LinkService from '../script/Link'
const link = LinkService;

class Splash extends Component {
    constructor (props) {
        super(props)

        this.state = {
            num : 0,
            log : '',
            subLog : '',

            longitude : '',
            latitude : '',

            alpha2Code : '',

            skip : false,

        }

    }

    componentDidMount(){
        this.skipCarousel()
        this.getLongitudeLatitude()

    }

    getLongitudeLatitude = () =>{
        this.setState({log : 'Get Longitude Latitude'})
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            // enableMediumAccuracy : true,
            // enableLowAccuracy : true,
            timeout: 10000,
        })
        .then(location => {
            // console.warn(location);
            this.props.setLongitude(location.longitude)
            this.props.setLatitude(location.latitude)
            let long = location.longitude
            let lat = location.latitude
            this.setState({
                latitude : long,
                longitude : lat,
            },()=>{
                // console.warn('state long : ', this.state.longitude)
                // console.warn('state lat : ', this.state.latitude)
                this.getGeoInformation()
            })
        })
        .catch(error => {
            this.setState({log : 'error get location'})
            const { code, message } = error;
            this.setState({subLog : message})
            console.log(code, message);
        })
    }

    getGeoInformation = () =>{
        this.setState({log : 'Get Geo Information'})
        fetch(link.GeoLink + this.state.longitude+','+this.state.latitude+'?geoit=json',{
            method : 'GET'
        })
        .then(response => response.json())
        .then(res =>{
            if(res.country != ''){
                // console.warn(res)
                // console.warn(res.country)
                // console.warn(res.city)
                let country = res.country
                // console.warn('city props : ', res.city)
                this.setState({subLog : res.city})
                this.props.setmyCity(res.city)
                this.props.setmyCountry(res.country)
                this.getCountryInformation(country)

            }
        })
    }

    getCountryInformation = (country) =>{
        this.setState({log : 'Get Country Information'})
        fetch(link.CountryLink+country,{
            method : 'GET'
        })
        .then(response => response.json())
        .then(res =>{
            // console.warn(res)
            // this.props.navigation.replace('Homes')
            if(res.length != 0){
                // console.warn(res[0].subregion)
                // console.warn(res[0].region)
                // console.warn(res[0].population)
                // console.warn(res[0].capital)
                // console.warn(res[0].alpha2Code)
                // console.warn(res[0].alpha3Code)
                this.setState({alpha2Code : res[0].alpha2Code})
                this.props.setmyRegion(res[0].region)
                this.props.setmySubregion(res[0].subregion)
                this.props.setmyPopulation(res[0].population)
                this.props.setmyCapital(res[0].capital)
                this.props.setmyAlpha2Code(res[0].alpha2Code)
                this.props.setmyAlpha3Code(res[0].alpha3Code)
                this.serviceCovidData()
                

            }
            // else{
            //     console.warn('Get Country Information Fail')
            // }
        })
    }

    serviceCovidData = () =>{
        this.setState({log : 'Get Covid Data'})
        fetch(link.CovidLink,{
            method : 'GET'
        })
        .then(response =>response.json())
        .then(res=>{
            if(res.length != 0){
                // console.warn('covid : ', res)
                this.props.setCovidData(res)
                this.serviceCovidGlobal()
                // if(this.state.skip == true){
                //     this.props.navigation.replace('Homes', {screen : 'Home'})
                // }else{
                //     this.props.navigation.replace('FirstPage')
                // }
            }else{
                // console.warn('covid data fail get')
                this.setState({subLog : "covid data fail get"})
            }
        })
    }

    serviceCovidGlobal = () =>{
        this.setState({log : 'Get Covid Data Global'})
        fetch('https://covid19.mathdro.id/api',{
            method : 'GET'
        })
        .then(response =>response.json())
        .then(res=>{
            if(res.confirmed.value !=null){
                // console.warn('covid global : ', res)
                let globalData = {
                    confirmed : res.confirmed.value,
                    recovered : res.recovered.value,
                    deaths : res.deaths.value
                }
                this.props.setworldCase(globalData)
                // this.props.setCovidData(res)
                if(this.state.skip == true){
                    this.props.navigation.replace('Homes', {screen : 'Home'})
                }else{
                    this.props.navigation.replace('FirstPage')
                }
            }
            else{
                // console.warn('covid global data fail get')
                this.setState({subLog : "covid data fail get"})
            }
        })
    }

    serviceNewsInternational = () => {
        this.setState({log : 'Get International News'})
        fetch(link.NewsLinkQueryInternational + 'covid' + link.NewsKey, {
                method : 'GET',
                // header : {},
                // body : {}
        })
        .then(response => response.json())
        .then (res => {
            console.warn('News International status : ',res.status)
            if(res.status == 'ok' && res.articles.length !=0){
                console.warn('International articles',res.articles)
                let mentah = res.articles
                let mateng = []
                mentah.map((item,index)=>{
                    mateng.push({
                        id : item.source.id,
                        name : item.source.name,
                        author  : item.author,
                        title  :item.title,
                        description  : item.description,
                        url : item.url,
                        urlToImage : item.urlToImage,
                        publishedAt : item.publishedAt,
                        content : item.connect,
                        date : item.publishedAt.slice(0,10)
                    })
                    if(index == mentah.length-1){
                        this.props.setNewsInternational(mateng)
                        // this.serviceNewsLocal()
                        this.setState({subLog : "news international success"})
                        if(this.state.skip == true){
                            this.props.navigation.replace('Homes', {screen : 'Home'})
                        }else{
                            this.props.navigation.replace('FirstPage')
                        }
                    }
                })
            }else{
                // this.serviceNewsLocal()
                this.setState({subLog : "news international fail"})
                if(this.state.skip == true){
                    this.props.navigation.replace('Homes', {screen : 'Home'})
                }else{
                    this.props.navigation.replace('FirstPage')
                }
            }
        })
    }

    serviceNewsLocal = () => {
        this.setState({log : 'Get Local News'})
        fetch(link.NewsLinkQueryLocal+'covid'+'&country='+this.state.alpha2Code+link.NewsKey, {
                method : 'GET',
                // header : {},
                // body : {}
        })
        .then(response => response.json())
        .then (res => {
            console.warn('NewsLocal status : ',res.status)
            if(res.status == 'ok'){
                console.warn('local articles : ',res.articles.length)
                this.setState({subLog : "news local length"+res.articles.lengt})
                let mentah = res.articles
                let mateng = []
                if(mentah.length !=0){
                    mentah.map((item,index)=>{
                        mateng.push({
                            id : item.source.id,
                            name : item.source.name,
                            author  : item.author,
                            title  :item.title,
                            description  : item.description,
                            url : item.url,
                            urlToImage : item.urlToImage,
                            publishedAt : item.publishedAt,
                            content : item.connect,
                            date : item.publishedAt.slice(0,10)
                        })
                        if(index == mentah.length-1){
                            this.props.setNewsLocal(mateng)
                            // this.skipCarousel()
                            if(this.state.skip == true){
                                this.props.navigation.replace('Homes', {screen : 'Home'})
                            }else{
                                this.props.navigation.replace('FirstPage')
                            }
                        }
                    })
                }else{
                    console.warn('data local news 0')
                    this.setState({subLog : "news local length 0"})
                    this.props.setNewsLocal(mentah)
                    if(this.state.skip == true){
                        this.props.navigation.replace('Homes', {screen : 'Home'})
                        this.setState({subLog : "news local success"})
                    }else{
                        this.props.navigation.replace('FirstPage')
                        this.setState({subLog : "news local success"})
                    }
                }
            }else{
                console.warn('news local status bad request')
                this.setState({subLog : "news local fail"})
            }
        })
    }

    

    skipCarousel = async () =>{
        const firstPass = await AsyncStorage.getItem('firstPass')
        if(firstPass == 'true'){
            // console.warn('firstPass : true')
            // this.props.navigation.replace('Homes', {screen : 'Home'})
            this.setState({skip : true})
        }
        else if(firstPass == null){
            // console.warn('firstPass : ', firstPass)
            // this.props.navigation.replace('FirstPage')
            this.setState({skip : false})
        }
    }



    render() {
        return (
            <View style={{flex:1}}>
                {/* <TouchableOpacity
                    onPress={()=>{this.props.navigation.replace('Homes')}}
                >
                    <Text>Splash Screen</Text>
                </TouchableOpacity>            */}

                <ImageBackground source={require('../image/splash.png')} style={{flex : 1, alignItems : 'center'}}>
                    <View style={{justifyContent : 'center', alignItems : 'center'}}>
                        <Text style={{color : 'white', fontSize : 16, fontWeight : '900'}}>{this.state.log}</Text>
                        <Text style={{color : 'white',}}>{this.state.subLog}</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}

// export default Splash


function mapStateToProps ( state ) {
    return {
        // position : state.position,
    }
}

function mapDispatchToProps ( dispatch ) {
    return {
        // setBranchId : ( branchId ) => {
        //     dispatch ( setBranchId ( branchId ) )
        // },

        setNewsInternational : (NewsInternational) =>{
            dispatch (setNewsInternational(NewsInternational))
        },

        setNewsLocal : (NewsLocal) =>{
            dispatch (setNewsLocal(NewsLocal))
        },

        setLongitude : (Longitude) =>{
            dispatch (setLongitude(Longitude))
        },

        setLatitude : (Latitude) =>{
            dispatch (setLatitude(Latitude))
        },

        setmyCountry : (myCountry) =>{
            dispatch (setmyCountry(myCountry))
        },

        setmyCity : (myCity) =>{
            dispatch (setmyCity(myCity))
        },
        
        setCovidData : (CovidData)=> {
            dispatch (setCovidData(CovidData))
        },

        setmyRegion : (myRegion) => {
            dispatch  (setmyRegion(myRegion))
        },

        setmySubregion : (mySubregion) => {
            dispatch (setmySubregion(mySubregion))
        },

        setmyPopulation : (myPopulation) => {
            dispatch (setmyPopulation(myPopulation))
        },

        setmyCapital : (myCapital) => {
            dispatch (setmyCapital(myCapital))
        },

        setmyAlpha2Code : (myAlpha2Code) => {
            dispatch (setmyAlpha2Code(myAlpha2Code))
        },

        setmyAlpha3Code : (myAlpha3Code) => {
            dispatch (setmyAlpha3Code(myAlpha3Code))
        },

        setworldCase : (worldCase) =>{
            dispatch (setworldCase(worldCase))
        },

    }
}

export default connect ( mapStateToProps , mapDispatchToProps ) ( Splash )