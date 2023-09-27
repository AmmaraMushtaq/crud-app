import React from "react";
import {View,StyleSheet,TextInput} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import colors from '../misc/colors';
const SearchBar=({containerStyle,value,onChangeText,onClear})=>{
    return(
        <View style={[styles.container,{...containerStyle}]}>
       <TextInput value={value} onChangeText={onChangeText} style={styles.SearchBar} placeholder='search here..'/>
       {value?<AntDesign name="close" size={20} color={colors.ERROR} onPress={onClear}style={styles.clearIcon}/>:null}
        </View>
    )
}
const styles = StyleSheet.create({
    SearchBar:{
        borderWidth:0.7,
        borderColor:colors.PRIMARY,
        height:50,
        borderRadius:40,
        paddingLeft:15,
        fontSize:20
    },
    container:{
        justifyContent:'center'
        // paddingHorizontal:20
    },
    clearIcon:{
    position:'absolute',
    right:10
    }
})
export default SearchBar