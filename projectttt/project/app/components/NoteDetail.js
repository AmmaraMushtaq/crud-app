import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import{StyleSheet, Text, View,ScrollView,Alert } from 'react-native'
import { useNotes } from "../contexts/NoteProvider";
import colors from '../misc/colors';
import NoteInputModal from "./NoteInputModal";
import RoundIconBtn from "./RoundIconBtn";


// import {useHeaderHeight} from '@react-navigation/stack';
const formatDate = ms =>{
 const date =new Date(ms);
 const day = date.getDate();
 const month = date.getMonth()+1;
 const year = date.getFullYear();
 const hrs  = date.getHours();
 const min  = date.getMinutes();
 const sec  = date.getSeconds();
 return `${day}/${month}/${year} -${hrs}:${min}:${sec}`

}


    const NoteDetail=(props)=>{
     
    const [note,setNote]=useState(props.route.params.note)
    // const headerHeight = useHeaderHeight();
        const {setNotes}=useNotes()
        const [showModal,setShowModal]=useState(false)
        const [isEdit,setIsEdit]=useState(false)

        const deleteNote = async () => {
            const result = await AsyncStorage.getItem('notes');
            let notes = [];
            if (result !== null) notes = JSON.parse(result);
        
            const newNotes = notes.filter(n => n.id !== note.id);
            setNotes(newNotes);
            await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
            props.navigation.goBack();
          };

    // 
    const displayDeleteAlert = () => {
        Alert.alert(
          'Are You Sure!',
          'This action will delete your note permanently!',
          [
            {
              text: 'Delete',
              onPress: deleteNote,
            },
            {
              text: 'No Thanks',
              onPress: () => console.log('no thanks'),
            },
          ],
          {
            cancelable: true,
          }
        );
      };
   const handleUpdate=async(name,title,modal,weight,descripation,time)=>{
    const result=await AsyncStorage.getItem('notes')
    let notes=[];
    if(result !==null) notes=JSON.parse(result)
    const newNotes= notes.filter(n=>{
    if(n.id === note.id){
    
    n.name=name
    n.title=title
    n.modal=modal
    n.weight=weight
    n.descripation=descripation
    n.isUpdate=true
    n.time=time
    setNote(n)
}
    return n;
}
)
setNotes(newNotes)
await AsyncStorage.setItem('notes',JSON.stringify(newNotes))
   }
   const handleOnClose=()=>setShowModal(false)
   const openEditModal=()=>{
    setIsEdit(true)
    setShowModal(true)
   }
  
  
    return( 
        <>
        <ScrollView contentContainerstyle={[styles.container
        // ,{paddingTop: headerHeight}
        ]}>
         <Text style={styles.time}>
          {note.isUpdated
            ? `Created At ${formatDate(note.time)}`
            : `Updated At ${formatDate(note.time)}`}
        </Text>
{/* <Text style={styles.Image}> {note.Image}</Text> */}

<Text style={styles.name}> Name: {note.name }</Text>
<Text style={styles.title}> Title: {note.title}</Text>
<Text style={styles.modal}> Modal: {note.modal}</Text>
<Text style={styles.weight}> Weight: { note.weight}</Text>
<Text style={styles.descripation}> Descripation: {note.descripation}</Text>

        </ScrollView>

<View style={styles.btnContainer}>
<RoundIconBtn antIconName='delete' style={{backgroundColor:colors.ERROR,marginBottom:15}}
    onPress={displayDeleteAlert}
/>
<RoundIconBtn antIconName='edit'
onPress={openEditModal}
 />

 </View>
 <NoteInputModal isEdit={isEdit} note={note} onClose={handleOnClose} onSubmit={handleUpdate}  visible={showModal}/>
 </>
    )
}

const styles = StyleSheet.create({
    container:{
    //    flex:1,
      paddingHorizontal:15, 
   },
   name:{
    fontSize:30,
    color:'blue',
    // fontWeight:'bold',
   },
   title:{
    fontSize:30,
    color:'blue',
    // fontWeight:'bold',
   },
   modal:{
    fontSize:30,
    color:'blue',
    //  fontWeight:'bold',
   },
   weight:{
    fontSize:30,
    color:'blue',
    // fontWeight:'bold',
   },
   descripation:{
    fontSize:20,
    color:'blue',
    opacity:0.6,
   },
   time:{
    textAlign:"right",
    fontSize:20,
    opacity:0.5
   },
   btnContainer:{
    position:'absolute',
    right:15,
    bottom:50,
   }
  });
export default NoteDetail;