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
					<Text style={styles.submitButtonText}>Submit</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	input: {
		fontSize: 32,
		width: '90%',
		marginBottom: 70
	},
	submitButton: {
		borderRadius: 5,
		backgroundColor: '#ff9900',
		padding: 10,
		width: 150
	},
	submitButtonText: {
		fontSize: 24,
		textAlign: 'center',
		color: '#fff',
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