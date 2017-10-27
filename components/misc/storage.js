import {AsyncStorage} from "react-native";

const STORAGE_KEY = "LDMobileFlashCard";


const initialState = {
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

export const getAllDecks = () => {
	// Set default data if there is no data
	return AsyncStorage.getItem(STORAGE_KEY)
		.then((data) => {
				if (!data) {
					AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
					return initialState;
				}
				return JSON.parse(data);
			}
		);
};

export const updateDecks = (data) => {
	return AsyncStorage.mergeItem(STORAGE_KEY, data, () => {
		AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
			console.log('New Data', result)
		})
	})
};