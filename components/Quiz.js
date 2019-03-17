import React, {Component} from "react";
import { StyleSheet, Text, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import TextButton from "./TextButton";
import {black, green, lightGray, red, white} from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/notifications";

class Quiz extends Component {
    state = {
        index: 0,
        correct: 0,
        showAnswer: false,
    };
    toggleAnswer = () => {
        this.setState((state) => ({
            showAnswer: !state.showAnswer
        }));
    };
    handleAnswer = (isCorrect, total) => {
        const index = this.state.index;
        this.setState((state) => ({
            index: state.index + 1,
            correct: isCorrect ? state.correct + 1 : state.correct,
            showAnswer: false,
        }));
        if (index + 1 === total) {
            clearLocalNotification()
                .then(setLocalNotification)
        }
    };
    retryQuiz = () => {
        this.setState({
            index: 0,
            correct: 0,
            showAnswer: false,
        });
    };
    backToDeck = () => {
        this.props.navigation.goBack();
    };
    render() {
        const { questions } = this.props;
        if (!questions || questions.length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>Sorry, you cannot take a quiz because there are no cards in the deck.</Text>
                </View>
            );
        }
        const length = questions.length;
        const { index, correct, showAnswer } = this.state;
        if (index === length) {
            return (
                <View style={styles.container}>
                    <Text style={styles.text}>You correctly answered {correct} out of {length} questions</Text>
                    <View>
                        <TextButton onPress={this.retryQuiz} style={styles.retryBtn}>Restart Quiz</TextButton>
                        <TextButton onPress={this.backToDeck} style={styles.backBtn}>Back to Deck</TextButton>
                    </View>
                </View>)
        }
        const { question, answer } = questions[index];
        return (
            <View style={styles.container}>
                <Text style={styles.index}> {length - index} / {length} </Text>
                <View style={styles.contentWrapper}>
                    <Text style={styles.content}> {showAnswer ? answer : question} </Text>
                    <TextButton onPress={this.toggleAnswer} style={styles.toggleAnswerBtn}>
                        {showAnswer ? 'Question' : 'Answer'}
                    </TextButton>
                </View>
                <View>
                    <TextButton onPress={() => this.handleAnswer(true, length)} style={styles.correctBtn}>Correct</TextButton>
                    <TextButton onPress={() => this.handleAnswer(false, length)} style={styles.incorrectBtn}>Incorrect</TextButton>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: lightGray,
    },
    index: {
        alignSelf: 'flex-start',
        margin: 10,
    },
    contentWrapper: {
        alignItems: 'center',
    },
    content: {
        fontSize: 48,
        textAlign: 'center',
    },
    toggleAnswerBtn: {
        color: red,
        fontSize: 24,
        paddingTop: 0,
        paddingBottom: 0,
    },
    correctBtn: {
        borderRadius: Platform.OS === 'ios' ? 10 : 2,
        backgroundColor: green,
        color: white,
        marginBottom: 20,
    },
    incorrectBtn: {
        borderRadius: Platform.OS === 'ios' ? 10 : 2,
        backgroundColor: red,
        color: white,
        marginBottom: 70,
    },
    retryBtn: {
        borderRadius: Platform.OS === 'ios' ? 10 : 2,
        backgroundColor: white,
        color: black,
        borderWidth: 2,
        borderColor: black,
        marginBottom: 20,
    },
    backBtn: {
        borderRadius: Platform.OS === 'ios' ? 10 : 2,
        backgroundColor: black,
        color: white,
        marginBottom: 70,
    },
    text: {
        marginTop: 100,
        fontSize: 32,
        textAlign: 'center',
        padding: 10,
    },
});

const mapStateToProps = ({decks}, { navigation }) => {
    const deckId = navigation.getParam('deckId', null);
    return {
        questions: deckId && decks[deckId] ? decks[deckId].questions : null
    };
};

export default connect(mapStateToProps)(Quiz)