import React, { Component } from 'react';
import DeckList from "./DeckList";
import AddDeck from "./AddDeck";
import {Platform} from "react-native";
import {purple, white} from "../utils/colors";
import {
    createAppContainer,
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
    createStackNavigator
} from "react-navigation";
import DeckDetail from "./DeckDetail";
import AddQuestion from "./AddQuestion";
import Quiz from "./Quiz";
import { connect } from 'react-redux';
import { FontAwesome, Foundation } from '@expo/vector-icons';
import {handleInitialLoad} from "../actions";

const routeConfigs = {
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <Foundation name='page-copy' size={24} color={tintColor} />
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={24} color={tintColor} />
        }
    },
};

const navigatorConfigs = {
    navigationOptions: {
        headerForceInset: { top: 'never' },
        headerStyle: {
            backgroundColor: purple,
        },
    },
    initialRouteName: 'DeckList',
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            backgroundColor: Platform.OS === 'ios' ? white : purple,
            shadowRadius: 6,
            shadowOpacity: 1,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3,
            },
        },
        labelStyle: {
            fontSize: Platform.OS === 'ios' ? 10 : 16,
        }
    }
};

const Tabs = Platform.OS === 'ios'
    ? createBottomTabNavigator(routeConfigs, navigatorConfigs)
    : createMaterialTopTabNavigator(routeConfigs, navigatorConfigs);

const navigationOptions = Platform.OS === 'ios' ? { } : { header: null };
const MainNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: navigationOptions,
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            },
            headerForceInset: { top: 'never' },
        }
    },
    AddQuestion: {
        screen: AddQuestion,
        navigationOptions: {
            title: 'Add Card',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            },
            headerForceInset: { top: 'never' },
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple,
            },
            headerForceInset: { top: 'never' },
        }
    }
}, {
    initialRouteName: 'Home',
});

const AppContainer = createAppContainer(MainNavigator);

class Home extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialLoad());
    }
    render() {
        return (<AppContainer />);
    }
}

export default connect()(Home);