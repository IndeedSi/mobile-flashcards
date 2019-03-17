import React, {Component} from "react";
import { StyleSheet, Text, View, Platform } from 'react-native';
import TextButton from './TextButton';
import { connect } from 'react-redux';
import { handleRemoveDeck } from "../actions";
import {black, gray, lightGray, red, white} from "../utils/colors";

class DeckDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        const deckId = navigation.getParam('deckId', null);
        return {
            title: deckId,
        }
    };
    addCard = () => {
        const { navigation, deck } = this.props;
        navigation.navigate('AddQuestion', {
            deckId: deck.title
        });
    };
    startQuiz = () => {
        const { navigation, deck } = this.props;
        navigation.navigate('Quiz', {
            deckId: deck.title
        });
    };
    deleteDeck = (deckId) => {
        this.props.dispatch(handleRemoveDeck(deckId));
        this.props.navigation.goBack();
    };
    render() {
        const { deck } = this.props;
        if (!deck) {
            return (<View>
                <Text>Deck not found</Text>
            </View>)
        }
        return (
            <View style={styles.container}>
                <View style={styles.deckContainer}>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.subtitle}>{deck.questions.length} cards</Text>
                </View>
                <View>
                    <TextButton onPress={this.addCard} style={styles.addBtn}>
                        Add card
                    </TextButton>
                    <TextButton onPress={this.startQuiz} style={styles.quizBtn}>
                        Start quiz
                    </TextButton>
                    <TextButton onPress={() => this.deleteDeck(deck.title)} style={styles.deleteBtn}>
                        Delete Deck
                    </TextButton>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: lightGray,
    },
    deckContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 48,
        padding: 10,
    },
    subtitle: {
        fontSize: 14,
        color: gray,
    },
    addBtn: {
        backgroundColor: white,
        color: black,
        borderWidth: 2,
        borderColor: black,
        borderRadius: Platform.OS === 'ios' ? 10 : 2,
        marginBottom: 20,
    },
    quizBtn: {
        backgroundColor: black,
        color: white,
        borderRadius: Platform.OS === 'ios' ? 10 : 2,
        marginBottom: 20,
    },
    deleteBtn: {
        fontSize: 24,
        color: red,
        paddingTop: 0,
        paddingBottom: 0,
    }
});

const mapStateToProps = ({decks}, { navigation }) => {
    const deckId = navigation.getParam('deckId', null);
    return {
        deck: deckId ? decks[deckId] : null
    };
};

export default connect(mapStateToProps)(DeckDetail)