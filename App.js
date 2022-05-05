import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { PersistGate } from 'redux-persist/integration/react';
import {AuthProvider} from './AuthContext';
import { Provider } from 'react-redux'
import { store, persistor } from './Redux/Store'
import Navigation from './Navigation';
// import { AddProvider } from './Addcontext';
import SplashScreen from  "react-native-splash-screen";
import InternetConnectionAlert from "react-native-internet-connection-alert";

const Stack = createStackNavigator();


const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <InternetConnectionAlert
    onChange={(connectionState) => {
      console.log("Connection State: ", connectionState.details);
     }}>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <AuthProvider>
          <Navigation/>
    </AuthProvider>
    </PersistGate>
    </Provider>
    </InternetConnectionAlert>
  );
};

export default App;

