import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthProvider} from './AuthContext';
import Navigation from './Navigation';
// import { AddProvider } from './Addcontext';
import SplashScreen from  "react-native-splash-screen";
import { ModalPortal } from 'react-native-modals';
import InternetConnectionAlert from "react-native-internet-connection-alert";

const Stack = createStackNavigator();


const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <InternetConnectionAlert
    onChange={(connectionState) => {
      // console.log("Connection State: ", connectionState.details);
     }}>

    <AuthProvider>
          <Navigation/>
          <ModalPortal />
    </AuthProvider>
    </InternetConnectionAlert>
  );
};

export default App;

