import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

const data = {
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
};

class QuizView extends React.Component {

	state = {
		isQuestionFace: true,
		currentQuestionIndex: 0,
		numberOfCorrectAnswer: 0
	};

	nextQuestion = () => {
		const currentQuestionIndex = this.state.currentQuestionIndex;
		this.setState({
			currentQuestionIndex: currentQuestionIndex + 1
		})
	};

	toggleFace = () => {
		this.setState((prevState) => ({
			isQuestionFace: !prevState.isQuestionFace
		}))
	};

	handleClickCorrectBtn = () => {

		this.setState((prevState) => ({
			numberOfCorrectAnswer: prevState.numberOfCorrectAnswer + 1
		}));

		this.nextQuestion();
	};

	handleClickIncorrectBtn = () => {
		this.nextQuestion();
	};

	render() {

		const {currentQuestionIndex, isQuestionFace, numberOfCorrectAnswer} = this.state;

		const data = this.props.navigation.state.params;

		// 0 Question case
		if (data.length === 0) {
			return (
				<View>
					<Text>There is no question!</Text>
				</View>
			)
		}

		// If there are questions
		const currentQuestionNumber = currentQuestionIndex + 1;
		const totalQuestions = data.questions.length;

		// If there are still questions, show it, otherwise show the complete screen
		if (currentQuestionNumber <= totalQuestions) {

			const currentQuestion = data.questions[currentQuestionIndex];
			const {question, answer} = currentQuestion;

			const currentFaceNode = isQuestionFace
				? <View style={styles.mainTextContainer}>
										<Text style={styles.mainText}>
											{question}
										</Text>
										<TouchableOpacity onPress={this.toggleFace}>
											<Text>Answer</Text>
										</TouchableOpacity>
									</View>
				: <View style={styles.mainTextContainer}>
										<Text style={styles.mainText}>
											{answer}
										</Text>
										<TouchableOpacity onPress={this.toggleFace}>
											<Text>Question</Text>
										</TouchableOpacity>
									</View>;

			return (
				<View>
					{/* Question List View */}
					<View>
						<View style={styles.currentQuestionContainer}>
							<Text style={styles.currentQuestion}>{currentQuestionNumber}/{totalQuestions}</Text>
						</View>
						{currentFaceNode}
						{/* Actions */}
						<View style={styles.buttonContainer}>
							<TouchableOpacity style={[styles.button, styles.greenBg]}
											  onPress={this.handleClickCorrectBtn}>
								<Text style={styles.buttonText}>Correct</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.button, styles.redBg]}
											  onPress={this.handleClickIncorrectBtn}>
								<Text style={styles.buttonText}>Incorrect</Text>
							</TouchableOpacity>
						</View>
					</View>
					{/* End Question List View */}
				</View>
			)
		}

		// Complete screen
		const percentageOfCorrectAnswers = Math.round(numberOfCorrectAnswer / totalQuestions * 1000) / 10;

		return (
			<View>
				{/* Quiz Completed View */}
				<Text>You have completed this Quiz</Text>
				<Text>Correct: {percentageOfCorrectAnswers}%</Text>
				{/* End Quiz Completed View */}
			</View>
		)

	}
}

const styles = StyleSheet.create({
	currentQuestionContainer: {
		height: 60,
		justifyContent: 'center',
	},
	currentQuestion: {
		fontSize: 28,
	},
	mainTextContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 400
	},
	mainText: {
		fontSize: 56,
		textAlign: 'center'
	},
	buttonContainer: {
		alignItems: 'center'
	},
	button: {
		width: 300,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
		marginBottom: 10
	},
	greenBg: {
		backgroundColor: 'green'
	},
	redBg: {
		backgroundColor: 'red'
	},
	buttonText: {
		color: 'white'
	}

});

export default QuizView;