import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {gray} from "../utils/colors";

export default class DeckSummary extends Component {
    render() {
        const { name, cards } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subtitle}>{cards} card{cards > 1 ? 's': ''}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    title: {
        fontSize: 32,
        padding: 10,
    },
    subtitle: {
        fontSize: 14,
        color: gray,
    }
});