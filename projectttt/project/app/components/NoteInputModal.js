
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Uri,
  Text,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  //  Image,
} from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';


const NoteInputModal = ({visible, onClose,onSubmit,note,isEdit }) => {
   const[image, setImage]=useState('');
  const[name, setName]=useState('');
  const[title, setTitle]=useState('');
  const[modal, setModal]=useState('');
  const[weight, setWeight]=useState('');
  const[descripation ,setDescripation]=useState('');
 
  

  const handleModalClose=()=>{
    Keyboard.dismiss();
  };
  useEffect(()=>{
if(isEdit){
  setName(note.name)
  setTitle(note.title)
  setModal(note.modal)
  setModal(note.weight)
  setDescripation(note.descripation)

}
  },[isEdit])
const handleOnChangeText=(text,valuefor)=>{
   if(valuefor === 'image')setName(text);
if(valuefor === 'name')setName(text);
if(valuefor === 'title')setTitle(text);
if(valuefor === 'modal')setModal(text);
if(valuefor === 'weight')setWeight(text);
if(valuefor === 'descripation')setDescripation(text);

};
const handleSubmit=()=>{
  if (
  !image.trim()&&
  !name.trim()&&!title.trim()&&!modal.trim()&&!weight.trim()&&!descripation.trim())return onClose();
  if(isEdit){
    onSubmit(name,title,modal,weight,descripation,Date.now())
  }else{
    onSubmit( name,title,modal,weight,descripation);
  setImage('');
  setName('');
  setTitle('');
  setModal('');
  setWeight('');
  setDescripation('');
  }
  
  onClose();

};  
const closeModal=()=>{
  if(!isEdit){
  setImage('');
  setName('');
  setTitle('');
  setModal('');
  setWeight('');
  setDescripation('');
  }
  
  onClose();
}


  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType='fade'>
        <View style={styles.container}>
        <TextInput
        type="text"
        // value={newImageUrl}
        style={styles.textinput}
        placeholder="img url"
        // onChangeText={handleAdd}
        //  onChange={props.handleChange}
      />
      <TextInput
        value={name}
           onChangeText={(text)=>handleOnChangeText(text,'name')}
            placeholder='Name:'
            style={[styles.input, styles.name]}
          />
         <TextInput
           value={title}
           onChangeText={(text)=>handleOnChangeText(text,'title')}
            placeholder='Title:'
            style={[styles.input, styles.title]}
          />
        <TextInput
            value={modal}
            onChangeText={text => handleOnChangeText(text,'modal')}
            placeholder='Modal'
            style={[styles.input, styles.modal]}
          />
           <TextInput
            value={weight}
            onChangeText={text => handleOnChangeText(text,'weight')}
            placeholder='weight'
            style={[styles.input, styles.weight]}
          />
          
        <TextInput
           value={descripation}
           onChangeText={(text)=>handleOnChangeText(text,'descripation')}
            placeholder='Descripation:'
            style={[styles.input, styles.desc]}
          />
           <View style={styles.btnContainer}>
            <RoundIconBtn
               size={15}
              antIconName='check'
              onPress={handleSubmit}
            />
            {
              image.trim() ||
              name.trim() ||
              title.trim() ||
              modal.trim() ||
              weight.trim() ||
              descripation.trim() 
               ? (
              <RoundIconBtn
                  size={15}
                  style={{ marginLeft: 15 }}
                  antIconName='close'
                   onPress={closeModal}
                  
              />
            ) : null}
          </View>
        
        </View>
        <TouchableWithoutFeedback 
         onPress={handleModalClose}
        >
          <View style={[styles.modalBG,StyleSheet.absoluteFillObject]}></View>
        </TouchableWithoutFeedback>
      
      </Modal>
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  name: {
    height: 50,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modal: {
    height: 50,
    // fontWeight: 'bold',
  },
  weight: {
    height: 50,
    // fontWeight: 'bold',
  },
  desc: {
    height: 100,
  },
  modalBG: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});

export default NoteInputModal;