import firebase from 'react-native-firebase';

export default async (notificationOpen) => {
  // // Set up your listener
  // firebase.notifications().onNotificationOpened((notificationOpen) => {
  //   // notificationOpen.action will equal 'snooze'
  // });

  // Build your notification
  const notification = new firebase.notifications.Notification()
    .setTitle('Android Notification Actions')
    .setBody('Action Body')
    .setNotificationId('notification-action')
    .setSound('default')
    .android.setChannelId('notification-action')
    .android.setPriority(firebase.notifications.Android.Priority.Max);
  // Build an action
  const action = new firebase.notifications.Android.Action('snooze', 'ic_launcher', 'My Test Action');
  // This is the important line
  action.setShowUserInterface(false);
  // Add the action to the notification
  notification.android.addAction(action);

  // Display the notification
  firebase.notifications().displayNotification(notification);

  return Promise.resolve();
}