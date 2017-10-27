
import {GET_ALL_DECKS, GET_SINGLE_DECK, ADD_DECK, ADD_CARD} from "./actionTypes";

export function getAllDecks(allDecks) {
	return {
		type: GET_ALL_DECKS,
		allDecks
	}
}

export function getSingleDeck(title) {
	return {
		type: GET_SINGLE_DECK,
		title
	}
}

export function addDeck(title) {
	return {
		type: ADD_DECK,
		title
	}
}

export function addCard(deckTitle, cardQuestion) {
	return {
		type: ADD_CARD,
		title: deckTitle,
		question: cardQuestion
	}
}
