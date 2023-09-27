import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { View, StyleSheet,Text,Dimensions } from 'react-native';
 import { TextInput } from 'react-native-gesture-handler';
import RoundIconBtn from '../components/RoundIconBtn';
 import color from '../misc/colors';
const Intro = ({onFinish}) => { 
  const [name, setName] = useState('');
  const handleOnChangeText = text => setName(text);
    const handleSubmit =async()=>{
      const user = {name:name}
       await AsyncStorage.setItem('user',JSON.stringify(user));
       if(onFinish) onFinish()
    }
  
  return (
   
<>
<StatusBar hidden/>
    <View style={styles.container}>
      <Text> Enter Your name to continue </Text>
     <TextInput 
      value={name}
           onChangeText={handleOnChangeText}
          placeholder='Enter Name'
          style={styles.textInput}/>
          
        {name.trim().length >= 3 ? (
          <RoundIconBtn antIconName='arrowright' onPress={handleSubmit} />
        ) : null}
         {/* <RoundIconBtn antIconName='arrowright'/> */}
    </View>

    </>
  );
}
const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
    container:{
      flex:1,
    justifyContent:'center',
    alignItems:'center',
     
 },
 textInput: {
  borderWidth: 2,
  borderColor: color.PRIMARY,
   color:color.PRIMARY,
  width,
  height: 50,
  borderRadius: 10,
  paddingLeft: 15,
  fontSize: 25,
  marginBottom: 15,
},
inputTitle: {
  alignSelf: 'flex-start',
  paddingLeft: 25,
  marginBottom: 5,
  opacity: 0.5,
},

})

export default Intro;
