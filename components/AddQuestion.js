import React, {Component} from "react";
import {StyleSheet, TextInput, View, Platform } from 'react-native';
import TextButton from "./TextButton";
import { connect } from 'react-redux';
import {handleAddQuestion} from "../actions";
import {black, lightGray, white} from "../utils/colors";

class AddQuestion extends Component {
    state = {
        question: '',
        answer: '',
    };
    onChangeText = (field, text) => {
        this.setState({
            [field]: text
        });
    };
    submitQuestion = (deckId) => {
        const { question, answer } = this.state;
        this.props.dispatch(handleAddQuestion(deckId, {
            question,
            answer
        }));
        this.setState({
            question: '',
            answer: '',
        });
        this.props.navigation.goBack();
    };
    render() {
        const { navigation } = this.props;
        const deckId = navigation.getParam('deckId', null);
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Question"
                        onChangeText={(text) => this.onChangeText('question', text)}
                        value={this.state.question}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Answer"
                        onChangeText={(text) => this.onChangeText('answer', text)}
                        value={this.state.answer}
                        style={styles.input}
                    />
                </View>
                <TextButton onPress={() => this.submitQuestion(deckId)}
                            disabled={(this.state.answer==='') || (this.state.question ==='')}
                            style={[styles.submitBtn,
                                (this.state.answer==='') || (this.state.question ==='') ? styles.disabledBtn : null]}>
                    Submit
                </TextButton>
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
    inputContainer: {
        marginTop: 100,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    input: {
        backgroundColor: white,
        height: 50,
        borderRadius: Platform.OS === 'ios' ? 7 : 2,
        fontSize: 20,
        width: '90%',
        marginTop: 30,
        borderWidth: 1,
        borderColor: black,
        paddingLeft: 10,
    },
    submitBtn: {
        marginBottom: 100,
        borderRadius: Platform.OS === 'ios' ? 10 : 2,
        fontSize: 16,
        backgroundColor: black,
        color: white,
    },
    disabledBtn: {
        opacity: 0.5,
    },
});
export default connect()(AddQuestion);