import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import expoPushToken from "../api/expoPushToken";
import navigation from "../naviagtion/rootNavigation";

export default useNotification = (notificationListener) => {
  useEffect(() => {
    registerForPermissions();
    if (notificationListener)
      Notifications.addNotificationReceivedListener(notificationListener);
  }, []);

  const registerForPermissions = async () => {
    try {
      const permissions = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permissions.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      expoPushToken.register(token);
    } catch (error) {
      console.log("Eroor", error);
    }
  };
};
