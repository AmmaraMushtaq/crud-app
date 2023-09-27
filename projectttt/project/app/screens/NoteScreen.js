import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,


} from 'react-native';
import React, { useState, useEffect } from 'react'
import colors from '../misc/colors';
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';
import Intro from './Intro';
import NoteInputModal from '../components/NoteInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';
import { useNotes } from '../contexts/NoteProvider';
import NotFound from '../components/NotFound';


const reverseData =data=>{
  return data.sort((a,b)=>{
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if(aInt<bInt)return 1;
    if(aInt==bInt)return 0;
    if(aInt>bInt)return -1;
    
  })
}
const NoteScreen = ({ user, navigation }) => {
  const [greet, setGreet] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const { notes, setNotes, findNotes } = useNotes()
  const [searchQuery, setSearchQuery] = useState('')
  const [resultNotFound, setResultNotFound] = useState(false)

  const findGreat = () => {
    const hrs = new Date().getHours()
    if (hrs === 0 || hrs < 12) return setGreet('morning');
    if (hrs === 1 || hrs < 17) return setGreet('afternoon');
    setGreet('Evening')
  }

  useEffect(() => {
    // AsyncStorage.clear()

    findGreat();
  }, [])
  const reverseNotes =reverseData(notes)

  const handleOnSubmit = async (image, name, title, modal,weight, descripation) => {
    const note = { id: Date.now(), image, name, title, modal,weight, descripation, time: Date.now() };
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
  };
  const openNote = note => {
    navigation.navigate('NoteDetail', { note })
  }
  const handleOnSearchInput = async (text) => {
    setSearchQuery(text)
    if (!text.trim()) {
      setSearchQuery('')
      setResultNotFound(false)
      await findNotes()
    }
    const filteredNotes = notes.filter(note => {
      if (note.title.toLowerCase().includes(text.toLowerCase())) {
        return note;
      }
    })
    if (filteredNotes.lenght) {
      setNotes([...filteredNotes])
    } else {
      setResultNotFound(true);
    }
  }
  const handleOnClear=async()=>{
    setSearchQuery('')
    setResultNotFound(false)
    await findNotes()
  }
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
          {/* <Text style={styles.p}>
            Understanding where you are makes it much easier to see where you want to go.
             We can never sit back and rest on past achievements</Text> */}
          {notes.length ?
            <SearchBar value={searchQuery} onChangeText={handleOnSearchInput} containerStyle={{ marginVertical: 15 }}onClear={handleOnClear}/>
            : null}
          {resultNotFound ? <NotFound /> :
           <FlatList
            data={reverseNotes}
            // numColumns={2}
            // columnWrapperStyle={{
            //   justifyContent: 'space-between',
            //   marginBottom: 15,
            // }}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <Note onPress={() => openNote(item)} item={item} />
            )}
          />}


          {!notes.length ?
            <View style={[StyleSheet.absoluteFillObject,
            styles.emptyHeaderContainer,]}>
              <Text style={styles.emptyHeader}>Add Data</Text>


            </View> : null
          }


        </View>
      </TouchableWithoutFeedback>

      <RoundIconBtn
        onPress={() => setModalVisible(true)}
        antIconName='plus'
        style={styles.addBtn}
      />
      <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />

    </>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
    container: {
    paddingHorizontal: 20,
    zIndex: 1,
    flex: 1

  },
    emptyHeader: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2
  },
  emptyHeaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  addBtn: {
    position: 'absolute',
    right: 15,
    bottom: 50,
    zIndex: 1
  },
  p:{
    margin:10,
    fontSize:2
    
  }
})
export default NoteScreen;