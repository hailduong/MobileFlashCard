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
					{/* Only show the "Start Quiz" button if there are cards */}
					{!!numberOfCards
					&& <TouchableOpacity style={[styles.btn, styles.btnInfo, styles.marginBottom]} onPress={this.startQuiz}>
						<Text style={[styles.btnInfoText]}>START QUIZ</Text>
					</TouchableOpacity>
					}
					<TouchableOpacity style={[styles.btn, styles.btnDefault]} onPress={this.addCard}>
						<Text style={[styles.btnDefaultText]}>ADD CARD</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
	deckTitle: {fontSize: 42, fontWeight: '500', marginBottom: 10, color: '#455a64'},
	numberOfCard: {color: '#90a4ae', fontSize: 28},
	btn: {
		width: 220,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 10,
		paddingLeft: 20,
		paddingBottom: 10,
		paddingRight: 25
	},
	btnInfo: {
		backgroundColor: '#00b9f2',
	},
	btnInfoText: {
		fontSize: 18,
		color: '#fff',
		fontWeight: '500'
	},
	btnDefault: {
		backgroundColor: '#cfd8dc',
	},
	btnDefaultText: {
		fontSize: 18,
		color: '#546e7a',
		fontWeight: '500'
	},
	marginBottom: {
		marginBottom: 10
	}
});

const mapStateToProps = (state) => ({
	state
});

export default connect(mapStateToProps)(DeckView);