import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Intro from './app/screens/Intro';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import NoteScreen from './app/screens/NoteScreen';
import NoteDetail from './app/components/NoteDetail';
import NoteProvider from './app/contexts/NoteProvider';
const Stack = createStackNavigator();
export default function App(){
  const [user,setUser] =useState({})
  const [isAppFirstTimeOpen,setIsAppFirstTimeOpen]=useState(false)
  const findUser= async()=>{
   const result= await AsyncStorage.getItem('user');
   if(result === null) return setIsAppFirstTimeOpen(true)
   if(result !==null){
    setUser(JSON.parse(result))
    setIsAppFirstTimeOpen(false);
   }
  
  }
  useEffect(() => {
     findUser()
     //AsyncStorage.clear();
   
  }, []);

  const RenderNoteScreen = (props) => <NoteScreen {...props} user={user} />;
  if(isAppFirstTimeOpen) return<Intro onFinish={findUser}/>;
return (
   <NavigationContainer>
   <NoteProvider>
       <Stack.Navigator screenOptions={{headerTitle:'',headerTransparent:false}}>
       {/* <Stack.Screen component={renderNoteScreen} name="NoteScreen" /> */}
       
       <Stack.Screen component={RenderNoteScreen} name='NoteScreen' />
          <Stack.Screen component={NoteDetail} name='NoteDetail' />

       </Stack.Navigator>
       </NoteProvider>
   </NavigationContainer>)}


const styles = StyleSheet.create({
 
   container:{
      flex:1,
    justifyContent:'center',
    alignItems:'center',
     
 },
})