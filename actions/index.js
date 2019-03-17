import {addQuestion, createDeck, deleteDeck, getDecks} from "../utils/api";

export const RECEIVE_DECKS="RECEIVE_DECKS";
export const ADD_DECK="ADD_DECK";
export const REMOVE_DECK="REMOVE_DECK";
export const ADD_QUESTION="ADD_QUESTION";

export const receiveDecks = (decks) => ({
    type: RECEIVE_DECKS,
    decks
});

export const addDeck = (deck) => ({
    type: ADD_DECK,
    deck
});

export const removeDeck = (deckId) => ({
    type: REMOVE_DECK,
    deckId
});

export const addQuestionAction = (deckId, question) => ({
    type: ADD_QUESTION,
    deckId,
    question
});

export const handleInitialLoad = () => (dispatch) => {
    return getDecks()
        .then((decks) => {
            dispatch(receiveDecks(decks))
        })
};

export const handleAddDeck = (title) => (dispatch) => {
    const deck = {
        title: title,
        questions: []
    };
    return createDeck({deckId: title, deck})
        .then(() => {
            dispatch(addDeck(deck))
        })
};


export const handleRemoveDeck = (deckId) => (dispatch) => {
    return deleteDeck({ deckId })
        .then(() => {
            dispatch(removeDeck(deckId))
        })
};

export const handleAddQuestion = (deckId, question) => (dispatch) => {
    return addQuestion({deckId, question})
        .then(() => {
            dispatch(addQuestionAction(deckId, question))
        })
};