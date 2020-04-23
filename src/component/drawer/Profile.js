import React, { Component } from 'react'
import { View, Text } from 'react-native'
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

class Profile extends Component {
    render() {
        return (
            <View style={{flex: 1}}>
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
            </View>
        )
    }
}

export default Profile
