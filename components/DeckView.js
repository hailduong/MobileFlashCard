import React from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {connect} from "react-redux";

// TODO: have a loading state

class DeckView extends React.Component {


	addCard = () => {
		const deckID = this.props.navigation.state.params.deckID;
		this.props.navigation.navigate('NewQuestionView', {deckID})
	};

	startQuiz = () => {
		const deckID = this.props.navigation.state.params.deckID;
		const deckData = this.props.state[deckID];
		this.props.navigation.navigate('QuizView', deckData)
	};

	render() {

		const deckID = this.props.navigation.state.params.deckID;
		const deckData = this.props.state[deckID];

		const {title} = deckData;
		const numberOfCards = deckData.questions ? deckData.questions.length : 0;

		return (
			<View style={styles.container}>
				<View style={styles.container}>
					<Text style={styles.deckTitle}>{title}</Text>
					<Text style={styles.numberOfCard}>{numberOfCards} cards</Text>
				</View>
				<View style={styles.container}>
					<TouchableOpacity style={[styles.btn, styles.addCardBtn]} onPress={this.addCard}>
						<Text>Add Card</Text>
					</TouchableOpacity>
					{/* Only show the "Start Quiz" button if there are cards */}
					{!!numberOfCards
					&& <TouchableOpacity style={[styles.btn, styles.addCardBtn]} onPress={this.startQuiz}>
						<Text>Start Quiz</Text>
					</TouchableOpacity>
					}
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
	deckTitle: {fontSize: 42, fontWeight: '500', marginBottom: 20},
	numberOfCard: {color: '#999999', fontSize: 28},
	btn: {
		width: 200,
		backgroundColor: '#00b9f2',
		borderRadius: 3,
		height: 35,
		alignItems: 'center',
		justifyContent: 'center'
	},
	addCardBtn: {
		marginBottom: 10
	}
});

const mapStateToProps = (state) => ({
	state
});

export default connect(mapStateToProps)(DeckView);