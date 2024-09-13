import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import navigationTheme from "./app/naviagtion/navigationTheme";
import OfflineNotice from "./app/components/OfflineNotice";

import AppNavigator from "./app/naviagtion/AppNavigator";
import AuthNavigator from "./app/naviagtion/AuthNavigator";

import AuthContext from "./app/auth/context";
import storage from "./app/auth/storage";
import { navigationRef } from "./app/naviagtion/rootNavigation";

export default function App() {
  const [user, setUser] = useState();

  const restoreUser = async () => {
    const user = await storage.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
