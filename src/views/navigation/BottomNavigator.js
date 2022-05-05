import 'react-native-gesture-handler';
import React,{useContext,useState,useEffect} from 'react';
import { Text,View } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconBadge from 'react-native-icon-badge';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import Notification from '../screens/Notification';
import Searchscreen from '../screens/Searchscreen';
import AccountScreen from '../screens/AccountScreen';
import ProfileScreen from '../screens/ProfileScreen'
import {AuthContext} from '../../../AuthContext'
import {AuthProvider} from '../../../AuthContext';
import SplashScreen from '../screens/SplashScreen';
import SplasScreen from '../screens/SplashScreen';
import { useIsFocused } from '@react-navigation/native';
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const {userInfo,userinfo, splashLoading} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [result, setresult] = useState([]);
  const [cart_list,setcart_list] = useState([]);
  const isFocused = useIsFocused(); 
  const cartlist = () =>{

    const user_id = userInfo.id
    // console.log(user_id)
      fetch(`https://demo.foodduke.com/public/api/cart-list`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "user_id":user_id
      }),
      })
        .then((response) =>(response.json()))
        .then((result) => {
          setcart_list(result.cart_list);
          
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
       
    
  }
  const size =(cart_list != null && cart_list != undefined)?(
    Object.values(cart_list).length
  ):('0')  
  useEffect(()=>{
   isFocused ?  cartlist():cartlist()
  },[size,isFocused])
 
console.log(size)
  return (

    <Tab.Navigator
    
     keyboardHidesTabBar={true}
      screenOptions={{
        tabBarHideOnKeyboard:true,
        headerShadowVisible:true,
        keyboardHidesTabBar:true,
        showLabel: true,
        activeTintColor: 'orange',
        width:'90%',
        bottom:10,
        backgroundColor: 'transparent',
        fontFamily:'FontAwesome5_Solid',
        tabBarStyle:{
          width:'94%',
          left:12,
          bottom:6,
          backgroundColor:'white',
          borderRadius:10,
          marginBottom:7,
          marginTop:5,
          height:56
        },
        tabBarLabelStyle: {
          fontFamily:'FontAwesome5_Solid',
          fontSize:12,
          bottom:4
        },
      }}>
        {splashLoading && userinfo == '' ? (
          <Tab.Screen
          name="Splas Screen"
          component={SplasScreen}
          options={{headerShown: false}}
        />
        ): (
          <Tab.Screen
          name="Near Me"
          component={HomeScreen}
          options={{
           
            tabBarIcon: ({color}) => (
              <Icon name="home" color={color} size={24} />
            ),
            headerShown:false,
            
          }}
        />
        )}
        
      
      <Tab.Screen
        name="Alerts"
        component={Notification}
        options={{
          tabBarIcon: ({color}) => (
            <IconBadge
            MainElement={
              <View style={{
                width:20,
                height:22,
                margin:12,
                
              }}><Icon name="bell" color={color} size={22} /></View>
            }
            BadgeElement={
              <Text style={{color:'#FFFFFF',fontSize:8}}>0</Text>
            }

            IconBadgeStyle={
              {width:2,
              height:20,
              top:6,
              backgroundColor: 'orange',
              }
            }
            />
          ),
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Searchscreen}
        options={{
          tabBarIcon: ({color}) => (
              <Icon name="search-web" color={color} size={26} />
          ),
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({color}) => (
            <IconBadge
            MainElement={
              <View style={{
                width:20,
                height:22,
                margin:12,
              
              }}><Icon name="cart" color={color} size={22} /></View>
            }
            BadgeElement={
              <Text style={{color:'#FFFFFF',fontSize:8,fontStyle:'FontAwesome5_Solid'}}>{size}</Text>
            }

            IconBadgeStyle={
              {width:2,
              height:20,
              top:6,
              backgroundColor: 'orange'}
            }
            />
          ),
          headerShown:false
        }}
      />
        {splashLoading ? (
          <Tab.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : userInfo?.auth_token? (
          <Tab.Screen name="Account"
           component={ProfileScreen}
           options={{
            
            tabBarIcon: ({color}) => (
              <Icon name="account" color={color} size={28} />
            ),
            headerShown:false
          }}
           />
        ) : (
          <>
            <Tab.Screen
              name="Login"
              component={AccountScreen}
              options={{
                tabBarStyle: { display: "none" },
                tabBarIcon: ({color}) => (
                  <Icon name="account" color={color} size={22} />
                ),
                headerShown:false
              }}
            />
           
          </>
        )}
    </Tab.Navigator>
   
  );
};

export default BottomNavigator;
