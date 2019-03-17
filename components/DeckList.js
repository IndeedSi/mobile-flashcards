import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import DeckSummary from './DeckSummary';
import { connect } from 'react-redux';
import { lightGray } from "../utils/colors";

class DeckList extends Component {
    onPressItem = (title) => {
        this.props.navigation.navigate('DeckDetail', {
            deckId: title
        });
    };
    keyExtractor = (item, index) => item.title;
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {this.onPressItem(item.title)}}>
                <DeckSummary name={item.title} cards={item.questions.length}/>
            </TouchableOpacity>
        )
    };
    render() {
        const {decks} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    onPressItem={this.onPressItem}
                    data={decks}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightGray,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
});

const mapStateToProps = ({ decks }) => {
    return {
        decks: Object.values(decks)
    };
};

export default connect(mapStateToProps)(DeckList);