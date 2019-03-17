import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'Flashcards:deck';

export function getDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => results ? JSON.parse(results) : getDummyData());
}

export function createDeck ({ deck, deckId }) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({[deckId]: deck}))
}

export function deleteDeck ({ deckId }) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            data[deckId] = undefined;
            delete data[deckId];
            return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        });
}

export function addQuestion ({ deckId, question}) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results);
            const { title, questions } = data[deckId];
            data[deckId] = {
                title,
                questions: questions.concat(question)
            };
            return AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        });
}

function getDummyData() {
    const dummyData = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    };

    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData));

    return dummyData;
}