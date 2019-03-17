import React, {Component} from "react";
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';
import TextButton from './TextButton';
import { connect } from 'react-redux';
import {handleAddDeck} from "../actions";
import {black, lightGray, red, white} from "../utils/colors";

class AddDeck extends Component {
    state = {
        title: '',
        errorMsg: '',
    };
    onChangeText = (text) => {
        this.setState({title: text, errorMsg:''});
    };
    submitDeck = () => {
        const title = this.state.title;
        if (this.props.existingDecks[title]) {
            this.setState({errorMsg: 'Deck with same title already exiists'});
            return;
        }
        this.props.dispatch(handleAddDeck(title));
        this.setState({
            title: ''
        });
        this.props.navigation.goBack();
        this.props.navigation.navigate('DeckDetail', {deckId: title});
    };
    render() {
        const { title, errorMsg } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>What is the title of your new deck?</Text>
                    <TextInput
                        placeholder="Deck Title"
                        onChangeText={this.onChangeText}
                        value={title}
                        style={styles.input}
                    />
                </View>
                <View style={styles.btnContainer}>
                    <TextButton onPress={this.submitDeck} disabled={this.state.title===''}
                                style={[styles.createButton, this.state.title==='' ? styles.disabledBtn : null]}>
                        Create Deck
                    </TextButton>
                    <Text style={styles.errorMsg}>{ errorMsg }</Text>
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
    inputContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    btnContainer: {
        marginBottom: 100,
        alignItems: 'center',
    },
    inputLabel: {
        fontSize: 32,
        paddingTop: 70,
        marginBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'center',
    },
    input: {
        backgroundColor: white,
        height: 50,
        width: '90%',
        borderRadius: Platform.OS === 'ios' ? 7 : 2,
        fontSize: 20,
        borderWidth: 1,
        borderColor: black,
        paddingLeft: 10,
    },
    createButton: {
        overflow: 'hidden',
        borderRadius: Platform.OS === 'ios' ? 10 : 2,
        backgroundColor: black,
        color: white,
    },
    disabledBtn: {
        opacity: 0.5,
    },
    errorMsg: {
        color: red,
        height: 20,
    },
});

const mapStateToProps = ({decks}) => ({
    existingDecks: decks
});

export default connect(mapStateToProps)(AddDeck);