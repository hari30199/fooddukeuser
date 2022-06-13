import React ,{useContext,useState,useEffect}from 'react';
import {Settings, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomNavigator from './src/views/navigation/BottomNavigator';
import Notification from './src/views/screens/Notification';
import Currentloc from './src/views/screens/currentloc';
import Detail from './src/views/screens/Detail';
import HomeScreen from './src/views/screens/HomeScreen';
import SearchScreen from './src/views/screens/Searchscreen';
import CartScreen from './src/views/screens/CartScreen';
import Hoteldetails from './src/views/screens/Hotels/Hoteldetails';
import LocationView from './src/views/screens/LocationView';
import Register from './src/views/screens/Resgister';
import ForgetPassword from './src/views/screens/ForgetPassword'
import FiltersScreen  from './src/views/screens/Hotels/FiltersScreen';
import Favourites from './src/views/screens/Hotels/Favourites';
import SavedAddress from './src/views/screens/SavedAddress';
import ProfileScreen from './src/views/screens/ProfileScreen';
import ManageAddress from './src/views/screens/ManageAddress';
import Resetpassword from './src/views/screens/Resetpassword';
import VerifyOTP from './src/views/screens/VerifyOTP';
import PaymentScreen from './src/views/screens/PaymentScreen';
import AccountScreen from './src/views/screens/AccountScreen';
import OTPscreen from './src/views/screens/OTPscreen';
import {AuthContext} from './AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from './src/views/screens/SplashScreen';
import OrderConfirm from './src/views/screens/OrderConfirm';
import Myorders from './src/views/screens/Myorders';
import MyWallet from './src/views/screens/MyWallet';
import OrderDetailscreen from './src/views/screens/OrderDetailscreen';
import IntroLocation from './src/views/screens/IntroLocation';
import Phonenumber from './src/views/screens/Phonenumber';
import Updatepassword from './src/views/screens/Updatepassword';
import OrderStatus from './src/views/screens/OrderStatus';
import CancelOrder from './src/views/screens/CancelOrder';


const Stack = createStackNavigator();

const App = () => {
  const {userInfo,userinfo} = useContext(AuthContext);
  const [mylocation,setmylocation] = useState("")
  useEffect(() => {
    _retrieveData()
   }, [mylocation])
   
 const _retrieveData = async () => {
   try {
    
     const mylocation = await AsyncStorage.getItem('mylocation')
     if(mylocation != null) {
 
     }
     setmylocation(mylocation)
     
   } catch(e) {
 
   }
 }
  return (
   
    <NavigationContainer>
      <StatusBar backgroundColor='white' barStyle="dark-content" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {mylocation != null ? (
         
          <Stack.Screen name="BottomNavigator" component={BottomNavigator}/>
        ):
        (<Stack.Screen name="Home" component={IntroLocation} />) }
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Currentloc" component={Currentloc} />
        <Stack.Screen name="Detail" component={Detail}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="Hoteldetails" component={Hoteldetails}/>
        <Stack.Screen name="LocationView" component={LocationView}/>
        <Stack.Screen name="CartScreen" component={CartScreen}/>
        <Stack.Screen name="FiltersScreen" component={FiltersScreen}/>
        <Stack.Screen name="ForgetPassword" component={ForgetPassword}/>
        <Stack.Screen name="Favourites" component={Favourites} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SavedAddress" component={SavedAddress} />
        <Stack.Screen name="ManageAddress" component={ManageAddress} />
        <Stack.Screen name="Resetpassword" component={Resetpassword}/>
        <Stack.Screen name="VerifyOTP" component={VerifyOTP}/>
        <Stack.Screen name="PaymentScreen" component={PaymentScreen}/>
        <Stack.Screen name="OrderConfirm" component={OrderConfirm}/>
        <Stack.Screen name="MyWallet" component={MyWallet}/>
        <Stack.Screen name="OrderDetailscreen" component={OrderDetailscreen}/>
        <Stack.Screen name="Myorders" component={Myorders}/>
        <Stack.Screen name="Updatepassword" component={Updatepassword}/>
        <Stack.Screen name="Mywallet" component={MyWallet}/>
        <Stack.Screen name="OrderStatus" component={OrderStatus}/>
        <Stack.Screen name="CancelOrder" component={CancelOrder}/>
        
        {userInfo?.auth_token ? 
        (<Stack.Screen name="SplashScreen" component={SplashScreen}/>):
        <>
        <Stack.Screen name="AccountScreen" component={AccountScreen}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="OTPscreen" component={OTPscreen}/>
        <Stack.Screen name="Phonenumber" component={Phonenumber}/>
        </>
         }
      </Stack.Navigator> 
    </NavigationContainer>
    
  );
};

export default App;

 