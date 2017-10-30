import React from "react";
import {View, Text, StyleSheet} from "react-native";
import DeckItem from "./DeckItem";
import {connect} from "react-redux";
import * as actionCreators from "./misc/actions";
import * as storage from "./misc/storage";
import * as localNotification from "./misc/localNotification";

class DeckListView extends React.Component {

	navigateToThisDeck = (deckID) => {
		this.props.navigation.navigate('DeckView', {deckID})
	};

	render() {

		// If there is nothing
		// TODO: return a loading state here
		if (!this.props.state) return null;

		// If there is data
		const deckListNode = Object.keys(this.props.state).map((key) => {
			const itemData = this.props.state[key];
			return <DeckItem key={key} ID={key}
							 navigateToThisDeck={this.navigateToThisDeck}
							 itemData={itemData}/>;
		});

		return (
			<View style={styles.deckListContainer}>
				{deckListNode}
			</View>
		)
	}

	componentDidMount() {
		// Get data from Async Store and store it to Redux
		storage.getAllDecks().then((data) => {
			this.props.getAllDecks(data);
		});

		// Set notification
		localNotification.setNotification();

	}
}


const styles = StyleSheet.create({
	deckListContainer: {
		flex: 1,
		alignItems:'center',
		backgroundColor:'#eceff1'
	}
});


const mapStateToProps = (state) => ({state});
const mapDispatchToProps = (dispatch) => ({
	getAllDecks: (allDecks) => {
		dispatch(actionCreators.getAllDecks(allDecks))
	},
	getSingleDeck: (title) => {
		dispatch(actionCreators.getSingleDeck(title))
	}
});


//export default DeckListView
export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)