import React from 'react';
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { StyleSheet, Text, View, Platform } from 'react-native';
import CardsStatusBar from './components/CardsStatusBar';
import { MaterialIcons, Ionicons, FontAwesome, Foundation } from '@expo/vector-icons';
import { purple } from './utils/colors';
import Home from './components/Home';
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'
import {setLocalNotification} from "./utils/notifications";


export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification();
    }
    render() {
        return (
            <Provider store={createStore(reducer, applyMiddleware(thunk))}>
                <View style={styles.container}>
                    <CardsStatusBar backgroundColor={purple} barStyle='light-content' />
                    <Home />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
