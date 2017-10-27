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
				<Text>{numberOfCards} cards</Text>
			</TouchableOpacity>
		)
	}

	componentDidMount() {
		
	}
}

const styles = StyleSheet.create({
	deckContainer: {
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomColor: '#999',
		borderBottomWidth: 1
	},
	title: {
		fontWeight: 'bold'
	}
});