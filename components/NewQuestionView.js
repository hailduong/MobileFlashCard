import React from "react";
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import * as actionCreators from "./misc/actions";

class NewQuestionView extends React.Component {

	state = {
		question: '',
		answer: ''
	};

	handleQuestionChange = (text) => {
		this.setState({
			question: text
		})
	};

	handleAnswerChange = (text) => {
		this.setState({
			answer: text
		})
	};

	handleSubmitQuestion = () => {
		// Submit to Redux
		const deckID = this.props.navigation.state.params.deckID;
		const question = this.state;
		this.props.addCard(deckID, question);

		// Clear question/answer fields
		this.setState({
			question: '',
			answer: ''
		})
	};

	render() {

		const {answer, question} = this.state;

		return (
			<View style={styles.container}>
				<TextInput style={styles.input} onChangeText={this.handleQuestionChange} placeholder="Question" value={question}/>
				<TextInput style={styles.input} onChangeText={this.handleAnswerChange} placeholder="Answer" value={answer}/>
				<TouchableOpacity style={styles.submitButton} onPress={this.handleSubmitQuestion}>
					<Text style={styles.submitButtonText}>ADD QUESTION</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	},
	input: {
		fontSize: 28,
		width: '90%',
		marginTop: 70,
		paddingBottom: 10,
	},
	submitButton: {
		borderRadius: 10,
		backgroundColor: '#00b9f2',
		padding: 10,
		width: 220,
		marginTop: 70
	},
	submitButtonText: {
		fontSize: 18,
		textAlign: 'center',
		color: '#fff',
		fontWeight: '500'
	}
});

const mapStateToProps = (state) => ({
	state: state
});

const mapDispatchToProps = (dispatch) => ({
	addCard: (deckTitle, cardQuestion) => {
		dispatch(actionCreators.addCard(deckTitle, cardQuestion));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestionView)