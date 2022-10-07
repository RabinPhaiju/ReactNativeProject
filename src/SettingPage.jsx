import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';
import { AsyncStorage } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'

const SettingPage = () => {
  const [name,setName] = useState('')

  useEffect(()=>{
    getAsyncData();
  },[])
  
  const getAsyncData = async()=>{
    try{
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        setName(value)
      }
    }catch(error){
    }
  }

  const handleNameChange = (text)=>{
    setName(text)
  }

  const handleAsyncStorage = async()=>{
    if(name.length>3){
      try{
        await AsyncStorage.setItem('username',name)
      }catch(error){

      }
    }else{
      Alert.alert('Warning!','Enter you name!')
    }
  }

  return (
    <View style={styles.body}>
      <Text>SettingPage</Text>
      <Text>Async Storage</Text>
      <TextInput style={styles.input} value={name} onChangeText={handleNameChange} placeholder='Enter you name' />
      <View style={styles.button}>
        <Button title='Save' onPress={handleAsyncStorage} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body:{
    alignItems:'center',
    padding:2
  },
  input:{
    borderWidth:1,
    borderRadius:6,
    borderColor:'#e4d0ff',
    width:'98%',
    padding:6,
    margin:6,
    color:'#120438',
    textAlign:'center'
  },
  button:{
    width:'40%'
  }
})

export default SettingPage