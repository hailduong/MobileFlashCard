import {GET_ALL_DECKS, GET_SINGLE_DECK, ADD_DECK, ADD_CARD} from "./actionTypes";

function flashCardReducers(state = {}, action) {
	switch (action.type) {
		case GET_ALL_DECKS: {
			return action.allDecks;
		}

		case GET_SINGLE_DECK: {
			// TODO
			return state;
		}

		case ADD_DECK: {
			const inputDeckName = action.title;
			const newDeck = {
				title: inputDeckName,
				questions: []
			};

			const newState = JSON.parse(JSON.stringify(state));
			newState[inputDeckName] = newDeck;
			return newState;
		}

		case ADD_CARD: {
			const {question, title} = action;
			const newState = JSON.parse(JSON.stringify(state));
			newState[title].questions.push(question);
			return newState;
		}

		default: {
			return state;
		}
	}
}

export default flashCardReducers;
