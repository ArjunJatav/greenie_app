/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import "react-native-gesture-handler";

 import React, { useState, useEffect } from "react";
 import { View, Title, Image, Platform } from "react-native";
 import { EventRegister } from "react-native-event-listeners";
 import { createStackNavigator } from "@react-navigation/stack";
 import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
 import AsyncStorage from "@react-native-community/async-storage";
 
 import SplashScreen from "react-native-splash-screen";
 import { SafeAreaProvider } from "react-native-safe-area-context";
 import { navigationRef } from "./src/components/TabControllers/RootNavigation";
 
 
 import { NavigationContainer } from "@react-navigation/native";
 
 //TabBar Tab Icons Unselected
 import homeIcon from "./src/assets/images/TabBar_icons/Unselected/HomeIcon.png";
 import plantIcon from "./src/assets/images/TabBar_icons/Unselected/PlantIcon.png";
 import friendIcon from "./src/assets/images/TabBar_icons/Unselected/FriendsIcon.png";
 import settingIcon from "./src/assets/images/TabBar_icons/Unselected/SettingsIcon.png";
 import profileIcon from "./src/assets/images/TabBar_icons/Unselected/ProfileIcon.png";
 
 //TabBar Tab Icons Selected
 import homeIconActive from "./src/assets/images/TabBar_icons/Selected/HomeIconActive.png";
 import plantIconActive from "./src/assets/images/TabBar_icons/Selected/PlantIconActive.png";
 import friendIconActive from "./src/assets/images/TabBar_icons/Selected/FriendsIconActive.png";
 import settingIconActive from "./src/assets/images/TabBar_icons/Selected/SettingsIconAcive.png";
 import profileIconActive from "./src/assets/images/TabBar_icons/Selected/ProfileIconActive.png";
 
 //Tab Component files
 import HomeScreen from "./src/components/TabControllers/HomeScreen";
 import PlantsScreen from "./src/components/TabControllers/PlantsScreen";
 import FriendsScreen from "./src/components/TabControllers/FriendsScreen";
 import SettingsScreen from "./src/components/TabControllers/SettingsScreen";
 import ProfileScreen from "./src/components/TabControllers/ProfileScreen";
 
 // Screen Component files
 import MyProfileScreen from "./src/components/TabControllers/MyProfileScreen";
 import ChangePasswordScreen from "./src/components/TabControllers/ChangePasswordScreen";
 import DevicesScreen from "./src/components/TabControllers/DevicesScreen";
 import TermsCondition from "./src/components/TabControllers/TermsCondition";
 import PlantsDetailScreen from "./src/components/TabControllers/PlantsDetailScreen";
 import EditProfile from "./src/components/TabControllers/EditProfile";
 import StateShareScreen from "./src/components/TabControllers/StateShareScreen";
 import SearchScreen from "./src/components/TabControllers/SearchScreen";
 import AddDeviceQRScanner from "./src/components/TabControllers/AddDeviceQRScanner";
 import EditDeviceScreen from "./src/components/TabControllers/EditDeviceScreen";
 import AddDeviceManuallyScreen from "./src/components/TabControllers/AddDeviceManuallyScreen";
 import AddNewPlant from "./src/components/TabControllers/AddNewPlant";
 import EditPlant from "./src/components/TabControllers/EditPlant";
 import UpdateEmail from "./src/components/TabControllers/UpdateEmail"
 import VerifyEmail from "./src/components/TabControllers/VerifyEmail"
 import ThankyouScreen from "./src/components/TabControllers/ThankyouScreen";
 
 import Login from "./src/components/InitialController/Login";
 import Register from "./src/components/InitialController/Register";
 import ForgotPassword from "./src/components/InitialController/ForgotPassword";
 import OTP from "./src/components/InitialController/otp";
 import resetpassword from "./src/components/InitialController/resetpassword";
 import mybadges from "./src/components/TabControllers/mybadges";
 import ConnectDevice from "./src/components/TabControllers/ConnectDevice";
 import { saveData, _retrieveData, AUTH_TOKEN } from "./src/helpers/helper";
 import SerachFriend from "./src/components/TabControllers/SearchFriend";
 import FriendPlantList from "./src/components/TabControllers/FriendPlantList";
 import ContactScreen from "./src/components/TabControllers/ContactScreen";
 import NotificationScreen from "./src/components/TabControllers/Notification";
 import firebase from "@react-native-firebase/app";
 import messaging from "@react-native-firebase/messaging";
 import notifee from "@notifee/react-native";
 const Stack = createStackNavigator();
 const Tab = createBottomTabNavigator();
 
 import PushNotification, { Importance } from "react-native-push-notification";
 
 export default function App({navigation}) {
   const [Auth_Token, setAuth_Token] = useState("");
   const [IsLoading, setIsLoading] = useState(true);
   const [Userid, setUserid] = useState("");
 
   useEffect(async () => {
     requestUserPermission();
 
     messageListener();
 
     try {
       token = await AsyncStorage.getItem(AUTH_TOKEN);
       var userid = await AsyncStorage.getItem("userid");
 
       if (token !== null) {
         setAuth_Token(token);
         setUserid(userid);
         setIsLoading(false);
       } else {
         setIsLoading(false);
       }
     } catch (e) {
       console.log("Failed to fetch the data from storage");
     }
   }, []);
 
   const checkStoragePermission = async () => {
     const granted = await PermissionsAndroid.request(
       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
     );
     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
     } else {
       requestStoragePermission();
     }
   };
   const getFcmToken = async () => {
     let fcmToken = await AsyncStorage.getItem("fcmToken");
 
     if (!fcmToken) {
       fcmToken = await messaging().getToken();
       if (fcmToken) {
         await AsyncStorage.setItem("fcmToken", fcmToken);
       }
     }
   };
 
   const requestStoragePermission = async () => {
     try {
       await checkStoragePermission();
     } catch (error) {
       // User has rejected permissions
     }
   };
 
   const requestUserPermission = async () => {
     const authorizationStatus = await messaging().requestPermission();
     if (authorizationStatus) {
       getFcmToken();
     }
   };
 
   const notificationPressActionEventListener = async ({ type, detail }) => {
     try {
 
      console.log("Clcikeddddd")
       const { navigate } = navigationRef.current;
       setTimeout(() => {
         navigationRef.current.navigate("NotificationScreen",{
           id: Userid,
           title: "Notifications",
         });   
       }, 4000);
 
     } catch (error) {
       console.log("Error in navigation", error);
     }
     return null;
   };
 
   const messageListener = async () => {
     console.log('>>>>>>>>>>>>>>>>>>>>>1')
     messaging().setBackgroundMessageHandler(async remoteMessage => {
       const { title, body } = remoteMessage.notification;
 
       console.log('Message handled in the background!');
       console.log(remoteMessage);
       if (Platform.OS === "ios") {
         notifee.displayNotification({
           title: title,
           body: body,
           android: {
             channelId: "defult",
           },
         });
 
         
 
 
       } else {
       PushNotification.createChannel({
         channelId: "channel-id", // (required)
         channelName: "My channel", // (required)
         channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
         playSound: false, // (optional) default: true
         soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
         vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
       });
       console.log('>>>>>>>>>>>>>>>>>>>>>2')
 
       // PushNotification.localNotification({
       //   /* Android Only Properties */
       //   channelId: "channel-id", // (required) channelId, if the channel doesn't exist, notification will not trigger.
 
       //   title: title, // (optional)
       //   message: body, // (required)
       //   onOpen: () => { 
       //     console.log('>>>>>>>>>>>>>>>>>>>>>3')
 
       //     navigationRef.current.navigate("NotificationScreen",{
       //     id: Userid,
       //     title: "Notifications",
       //   }); },
       // });
 
 
   }
     });
     messaging().onMessage(async (remoteMessage) => {
       const { title, body } = remoteMessage.notification;
       if (Platform.OS === "ios") {
         notifee.displayNotification({
           title: title,
           body: body,
           android: {
             channelId: "defult",
           },
         });
 
         notifee.onForegroundEvent(notificationPressActionEventListener);
         notifee.onBackgroundEvent(notificationPressActionEventListener);
 
         PushNotification.configure({
           onNotification: function(notification) {
               const { data } = notification;
               console.log("jhjhghghf")
       
               navigationRef.current.navigate("NotificationScreen",{
                 id: Userid,
                 title: "Notifications",
               });   
                 }
       });
 
 
       } else {
         PushNotification.createChannel({
           channelId: "channel-id", // (required)
           channelName: "My channel", // (required)
           channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
           playSound: false, // (optional) default: true
           soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
           vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
         });
         console.log('>>>>>>>>>>>>>>>>>>>>>2')
 
 
 
         PushNotification.localNotification({
           /* Android Only Properties */
           channelId: "channel-id", // (required) channelId, if the channel doesn't exist, notification will not trigger.
 
           title: title, // (optional)
           message: body, // (required)
           onOpen: () => { 
             console.log('>>>>>>>>>>>>>>>>>>>>>3')
 
             navigationRef.current.navigate("NotificationScreen",{
             id: Userid,
             title: "Notifications",
           }); },
         });
 
         PushNotification.configure({
           onNotification: function(notification) {
               const { data } = notification;
               console.log("jhjhghghf")
       
               navigationRef.current.navigate("NotificationScreen",{
                 id: Userid,
                 title: "Notifications",
               });   
                 }
       });
       }
       messaging()
       .getInitialNotification()
       .then((notificationOpen) => {
         console.log("hgjh")
         if(notificationOpen != null)
         {
 
         }
 
         
        
       
        // navigation.navigate("NotificationScreen")
 
         // this.navigator.dispatch(
         //   NavigationActions.navigate({ routeName: "NotificationScreen" })
         // );
         // console.log('>>>>>>>>>>>>>>>>>>>>>4')
 
       //   navigationRef.current.navigate("NotificationScreen",{
        //    id: Userid,
       //    title: "Notifications",
       //   });
 
       })
       .catch((err) => {
         alert(err);
       });
 
     messaging().onNotificationOpenedApp((remoteMessage) => {
       console.log("dssd")
       console.log('>>>>>>>>>>>>>>>>>>>>>5')
 
      // navigation.navigate("NotificationScreen")
 
      setTimeout(() => {
       navigationRef.current.navigate("NotificationScreen",{
         id: Userid,
         title: "Notifications",
       });
     }, 1000);
       
 
 
      });
 
     });
   };
 
   setTimeout(() => {
     SplashScreen.hide();
   }, 500);
 
   if (IsLoading) {
     return <View></View>;
   } else {
     if (Auth_Token != null && Auth_Token != "" && Userid != "") {
       return (
         <NavigationContainer ref={navigationRef}>
           <Stack.Navigator
             screenOptions={{
               headerShown: Platform.OS == "false" ? true : false,
             }}
           >
             <Stack.Screen
               name="HomeNavigator"
               component={AppNavigator}
               navigation={Stack.navigation}
               initialParams={{ userd: Userid }}
               options={{ headerShown: false, gestureEnabled: false }}
             />
             <Stack.Screen
               name="AuthStack"
               component={AuthStack}
               navigation={Stack.navigation}
               options={{ headerShown: false, gestureEnabled: false }}
             />
           </Stack.Navigator>
         </NavigationContainer>
       );
     } else {
       return (
         <NavigationContainer>
           <Stack.Navigator
             screenOptions={{
               headerShown: Platform.OS == "false" ? true : false,
             }}
           >
             <Stack.Screen
               name="AuthStack"
               component={AuthStack}
               navigation={Stack.navigation}
               options={{ headerShown: false, gestureEnabled: false }}
             />
             <Stack.Screen
               name="HomeNavigator"
               component={AppNavigator}
               navigation={Stack.navigation}
               options={{ headerShown: false, gestureEnabled: false }}
             />
           </Stack.Navigator>
         </NavigationContainer>
       );
     }
   }
 }
 
 function AppNavigator(props) {
   return (
     <Stack.Navigator
       screenOptions={{
         headerShown: false,
       }}
     >
       <Stack.Screen
         name="MainScreenNavigator"
         component={MainScreenNavigator}
         navigation={Stack.navigation}
         options={{ gestureEnabled: false }}
         initialParams={{ userid: props.route.params.userd }}
       />
 
       <Stack.Screen
         name="MyProfileScreen"
         component={MyProfileScreen}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       <Stack.Screen
         name="DevicesScreen"
         component={DevicesScreen}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       <Stack.Screen
         name="ChangePasswordScreen"
         component={ChangePasswordScreen}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       <Stack.Screen
         name="TermsCondition"
         component={TermsCondition}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       <Stack.Screen
         name="PlantsDetailScreen"
         component={PlantsDetailScreen}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       <Stack.Screen
         name="EditProfile"
         component={EditProfile}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       {/* StateShareScreen */}
 
       <Stack.Screen
         name="StateShareScreen"
         component={StateShareScreen}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       <Stack.Screen
         name="SearchScreen"
         component={SearchScreen}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       {/* AddDeviceQRScanner */}
       <Stack.Screen
         name="AddDeviceQRScanner"
         component={AddDeviceQRScanner}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       {/* EditDeviceScreen */}
       <Stack.Screen
         name="EditDeviceScreen"
         component={EditDeviceScreen}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       {/* AddDeviceManuallyScreen */}
       <Stack.Screen
         name="AddDeviceManuallyScreen"
         component={AddDeviceManuallyScreen}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       {/* AddNewPlant */}
       <Stack.Screen
         name="AddNewPlant"
         component={AddNewPlant}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       {/* EditPlant */}
       <Stack.Screen
         name="EditPlant"
         component={EditPlant}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
       <Stack.Screen
         name="mybadges"
         component={mybadges}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       <Stack.Screen
         name="ConnectDevice"
         component={ConnectDevice}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       <Stack.Screen
         name="SerachFriend"
         component={SerachFriend}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       <Stack.Screen
         name="FriendPlantList"
         component={FriendPlantList}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       <Stack.Screen
         name="ContactUs"
         component={ContactScreen}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
 
       <Stack.Screen
         name="NotificationScreen"
         component={NotificationScreen}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
       <Stack.Screen
       
       name="UpdateEmail"
       component={UpdateEmail}
       options={{ gestureEnabled: false, headerShown: false }}
       navigation={Stack.navigation}
       />
       
       <Stack.Screen
       
       name="VerifyEmail"
       component={VerifyEmail}
       options={{ gestureEnabled: false, headerShown: false }}
       navigation={Stack.navigation}
       />
        <Stack.Screen
       
       name="ThankyouScreen"
       component={ThankyouScreen}
       options={{ gestureEnabled: false, headerShown: false }}
       navigation={Stack.navigation}
       />
     </Stack.Navigator>
   );
 }
 
 function MainScreenNavigator(props) {
   {
     console.log("This is in Main Screen Navigator");
   }
 
   const tabBarListeners = ({ navigation, route }) => ({
     tabPress: () => {
       EventRegister.emit("Profie updated", "it works!!!");
     },
   });
 
   return (
     <SafeAreaProvider>
       <Tab.Navigator
         tabBarOptions={{
           activeTintColor: "#66a944",
           inactiveTintColor: "gray",
           style: {
             backgroundColor: "#ffffff",
           },
           keyboardHidesTabBar: true,
           labelStyle: {
             fontSize: 14,
             margin: 0,
             padding: 0,
             fontFamily: "Rubik-Regular",
           },
         }}
         screenOptions={({ route }) => ({
           tabBarIcon: ({ focused, color, size }) => {
             let iconName;
 
             if (route.name === "Home") {
               iconName = focused ? homeIconActive : homeIcon;
             } else if (route.name === "Plants") {
               iconName = focused ? plantIconActive : plantIcon;
             } else if (route.name === "Friends") {
               iconName = focused ? friendIconActive : friendIcon;
             } else if (route.name === "Profile") {
               iconName = focused ? profileIconActive : profileIcon;
             } else if (route.name === "Settings") {
               iconName = focused ? settingIconActive : settingIcon;
             }
             // You can return any component that you like here!
             return (
               <Image
                 source={iconName}
                 resizeMode="contain"
                 style={{ height: 20, width: 20 }}
               />
             );
           },
         })}
       >
         <Tab.Screen name="Home" component={HomeStack}></Tab.Screen>
         <Tab.Screen
           name="Plants"
           component={PlantStack}
           initialParams={{ userid: props.route.params.userid }}
         ></Tab.Screen>
         <Tab.Screen name="Friends" component={FriendsStack}></Tab.Screen>
         <Tab.Screen
           name="Profile"
           component={ProfileStack}
           listeners={tabBarListeners}
         ></Tab.Screen>
         <Tab.Screen name="Settings" component={SettingsStack}></Tab.Screen>
       </Tab.Navigator>
     </SafeAreaProvider>
   );
 }
 
 const HomeStack = () => {
   return (
     <Stack.Navigator
       screenOptions={{
         headerShown: false,
       }}
     >
       <Stack.Screen
         name="HomeScreen"
         component={HomeScreen}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
     </Stack.Navigator>
   );
 };
 
 const PlantStack = (props) => {
   return (
     <Stack.Navigator
       screenOptions={{
         headerShown: false,
       }}
     >
       <Stack.Screen
         name="PlantsScreen"
         component={PlantsScreen}
         initialParams={{ userid: props.route.params.userid }}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
     </Stack.Navigator>
   );
 };
 
 const FriendsStack = () => {
   return (
     <Stack.Navigator
       screenOptions={{
         headerShown: false,
       }}
     >
       <Stack.Screen
         name="FriendsScreen"
         component={FriendsScreen}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
     </Stack.Navigator>
   );
 };
 
 const ProfileStack = () => {
   return (
     <Stack.Navigator
       screenOptions={{
         headerShown: false,
       }}
     >
       <Stack.Screen
         name="ProfileScreen"
         component={ProfileScreen}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
     </Stack.Navigator>
   );
 };
 
 const SettingsStack = () => {
   return (
     <Stack.Navigator
       screenOptions={{
         headerShown: false,
       }}
     >
       <Stack.Screen
         name="SettingsScreen"
         component={SettingsScreen}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
     </Stack.Navigator>
   );
 };
 
 const AuthStack = () => {
   {
     console.log("This is in Auth Stack");
   }
 
   return (
     <Stack.Navigator>
       <Stack.Screen
         name="Login"
         component={Login}
         navigation={Stack.navigation}
         options={{ headerShown: false }}
       />
       <Stack.Screen
         name="Register"
         component={Register}
         navigation={Stack.navigation}
         options={{ headerShown: false }}
       />
       <Stack.Screen
         name="ForgotPassword"
         component={ForgotPassword}
         navigation={Stack.navigation}
         options={{ headerShown: false }}
       />
       <Stack.Screen
         name="OTP"
         component={OTP}
         navigation={Stack.navigation}
         options={{ headerShown: false }}
       />
       <Stack.Screen
         name="resetpassword"
         component={resetpassword}
         navigation={Stack.navigation}
         options={{ headerShown: false }}
       />
 
       <Stack.Screen
         name="TermsCondition"
         component={TermsCondition}
         options={{ gestureEnabled: false, headerShown: false }}
         navigation={Stack.navigation}
       />
     </Stack.Navigator>
   );
 };
 