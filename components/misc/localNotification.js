import {Notifications, Permissions} from "expo";

export const clearNotification = () => {
	Notifications.cancelAllScheduledNotificationsAsync();
};

export const setNotification = () => {

	Permissions.askAsync(Permissions.NOTIFICATIONS).then((info) => {

		console.log('Permission Info', info);

		const {status} = info;
		if (status === 'granted') {
			// Clear old notification
			clearNotification();
			
			// Set a new one
			const notificationObject = {
				title: "We miss you!",
				body: "Don't forget to play the Flash Card Games today...",
				sound: true
			};

			let tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			tomorrow.setHours(20);
			tomorrow.setMinutes(0);

			const schedulingOptions = {
				time: tomorrow,
				repeat: 'day'
			};
			Notifications.scheduleLocalNotificationAsync(notificationObject, schedulingOptions);

		}


	});
};