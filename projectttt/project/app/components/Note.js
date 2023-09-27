
import React,{useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  
  TouchableOpacity
  
} from 'react-native';
import colors from '../misc/colors';
const Note = ({ item, onPress }) => {
  const {title, descripation,modal,name,weight } = item;
  
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
     <Text>
    {/* <Image
        style={styles.logo}
        source={{
          uri: 'https://www.shutterstock.com/image-illustration/bu…ng-crane-icon-rounded-squares-260nw-255035764.jpg',
        }}
      /> */}
    </Text>
    <Text style={styles.name} numberOfLines={2}>
       Name: {name}
      </Text>
      <Text style={styles.title} numberOfLines={2}>
       Title:  {title}
      </Text>
      <Text style={styles.modal} numberOfLines={1}>
        Modal:{modal}
      </Text>
      <Text style={styles.weight} numberOfLines={1}>
        weight:{weight}
      </Text>
      <Text numberOfLines={3}>Descripation:{descripation}</Text>
    </TouchableOpacity>
  );
};






const styles = StyleSheet.create({
  container: {
  // backgroundColor: colors.PRIMARY,
    //  height:'83%',
     padding: 8,
     borderRadius: 10,
     margin:'5%',
     borderBottomLeftRadius: 10/2,
     borderBottomRightRadius: 10/2,
     borderTopLeftRadius: 10/2,
     borderTopRightRadius: 10/2,
     borderBottomWidth: 2,
     borderRightWidth: 2,
     borderTopWidth: 2,
     borderLeftWidth: 2,
     borderBottomColor: 'black',
     borderRightColor: 'black',
     borderTopColor: 'black',
     borderLeftColor: 'black'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  descripation: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'black',
  },
  modal: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  weight: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  logo:{
    height:50,
    width:50,
   
  }

});

export default Note;