import React, { Component } from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

import LinkService from '../../script/Link'
const link = LinkService;

const Screens = Dimensions.get('window')
const date = new Date()


class Profile extends Component {
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

export default Profile
