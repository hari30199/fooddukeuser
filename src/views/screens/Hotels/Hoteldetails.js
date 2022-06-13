import React, { useEffect,useState,useContext,useRef } from 'react';
import { Animated,Share, Platform,UIManager,Button, View, Text,StyleSheet,ImageBackground,Image ,FlatList,TouchableOpacity,ScrollView, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from '../../../../AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from "react-native-dialog";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import  AntDesign  from 'react-native-vector-icons/AntDesign';
import {ConstantClass} from'../Hotels/cartfind';
import Feather from 'react-native-vector-icons/Feather'
import { BoxShadow } from "react-native-shadow";
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import  Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import BASEURL from '../../../config'
import { BottomModal,ModalTitle,ModalContent} from 'react-native-modals'


if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

  
export default function Hoteldetails  (props) {
  const [isLoading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [cartdata, setcartdata] = useState([]);
  const [cart_list,setcart_list] = useState([]);
  const [itemdata, setitemdata] = useState([]);
  const [fav, setfav] = useState([]);
  const [menuitem, setMenuitems] = useState([]);
  const {  navigation } = props
  const { id,slug,name} = props.route.params;
  const {userInfo} = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [selected, setselected] = useState('0');
  const [addselected, setaddselected] = useState('0');
  const [modalVisible, setModalVisible] = useState(false);
  const [isModalvisible, setisModalvisible] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;
  const [hasLiked, setHasLiked] = useState(false);
  const [ref, setRef] = useState(null);
  const [dataSourceCords, setDataSourceCords] = useState([]);

  // console.log(slug)
  var addi 
  var addk 
  // console.log(userInfo.id)
  // console.log(slug)
  //  -----Overlay-----
  const toggleModal = () => {
    setisModalvisible(!isModalvisible);
  };
  
 
  //  -------Dialog-----
  const showDialog = (i, k) => {
    // console.log('values',i,k)
    ConstantClass.Email = i;
    ConstantClass.Password = k;
    // console.log('valuesitems',addi,addk)
    setVisible(!visible);
  };
  const addtocart1 = () => {
    // console.log('afterclick',addi,addk)

    addtocart(ConstantClass.Email,ConstantClass.Password,'add',1)
    // console.log()
    setVisible(!visible);

  }


  const handleDelete = () => {
    setVisible(false);
  };

  const handleLikeAnimation = () => {
    const newValue = hasLiked ? 0 : 1;

    Animated.timing(progress, {
      toValue: newValue,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setHasLiked(!hasLiked);
  };
          // ---------share button ----------- // 
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
        `${BASEURL}/public/api/get-restaurant-info-with-favourite/fresh-tasty-meat-shop-r9mt8x6uxw0ai8h`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

      const gethotels = () =>{
            
        fetch(`${BASEURL}/public/api/get-restaurant-info-by-id/${id}`,{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
        },
          body : JSON.stringify ({
            "token" : token
          })
        })
        .then((response) => response.json())
        .then((json) => setitemdata(json))
        .then((itemdata) => JSON.stringify(itemdata))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
          // console.log(itemdata)
  
     
      }
      useEffect(() => {
        
       gethotels()
      }, []);

      const getfavhotels = () => {
        fetch(`${BASEURL}/public/api/get-restaurant-info-with-favourite/${slug}`,{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
        },
          body : JSON.stringify ({
            "token" : token
          })
        })
        .then((response) => response.json())
        .then((json) => setitemdata(json))
        .then((itemdata) => JSON.stringify(itemdata))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
          // console.log(itemdata)
      }

      useEffect(() => {
        getfavhotels()
       }, []);

              // ----------Filters--------- //

        const Filterbuttons = () =>{
             
                fetch(`${BASEURL}/public/api/get-menu-categories`,{
                  method:'POST',
                  headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify()
                })
                  .then((response) =>(response.json()))
                  .then((json) =>  setMenuitems(json))
                  .catch((error) => console.error(error))
                  .finally(() => setLoading(false));
                 
            }
          useEffect(()=>{
            Filterbuttons()
           },[])   
           const token = userInfo.auth_token 
             
           const Favouritesbutton = () =>{
            // console.log(token,id)    
            fetch(`${BASEURL}/public/api/toggle-favorite`,{
              method:'POST',
              headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              token:token,
              id:id
            })
            })
              .then((response) =>(response.json()))
              .then((json) =>  {setfav(json),getfavhotels()})
              .catch((error) => console.error(error))
              .finally(() => setLoading(false));
              //  console.log('fav',fav.is_favorited)
        }
    
    
      
      // console.log(index);

                   // ------------Menu Items API-------------- //


 


  const fetchData =  (id) => {
    // console.log('original',id)
    if (id == undefined ){
      id = 0
    }
   

    fetch(`${BASEURL}/public/api/get-restaurant-items/${slug}?&category_id=${id}`,
    {
      method: 'POST', 
           
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
    },
    
    })

    .then((response) =>response.json())
    .then((json) => {setData(json);cartlist()})
    .then((Data) => JSON.stringify(Data))
    .catch((error) => console.error(error))
    .finally(() => setLoading(false));
    // console.log(Data?.items?.Chicken[0]?.addon_categories?.length)
  }

  // const varibaleee = Data?.items
  // console.log(Object.values(varibaleee[0]?.addon_categories))

  
    const itemcount = ( Data.items != null &&  Data.items != undefined) ? (
      Object.values(Data.items).length
     ):(
       <Spinner visible={isLoading} />
     )
    //  console.log('items count',itemcount)

      useEffect(() => {
        fetchData()
      }, []);

              // ---------------cartlist-------- //

         
          const cartlist = () => {
            const user_id = userInfo.id
            fetch(`${BASEURL}/public/api/cart-list`,{
              method:'POST',
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                "user_id":user_id
              }),
            })
            .then((response) =>(response.json()))
            .then((result) => {
              // console.log(result.cart_list)
              setcart_list(result.cart_list);
             
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
          
      }

        
          // -------------ADD TO CART API-------------  //
          var check=0;
         const addtocart = (i, k, action,forceadd=0) => {
          
          //  console.log(check)
        // console.log('item',i)
         const item_id = i
         const restaurant_id = k

         const user_id = userInfo.id
       
          if(check==0){
          check=1
         if ( forceadd == 0 && cart_list.length > 0 && restaurant_id != cart_list[0].restaurant_id )
         return showDialog(i, k)
         
         let quantity = getcartqty(i)
       
         if (action == 'add')
           
            quantity = quantity + 1
            else
            quantity = quantity - 1
            if ( quantity  == 0 )
             removefromcart(i)
             else 
             

          fetch(`${BASEURL}/public/api/add-cart` ,
          {
            method: 'POST', 
                 
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    "item_id":item_id,
                    "restaurant_id": restaurant_id,
                    "quantity":quantity,
                    "user_id":user_id,
                    "force_add": forceadd
                  }),
                })
              
                .then((response) =>(response.json()))
                .then((result) => {
                  // console.log(result)
                  setcart_list(result.cart_list);
                  // console.log(cart_list.restaurant_id)
                  check=0
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
              }
             }; 
             const size = ( cart_list != null &&  cart_list != undefined) ? (
               Object.values(cart_list).length
              ):(
                <Spinner visible={isLoading} />
              )
              // console.log(size)
             
            //  console.log(size); 

            // -----------check cart_list--------- //
            
         const checkcartexist = (id) =>{
      
          // console.log(cart_list)
          const found = cart_list.find(el => el.item_id === id); 
          // console.log(id)
          if (!found)  
          return true
          else 
          return false
           }
          //  const addon = cart_list[0]?.item_detail?.addon_categories[0]?.addons[0].id
          //  console.log('addonid',addon)
          //  const checkaddonexist = (addid) =>{
            
          //   // console.log(cart_list)
          //   const found = cart_list.item_detail.addon_categories.addons.find(el => el.id === addid); 
          //   // console.log(addid)
          //   if (!found)  
          //   return true
          //   else 
          //   return false
          //    }
          // ----------quantity---------//

           const getcartqty = (id) =>{
            const found = cart_list.find(el => el.item_id === id); 
            //  console.log(found)
             if (found != undefined )  
             return found.quantity
             else 
             return 0 
           }

          //  ----------total amount------//
           
           const gettotalamount = () =>{
             var totalamount = 0
               var i =0
                 for (i=0;i<cart_list.length; i++)
                 {
                 totalamount = totalamount+cart_list[i].total_price;
                 }
                 return totalamount;
                 }
                //  --------REMOVE FROM CART API---------  //

          const removefromcart = async (i) => {
            const item_id = i
            const user_id = userInfo.id
          
             await fetch(`${BASEURL}/public/api/remove-cart`,{
              method:'POST',
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                "item_id":item_id,
                "user_id":user_id
              }),
              
            })
            .then((response) =>(response.json()))
            .then((result) => {
                  // console.log(result.cart_list)
                  setcart_list(result.cart_list);
                  check=0
                })
                .catch((error) => console.error(error))
                .finally(() => setLoading(false));
          } 

          const itemfilterexist = (ids) =>{
            // console.log(ids)
            const found = Data.find(el => el.item.id === ids); 
            if (!found)  
            return true
            else 
            return false  
             }
          // -------items render --------- //


          const shadowOpt = {
            width: 76,
            height: 30,
            color: "#000",
            border: 2,
            radius: 3,
            opacity: 0.1,
            x: 0,
            y: -10,
            style: {left:10, marginVertical: 10, }
          };

//   const addons = (value)=>{
//     var a = 0
//     const views = [];
//      for (i=0;i<value[i]?.addon_categories[i]?.addons[a]?.length;i++){
//       views.push(
//        <Text>  {value[i]?.addon_categories[i]?.addons[i]?.name}</Text>
//         )
//      }  return views
  
     
//   }     
// console.log(addons)
// console.log(addselected)
const _renderItem = () =>{
    

     return(   
       <View>
         
         {
           (Data.items != null && Data.items != undefined) ? (      
            Object.entries(Data.items).map(([key,value])=> {
              const scrollHandler = () => {
                // console.log(dataSourceCords.length, scrollToIndex);
                if (dataSourceCords.length > scrollToIndex) {
                  ref.scrollTo({
                    x: 0,
                    y: dataSourceCords[scrollToIndex - 1],
                    animated: true,
                  });
                } else {
                  // alert('Out of Max Index');
                }
              };
              ConstantClass.Name = key;
              // console.log(ConstantClass.Name)
               const arr = [];
               for( let i=0; i<value.length;i++)
               {
                 arr.push(      
                  <View>  
                  <View style={{ flexDirection:'row',left:10,borderBottomColor:'grey',}}>
                <ImageBackground
                style={{ width: 84, height: 78,margin:10, borderRadius: 10}}
                source={{uri: `${BASEURL}/${value[i].image}`}}>
                  {checkcartexist(value[i].id) ? (
                    <Text></Text>
                  ):(<Text style={styles.qtyimg}>{getcartqty(value[i].id)}</Text>)}
                </ImageBackground>
                <View style={{  marginLeft:10}}>
                <Text style={{  marginTop: 5,fontWeight:'500',color:'black' }} >{value[i].name}</Text>
               
                <View style={{flexDirection:'row'}}>
                <Image
                 style={{ width:10, height: 10,top:10}}
                 source={require('../../../assets/rupee.png')}></Image>
                <Text style={{  marginTop: 5}}> {value[i].price}</Text>
                </View>
                {value[i].is_popular != 0 ?(<Text style={{color:'green',fontSize:14}}>Popular</Text>):(<Text></Text>)}
               
                <View style={styles.stepper}>
               
                <BoxShadow setting={shadowOpt}>
                    {checkcartexist(value[i].id)  ? (
               <TouchableOpacity onPress={()=> addtocart(value[i].id,value[i].restaurant_id,'add')}
                 style={{
                   width: 76,
                   height: 32,
                   backgroundColor: "#fff",
                   borderRadius: 4,
                   marginVertical: 5,
                   bottom:16,
                   overflow: "hidden",
                   borderWidth:0.3,
                   borderColor:'#c4c4c4'
                 }}
               >
                 <Text style={{textAlign:'center',top:5,fontWeight:'bold',color:'green'}}>ADD</Text>
               </TouchableOpacity>
                    ):( 
                      <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>addtocart(value[i].id,value[i].restaurant_id,'sub')}
                    style={{
                      width: 38,
                      height: 28,
                      backgroundColor: "#fff",
                      marginVertical: 5,
                      bottom:16,
                      overflow: "hidden",
                      borderColor:'#c4c4c4',
                      borderLeftWidth:0.3,
                      borderTopWidth:0.2,
                      borderTopLeftRadius:4,
                      borderBottomLeftRadius:4,
                      borderTopColor:'#c4c4c4'
                    }}
                  >
                    <Text style={{textAlign:'center',top:3,fontWeight:'bold',color:'green'}}>-</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>addtocart(value[i].id,value[i].restaurant_id,'add')}
                    style={{
                      width: 38,
                      height: 28,
                      backgroundColor: "#fff",
                     //  borderRadius: 4,
                     borderTopRightRadius:4,
                     borderBottomRightRadius:4,
                      marginVertical: 5,
                      bottom:16,
                      overflow: "hidden",
                     //  borderWidth:0.3,
                      borderColor:'#c4c4c4',
                     borderLeftWidth:0.3,
                     borderTopWidth:0.2,
                     borderTopColor:'#c4c4c4'
                    }}
                  >
                    <Text style={{textAlign:'center',top:3,fontWeight:'bold',color:'green'}}>+</Text>
                  </TouchableOpacity>
                      </View>
                  
                  
                  )}
             </BoxShadow>
              <View style={styles.container}>
             
             <Dialog.Container visible={visible}>
               <Dialog.Description>Are you sure clear cart and update new items</Dialog.Description>
               
               <Dialog.Button color={'orange'} label="confirm" onPress=
                 {()=>addtocart1()} />
               <Dialog.Button  color={'orange'} label="Cancel" onPress={handleDelete} />
             </Dialog.Container>
            </View> 
            {/* {value[i]?.addon_categories != '' ?
            ( <Text style={styles.customizable}>customizable</Text> ):(<Text style={{height:0}}></Text>)} */}

<BottomModal
           visible={modalVisible}
           onTouchOutside={() => setModalVisible(!modalVisible)}
          height={0.5}
          width={1}
          footer={<TouchableOpacity onPress={()=>{addtocart(value[i].id,value[i].restaurant_id,'add'),setModalVisible(!modalVisible)}}>
            <Text style={{backgroundColor:'#60b246',textAlign:'center',
        paddingBottom:14,paddingTop:14,fontSize:20,color:'white',fontFamily:'FontAwesome5_Solid'}}>continue</Text>
          </TouchableOpacity>
           }
          modalTitle={
            <ModalTitle
              title="Customizations"
              hasTitleBar
            />
          }
        >
          <ModalContent
            style={{
              flex: 1,
              backgroundColor: 'fff',
            }}
          ><View style={{top:20}}>
            <Text style={{color:'black',borderWidth:0.3,width:'20%',padding:6,fontWeight:'bold'}}> {value[i]?.addon_categories[i]?.name} </Text>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',top:20}}>
             <Text style={{color:'black'}}> {value[i]?.addon_categories[i]?.addons[i]?.name} </Text>
             <Text> ₹ {value[i]?.addon_categories[i]?.addons[i]?.price} </Text>
             </View>
          <View>
          <TouchableOpacity style={{flexDirection:'row',top:24}} onPress={()=>setaddselected(value[i]?.addon_categories[i]?.addons[i]?.name)}>
            {addselected ?<Fontisto name='radio-btn-active' size={20} color='#60b246'/>:<Fontisto name='radio-btn-passive' size={20} color='#60b246'/> }
             
             </TouchableOpacity>
             </View>
            </View>
  
          </View>
      
        
          </ModalContent>
        </BottomModal>
        <Modal isVisible={isModalvisible} scrollHorizontal={true}
         backdropOpacity={10} backdropColor='none' coverScreen={true} onBackdropPress={toggleModal}>
        <View style={{ flex: 1,justifyContent:'center',alignItems:'center' }}>
          <View style={{width:'80%', backgroundColor:'white',height:200,top:100,borderRadius:10, shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.10,
    shadowRadius: 2,
    elevation: 4}}>
            
            {Object.entries(Data.items).map(([key,value])=> {
              return (
                <ScrollView>
                  <View>
                    <TouchableOpacity onPress={()=>{scrollHandler(),toggleModal()}}>
       <Text style={{ marginTop: 20 ,borderBottomWidth:1,left:20,width:'80%'}}>{key}</Text>

                    </TouchableOpacity>
                
                </View>
                </ScrollView>
                
            );
          })}
                         
            
          </View>
         

       
        </View>
      </Modal>
     
                </View>
                
                </View>
                  </View>
                
                </View>
                 
                 );
            
               }
             return (
           
              <View  key={key}
              style={styles.item}
              onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                
               
                // console.log();
                // console.log('height:', layout.height);
                // console.log('width:', layout.width);
                // console.log('x:', layout.x);
                // console.log('y:', layout.y);
              }}>  
              <TouchableOpacity >
              <Text style={{ 
                marginTop: 5 ,
                fontWeight:'bold',
                fontSize:16,color:'black',
                backgroundColor:'white',
                left:10}}>{key}</Text>
                </TouchableOpacity>
                {arr}
                
               
            </View>
            );
            })
                    ):(
               <Text>loading</Text>
            
                    )
            
         }
       </View>
     )
     }

// console.log('something',addselected)
   var i = []
  return (
    
    <View style={{ flex: 1, }}>
      
     
  {/* <View style={{backgroundColor:'white',flexDirection:'row',height:70,justifyContent:'space-around',alignItems:'center'}}>
      <Icon name="arrow-back-ios" size={24} onPress={navigation.goBack} style={{left:10}} />
      <Text style={{
        fontSize:18,
        fontWeight:'500',
        // left:40,
        // top:25,
        color:'black'
      }}>{name}</Text>
      <TouchableOpacity onPress={onShare}>
      <Ionicons name='share-social-outline' size={20} color='black' />
            </TouchableOpacity>
      
      </View> */}
      <View style={{width:'100%',height:70,backgroundColor:'white',flexDirection:'row'}}>
         <View style={{width:'86%',height:70,flexDirection:'row',alignItems:'center'}}>
         <Icon name="arrow-back-ios" size={24} onPress={navigation.goBack} style={{left:20}} />
         <Text style={{
        fontSize:18,
        fontWeight:'500',
        left:40,
        // top:25,
        color:'black'
      }}>{name}</Text>
         </View>
         <View style={{width:'14%',height:70,justifyContent:'center',alignItems:'center'}}>
         <TouchableOpacity onPress={onShare}>
      <Ionicons name='share-social-outline' size={20} color='black' />
            </TouchableOpacity>
         </View>
      </View>
      
    <View style={{ flex: 1,flexBasis:'auto', backgroundColor: 'white',}}>
      <ScrollView style={{marginBottom:10}}>
      {isLoading ? (
        <View style={{backgroundColor:'white'}}>
        <SkeletonPlaceholder>
              <View style={{ flexDirection: "row", alignItems: "center",margin:10 }}>
           <View style={{ width: 60, height: 60, borderRadius: 10 }} />
           <View style={{ marginLeft: 20 }}>
             <View style={{ width: 250, height: 20, borderRadius: 4 }} />
             <View
               style={{ marginTop: 6, width: 200, height: 20, borderRadius: 4 }}
             />
           </View>
         </View>
         <View
             style={{ left:10, marginTop: 6, width: 330, height: 50, borderRadius: 4 }}
           />
         <View style={{ flexDirection: "row", alignItems: "center",margin:10  }}>
           <View style={{ width: 60, height: 60, borderRadius: 10 }} />
           <View style={{ marginLeft: 20 }}>
             <View style={{ width: 250, height: 20, borderRadius: 4 }} />
             <View
               style={{ marginTop: 6, width: 200, height: 20, borderRadius: 4 }}
             />
           </View>
         </View>
         <View style={{ flexDirection: "row", alignItems: "center",margin:10  }}>
           <View style={{ width: 60, height: 60, borderRadius: 10 }} />
           <View style={{ marginLeft: 20 }}>
             <View style={{ width: 250, height: 20, borderRadius: 4 }} />
             <View
               style={{ marginTop: 6, width: 200, height: 20, borderRadius: 4 }}
             />
           </View>
         </View>
         <View style={{ flexDirection: "row", alignItems: "center",margin:10  }}>
           <View style={{ width: 60, height: 60, borderRadius: 10 }} />
           <View style={{ marginLeft: 20 }}>
             <View style={{ width: 250, height: 20, borderRadius: 4 }} />
             <View
               style={{ marginTop: 6, width: 200, height: 20, borderRadius: 4 }}
             />
           </View>
         </View>
         <View style={{ flexDirection: "row", alignItems: "center",margin:10  }}>
           <View style={{ width: 60, height: 60, borderRadius: 10 }} />
           <View style={{ marginLeft: 20 }}>
             <View style={{ width: 250, height: 20, borderRadius: 4 }} />
             <View
               style={{ marginTop: 6, width: 200, height: 20, borderRadius: 4 }}
             />
           </View>
         </View>
        
        </SkeletonPlaceholder>
        </View>
      ):(
        <View style={{backgroundColor:'white'}}>
          {itemdata.is_active == 0  && <View style={{width:'100%',height:4000,backgroundColor:'black',position:'absolute',zIndex:1,flex:1,opacity:0.3}}></View>}
      
        <View>
        <ScrollView  style={{backgroundColor:'white'}}
         ref={(ref) => {
            setRef(ref);
          }}>
                        {/* <-------HOTEL DETAILS SECTION ------------> */}
         <View>   
      <View style={styles.hotel} >
        
        <View>
          
      <Image
        style={{ width: 93, height: 78,top:24,left:20,borderRadius:14}}
        source={{uri: `${BASEURL}/${itemdata.image}`}}></Image>
      
      </View>

      <View style={styles.content}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:16,fontWeight:'bold'}}>{itemdata.name}</Text>
        
        <View>
          {userInfo.id ? (
             <TouchableOpacity onPress={()=>Favouritesbutton()}>
             <MaterialIcons name={itemdata.is_favorited == false?'favorite-border' : 'favorite'} size={22} color='red'/>
             </TouchableOpacity>
          ):(<Text></Text>)}
         
        
        </View>
        
        </View>
        {itemdata.is_active == 0 ? <Text style={{color:'red'}}>Not Accepting orders</Text>: <Text style={{height:0}}></Text>}
        
      <Text>{itemdata.operation_hrs}</Text>
      <View style={styles.botcont}>
      <Icon size={15}
      name ='star' color={'orange'} />
        <View style={{
          borderRightWidth:0.5,
          width:50,bottom:2,
          borderColor:'#5757'}}>
            <Text> {itemdata.rating}</Text></View>
        <View style={{
          marginLeft:30,
          flexDirection:'row',
          borderRightWidth:0.5,
          width:50,
          borderColor:'#5757'}}>
        <Image
     style={{ width:12, height: 12,top:5,right:6}}
     source={require('../../../assets/time.png')}></Image>
          <Text >{itemdata.delivery_time}</Text>
          </View>
        <View style={{marginLeft:30,flexDirection:'row'}}>
        <AntDesign style={{right:12,top:3}} name='wallet' size={14}></AntDesign>
     <Image
     style={{ width:10, height: 10,top:5,right:8}}
     source={require('../../../assets/rupee.png')}></Image>
          <Text>{itemdata.price_range}</Text>
          </View>
      </View>
      
      </View>
      
        </View>
         <View style={{height:120}}>
         <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={menuitem}
            keyExtractor={( item , index) => item.id }
            renderItem={({ item }) =>(
             <View style={{height:40}}>
                {itemfilterexist?(
              <TouchableOpacity onPress={()=>{fetchData(item.id),setselected(item.id)}}>
                            <View style={{margin:5,top:10}}>
                             <Image style={{width:60,height:60,borderRadius:50,left:16,bottom:6}} source={{uri:`${BASEURL}/${item.image}`}}/> 
        <Text style={{  
            width:86,
            textAlign:'center',
            fontSize:14,
            backgroundColor:'black',
            borderRadius:18,
            height:26,
            top:10,
            textAlign:'center',
            paddingTop:3,
            color:'white',
            backgroundColor:selected === item.id ? 'red':'black',
            bottom:4 
             }}>{item.name}</Text>
            </View>
            </TouchableOpacity>
             ):(
             <Text>Currently Not Avaliable</Text>
             )  }
             </View>
              
      )}
          /> 
         </View>
            
            {/* ------Recommended Items----------- */}
          {Data.recommended == ''?
          (<Text style={{height:0}}></Text>):(
            <View >
              <Text style={{backgroundColor:'white',fontWeight:'600',fontSize:16,color:'black',top:10,height:30,paddingTop:8,paddingLeft:10}}>Recommended</Text>
            <ScrollView style={{width:'100%',backgroundColor:'white',height:240,top:10}}
            horizontal={true} 
            contentContainerStyle={{alignItems:'center'}}
            showsHorizontalScrollIndicator={false}>
         
           <View style={{flexDirection:'row'}}>
          {(Data.recommended == null && Data.recommended == undefined) ? (<Text>Loading</Text> ):( 
           Object.entries(Data.recommended).map(([key,value])=> {
                return (
                  <View style={{paddingTop:6,margin:10,height:220,backgroundColor:'white',width:170,alignItems:'center',justifyContent:'center',borderRadius:6,  shadowColor: "#000",
                  shadowOffset: {
                    width: 10,
                    height: 1
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 4}}>
                      <ImageBackground
                  style={{ width: 100, height: 94,borderRadius: 10}}
                  source={{uri: `${BASEURL}/${value.image}`}}>
                    {checkcartexist(value.id) ? (
                      <Text></Text>
                    ):(<Text style={styles.qtyimg}>{getcartqty(value.id)}</Text>)}
                  </ImageBackground>
                    <Text style={{fontWeight:'500',color:'black',top:4}}><MaterialCommunityIcons name='checkbox-intermediate'size={10} color='red'/> {value.name}</Text>
                    <Text style={{top:6}}> ₹ {value.price}</Text>
                    <View style={styles.recstepper}>
                 
                 <BoxShadow setting={shadowOpt}>
                     {checkcartexist(value.id)  ? (
                <TouchableOpacity onPress={()=> addtocart(value.id,value.restaurant_id,'add')}
                  style={{
                    width: 76,
                    height: 32,
                    backgroundColor: "#fff",
                    borderRadius: 4,
                    marginVertical: 5,
                    bottom:16,
                    overflow: "hidden",
                    borderWidth:0.3,
                    borderColor:'#c4c4c4'
                  }}
                >
                  <Text style={{textAlign:'center',top:5,fontWeight:'bold',color:'green'}}>ADD</Text>
                </TouchableOpacity>
                     ):( 
                       <View style={{flexDirection:'row'}}>
                         <TouchableOpacity onPress={()=>addtocart(value.id,value.restaurant_id,'sub')}
                     style={{
                       width: 38,
                       height: 28,
                       backgroundColor: "#fff",
                       marginVertical: 5,
                       bottom:16,
                       overflow: "hidden",
                       borderColor:'#c4c4c4',
                       borderLeftWidth:0.3,
                       borderTopWidth:0.2,
                       borderTopLeftRadius:4,
                       borderBottomLeftRadius:4,
                       borderTopColor:'#c4c4c4'
                     }}
                   >
                     <Text style={{textAlign:'center',top:3,fontWeight:'bold',color:'green'}}>-</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>addtocart(value.id,value.restaurant_id,'add')}
                     style={{
                       width: 38,
                       height: 28,
                       backgroundColor: "#fff",
                      //  borderRadius: 4,
                      borderTopRightRadius:4,
                      borderBottomRightRadius:4,
                       marginVertical: 5,
                       bottom:16,
                       overflow: "hidden",
                      //  borderWidth:0.3,
                       borderColor:'#c4c4c4',
                      borderLeftWidth:0.3,
                      borderTopWidth:0.2,
                      borderTopColor:'#c4c4c4'
                     }}
                   >
                     <Text style={{textAlign:'center',top:3,fontWeight:'bold',color:'green'}}>+</Text>
                   </TouchableOpacity>
                       </View>
                   
                   
                   )}
              </BoxShadow>
               <View style={styles.container}>
              
              <Dialog.Container visible={visible}>
                <Dialog.Description>Are you sure clear cart and update new items</Dialog.Description>
                
                <Dialog.Button color={'orange'} label="confirm" onPress=
                  {()=>addtocart1()} />
                <Dialog.Button  color={'orange'} label="Cancel" onPress={handleDelete} />
              </Dialog.Container>
             </View> 
             {/* {value?.addon_categories != '' ?
             ( <Text style={styles.customizable}>customizable</Text> ):(<Text style={{height:0}}></Text>)} */}
  
  <BottomModal
            visible={modalVisible}
            onTouchOutside={() => setModalVisible(!modalVisible)}
           height={0.5}
           width={1}
           footer={<TouchableOpacity onPress={()=>{addtocart(value.id,value.restaurant_id,'add'),setModalVisible(!modalVisible)}}>
             <Text style={{backgroundColor:'#60b246',textAlign:'center',
         paddingBottom:14,paddingTop:14,fontSize:20,color:'white',fontFamily:'FontAwesome5_Solid'}}>continue</Text>
           </TouchableOpacity>
            }
           modalTitle={
             <ModalTitle
               title="Customizations"
               hasTitleBar
             />
           }
         >
           <ModalContent
             style={{
               flex: 1,
               backgroundColor: 'fff',
             }}
           ><View style={{top:20}}>
             <Text style={{color:'black',borderWidth:0.3,width:'20%',padding:6,fontWeight:'bold'}}> {value?.addon_categories[i]?.name} </Text>
             <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <View style={{flexDirection:'row',top:20}}>
              <Text style={{color:'black'}}> {value?.addon_categories[i]?.addons[i]?.name} </Text>
              <Text> ₹ {value?.addon_categories?.addons?.price} </Text>
              </View>
           <View>
           <TouchableOpacity style={{flexDirection:'row',top:24}} onPress={()=>setaddselected(value?.addon_categories[i]?.addons[i]?.name)}>
             {addselected ?<Fontisto name='radio-btn-active' size={20} color='#60b246'/>:<Fontisto name='radio-btn-passive' size={20} color='#60b246'/> }
              
              </TouchableOpacity>
              </View>
             </View>
   
           </View>
       
         
           </ModalContent>
         </BottomModal>
                 </View>
                  </View>
              );
            }))}
           </View>
           </ScrollView>
           </View>
          )}
         
        <View style={{top:20}}>
          {itemcount == 0 ? (
        <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text style={{fontFamily:'FontAwesome5_Solid',color:'black'}}>No Products Found</Text>
          <Text style={{top:10}}>Try with another shop</Text>
        </View>
          ) : ( 
            <View>
             <Text style={{backgroundColor:'white',fontWeight:'600',fontSize:16,color:'black',bottom:4, height:30,paddingLeft:10}}>Items</Text>
              <Text style={{bottom:10}}>{_renderItem()}</Text> 
              </View>
              ) }    
        </View>
        </View>  
      </ScrollView>
      
      </View>
      
      </View>
      
      )}
      </ScrollView>
    
    </View>
   
    {/* fill space at the bottom*/}
    <View style={{ justifyContent: 'flex-end' }} />
    { size == 0?
      (
       <Text style={{height:0}}></Text>
      ):(
        
          <View style={[styles.bottomView,styles.elevation]}>
          <TouchableOpacity  
          onPress={() =>navigation.navigate('Cart',
          {restid : id}
          )}>
          <View style={{flexDirection:'row',bottom:14}}>
       <Text style={styles.totalitems}>{size} items</Text>
       <Text style={styles.totalamt}> <Image
          style={{ width:10, height: 10,top:10,right:7}}
          source={require('../../../assets/rupee.png')}></Image>  {gettotalamount()} </Text>
       <Text style={styles.cart}>VIEW CART  <Feather name='shopping-cart' size={15}/></Text>
          </View>
          </TouchableOpacity>
        </View>
        
      )}
         {/* <TouchableOpacity  onPress={() => setisModalvisible(true)} activeOpacity={0.5}  style={[styles.TouchableOpacityStyle,{bottom:size == 0 ? 20 : 60}]} >

        
       <Text style={styles.FloatingButtonStyle}><Entypo name='list' size={14} color='white' /> MENU</Text>

</TouchableOpacity> */}
  </View>
      
  );
};
const styles = StyleSheet.create({
  hotel:{
      width:"100%",
      backgroundColor:'white',
      flexDirection:'row',
      height:130,
      
  },
  content:{
    top:24,
    left:26
  },
  botcont:{
    flexDirection:'row',
    top:10,
    justifyContent:'center',
    left:10
  },
  search:{
  width:'90%',
  height:42,
  backgroundColor:'white',
  left:20,
  borderRadius:10,
  borderWidth:1,
  borderColor:'#d4d4d4',
  top:10
},
bottomView: {
  width: '100%',
  height: 46,
  backgroundColor: 'orange',
  justifyContent: 'center',
  alignItems: 'center',
  // position: 'absolute',
  bottom: 0,
  // flex:1,
  // borderRadius:10,
  // left:10,

},
textStyle: {
  color: '#fff',
  fontSize: 18,
},
qtyimg:{
  backgroundColor:'orange',
  width:30,
  borderBottomRightRadius:10,
  fontSize:14,
  textAlign:'center',
  borderWidth:1,
  borderColor:'white',
  color:'white',
  fontFamily:'FontAwesome5_Solid',
},
totalitems:{
   width:'24%',
   top:14,
   fontSize:16,
   left:22,
   fontWeight:'bold',
   borderRightWidth: 0.3,
   color:'white'
},
totalamt:{
  width:'46%',
  top:14,
  fontSize:16,
  left:40,
  fontWeight:'bold',
  color:'white'
},
cart:{
  width:'30%',
  top:14,
  fontSize:16,
  fontWeight:'bold',
  color:'white'
},
  recstepper:{
    top:12,
    elevation:10,
    alignSelf:'center',
    right:8
  },
  stepper:{
    left:155,
    bottom:34,
  },
  text:{
    color:'white',
    width:80,
    textAlign:'center',
    fontSize:10,
    backgroundColor:'black',
    borderRadius:10,
  },
  opacity: {
    width: 200,
    height: 200,
  },
  customizable:{
    color:'orange',
    fontSize:12,
    bottom:20,
    left:12
  },
  TouchableOpacityStyle:{
    position: 'absolute',
    width: 50,
    height: 50,
    // alignItems: 'center',
    justifyContent: 'center',
    right: 190,
    borderRadius: 10,
  },

  FloatingButtonStyle: {
    width: 80,
    height: 40,
    backgroundColor:'#5d8ed5',
    borderRadius: 20,
    textAlign:'center',
    paddingTop:10,
    color:'white',
    fontWeight:'bold'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
 
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
