import React from 'react';

// React Native Components
import {Constants} from "expo";
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {StackNavigator, TabNavigator} from"react-navigation"

// Redux
import {Provider} from "react-redux";
import {createStore} from "redux";
import flashCardReducers from "./components/misc/reducers";
const flashCardStore = createStore(flashCardReducers);

// React Components
import DeckListView from "./components/DeckListView";
import DeckView from "./components/DeckView";
import QuizView from "./components/QuizView";
import NewDeckView from "./components/NewDeckView";
import NewQuestionView from "./components/NewQuestionView";

// Reactotron
import Reactotron from 'reactotron-react-native'
Reactotron.configure({name: 'Flash Card App'}).useReactNative().connect();

// Others
import * as storage from "./components/misc/storage";

// Stack Navigation
const StackNav = StackNavigator({
	DeskListView: {
		screen: DeckListView,
		navigationOptions: {
			headerTitle: 'Deck List',
			headerTitleStyle:{
				color:'#006064'
			},
			headerTintColor:'#006064',
			headerStyle: {
				backgroundColor: '#b2ebf2'
			}
		}
	},
	DeckView: {
		screen: DeckView,
		navigationOptions: {
			headerTitle: 'Deck',
			headerTitleStyle:{
				color:'#006064'
			},
			headerTintColor:'#006064',
			headerStyle: {
				backgroundColor: '#b2ebf2'
			}
		}
	},
	QuizView: {
		screen: QuizView,
		navigationOptions: {
			headerTitle: 'Quiz',
			headerTitleStyle:{
				color:'#006064'
			},
			headerTintColor:'#006064',
			headerStyle: {
				backgroundColor: '#b2ebf2'
			}
		}
	},
	NewQuestionView: {
		screen: NewQuestionView,
		navigationOptions: {
			headerTitle: 'New Question',
			headerTitleStyle:{
				color:'#006064'
			},
			headerTintColor:'#006064',
			headerStyle: {
				backgroundColor: '#b2ebf2'
			}
		}
	}
});

// Main Navigation
const MainNavigator = TabNavigator({
	Desks: {
		screen: StackNav,
		navigationOptions: {
			tabBarLabel: "Desks"
		}
	},
	NewDeck: {
		screen: NewDeckView,
		navigationOptions: {
			tabBarLabel: "New Deck"
		}
	}
}, {
	tabBarOptions: {
		activeTintColor: '#fff',
		labelStyle: {
			fontWeight: '700',
			fontSize:18
		},
		style: {
			backgroundColor: '#00b9f2',
		},
		indicatorStyle:{
			backgroundColor:'#ffe082'
		}
	}
});

// Save redux store to AsyncStorage
flashCardStore.subscribe(() => {
	const currentReduxState = flashCardStore.getState();
	storage.updateDecks(JSON.stringify(currentReduxState));
});

export default class App extends React.Component {
	render() {
		return (
			<Provider store={flashCardStore}>
				<View style={styles.container}>
					<StatusBar backgroundColor="blue" barStyle="light-content" style={styles.statusBar}/>
					<MainNavigator/>
				</View>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {flex: 1, paddingTop: Constants.statusBarHeight},
	statusBar: {height: 100}
});
