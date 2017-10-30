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
											<Text style={[styles.textGrayLight, styles.mBL]}>Answer</Text>
										</TouchableOpacity>
									</View>
				: <View style={styles.mainTextContainer}>
										<Text style={styles.mainText}>
											{answer}
										</Text>
										<TouchableOpacity onPress={this.toggleFace}>
											<Text style={[styles.textGrayLight, styles.mBL]}>Question</Text>
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
								<Text style={styles.buttonText}>CORRECT</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.button, styles.redBg]}
											  onPress={this.handleClickIncorrectBtn}>
								<Text style={styles.buttonText}>INCORRECT</Text>
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
			<View style={styles.mainTextContainer}>
				{/* Quiz Completed View */}
				<Text style={[styles.mainText, styles.mBL, {fontSize:38}]}>You have completed {"\n"} this Quiz</Text>
				<Text style={styles.correctText}>Correct: {percentageOfCorrectAnswers}%</Text>
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
		fontSize: 24,
		textAlign: 'right',
		paddingRight: 15
	},
	mainTextContainer: {
		alignItems: 'center',
		minHeight: 300,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 90
	},
	mainText: {
		fontSize: 48,
		textAlign: 'center',
		marginBottom: 20,
		color: '#607d8b',
		fontWeight: '400'
	},
	buttonContainer: {
		alignItems: 'center'
	},
	button: {
		width: 220,
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 10,
		marginBottom: 15
	},
	greenBg: {
		backgroundColor: '#4CAF50'
	},
	redBg: {
		backgroundColor: '#F44336'
	},
	textGrayLight: {
		color: '#90a4ae'
	},
	mBL: {
		marginBottom: 30
	},
	buttonText: {
		color: 'white',
		fontSize: 18,
		fontWeight: '500'
	},
	correctText: {
		color: '#4CAF50',
		fontSize: 28,
		fontWeight:'500'
	}

});

export default QuizView;