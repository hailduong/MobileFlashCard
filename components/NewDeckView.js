import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import {connect} from "react-redux";
import * as actionCreators from "./misc/actions";

class NewDeckView extends React.Component {

	state = {
		inputDeckName: ""
	};

	handleDeckNameChange = (text) => {
		this.setState({inputDeckName: text});
	};

	submitNewDeck = () => {
		// Submit new deck to Redux
		const inputDeckName = this.state.inputDeckName;
		this.props.addDeck(inputDeckName);

		// Clear the input
		this.setState({inputDeckName: ""})

		// TODO: Submit to AsyncStorage


		// TODO: Navigate to the "Add new Question View" for add new question
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.headerText}>What is the title of your new deck?</Text>
				<TextInput style={styles.deckNameInput} value={this.state.inputDeckName} onChangeText={this.handleDeckNameChange}/>
				<TouchableOpacity style={styles.submitButton} onPress={this.submitNewDeck}>
					<Text style={styles.submitButtonText}>Submit</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center'
	},
	headerText: {
		fontSize: 60,
		textAlign: 'center',
		marginTop: 70,
		marginBottom: 70
	},
	deckNameInput: {
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
	addDeck: (title) => {
		dispatch(actionCreators.addDeck(title))
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDeckView);