/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";

PushNotification.configure({
    onNotification: function (notification) {
    console.log("on notification clicked:", notification);
  },
  requestPermissions: Platform.OS === 'ios'
})

AppRegistry.registerComponent(appName, () => App);
