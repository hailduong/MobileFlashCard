import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

export default class DeckItem extends React.Component {

	handleClickDeck = () => {
		const thisID = this.props.ID;
		this.props.navigateToThisDeck(thisID);
	};

	render() {

		const {title, questions} = this.props.itemData;
		const numberOfCards = questions ? questions.length : 0;

		return (
			<TouchableOpacity style={styles.deckContainer} onPress={this.handleClickDeck}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.numberOfCards}>{numberOfCards} cards</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	deckContainer: {
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 35,
		elevation: 2,
		borderRadius:10,
		width: '80%',
		backgroundColor:'#fff'
	},
	title: {
		fontWeight: 'bold',
		fontSize: 24,
		color:'#607d8b'
	},
	numberOfCards: {
		fontSize: 18,
		color:'#90a4ae'
	}
});