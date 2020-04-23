import React, { Component } from 'react'
import {
    View,
    AsyncStorage,
    StatusBar
} from 'react-native'
import Navigation2 from './src/navigation/Navigation2'
import { Provider } from 'react-redux'
import configureStore from './src/redux/store/Store'
import { Root } from 'native-base'
import 'react-native-get-random-values';
// import { WebView } from 'react-native-webview';

const store = configureStore()
export class App extends Component {


    render() {
        return (
            <Root>
                <Provider store={store} >
                    <View style={{ flex: 1 }}>
                        <StatusBar backgroundColor={'#977BBD'} />
                        <Navigation2 />
                    </View>
                </Provider>

            </Root>

            // <View >
            //     <WebView
            //         source={{ uri: 'https://url.ngrok.io' }}
            //         style={{ marginTop: 20, }}
            //     />
            // </View>
        )
    }
}

export default App
