import {RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_QUESTION} from "../actions";

function decks (state= {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            };
        case ADD_DECK:
            const { deck } = action;
            return {
                ...state,
                [deck.title]: deck
            };
        case REMOVE_DECK:
            let newState = {...state};
            newState[action.deckId] = undefined;
            delete newState[action.deckId];
            return newState;
        case ADD_QUESTION:
            const {deckId, question} = action;
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    questions: state[deckId].questions.concat(question)
                }
            };
        default:
            return state;
    }
}

export default decks;