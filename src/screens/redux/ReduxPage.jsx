import React,{useEffect, useState} from 'react'
import uuid from 'react-native-uuid';
import {useDispatch,useSelector} from "react-redux"
import { addUser,removeUser } from '../../redux/features/userSlice';
import { SafeAreaView, Text, TextInput, FlatList, View, Button,StyleSheet,Pressable} from 'react-native';

import PushNotification,{Importance} from 'react-native-push-notification';

const ReduxPage = ({route,navigation}) => {
  let DATA = route.params
  const dispatch = useDispatch();
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const users = useSelector(state=>state.userReducer.value)

  useEffect(()=>{
    navigation.setOptions({title:DATA[0].name})
    createChannels()
    },[])

  const handleUserSubmit = ()=>{
    const id=uuid.v4()
    dispatch(addUser({id:id,name:name,email:email}))
    setName("")
    setEmail("")
    // handleNotification()
    handleNotificationSchedule()
  }

  const removeUserHandler=(user)=>{
    dispatch(removeUser(user))
  }

  const createChannels = ()=>{
    PushNotification.createChannel(
      {
        channelId: "redux-channel",
        channelName: "Redux Channel",
        channelDescription: "A channel to categorise your notifications",
        importance: Importance.HIGH,
        vibrate: true
      },
    );
  }

  const handleNotification = ()=>{
    PushNotification.cancelAllLocalNotifications()
    PushNotification.localNotification({
      channelId:"redux-channel",
      title:"User added!",
      message:name,
      color:'red',
      id:1
    })
  }
  const handleNotificationSchedule = (seconds=20)=>{
    PushNotification.localNotificationSchedule({
      channelId:"redux-channel",
      title:"User added!",
      message:name,
      color:'red',
      id:1,
      date:new Date(Date.now()+seconds * 1000),
      allowWhileIdle:true
    })
  }

  return (
  <View>
      <View style={styles.input}>
        <TextInput style={styles.textInput} placeholder="name" value={name} onChangeText={setName}/>
        <TextInput style={styles.textInput} placeholder="email" value={email} onChangeText={setEmail}/>
      </View>
      <View style={styles.buttonContainer}>
      <Button title="Save" color="#b180f0" onPress={handleUserSubmit}/>
    </View>
    <View style={styles.userContainer}>
      <FlatList
        data = {users}
        renderItem={(itemData)=>   
          <View style={styles.userItem}>
            <Pressable onLongPress={()=>removeUserHandler(itemData.item)} style={({pressed})=> pressed && styles.pressedItem} >
              <Text style={styles.userText}>{itemData.item.name}</Text>
            </Pressable>
         </View>
        }
        keyExtractor = {item=>item.id }
        />
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
  input:{
    paddingHorizontal:4,
  },
  textInput:{
    borderWidth:1,
    borderRadius:6,
    borderColor:'#3338',
    width:'98%',
    padding:12,
    margin:4,
    color:'#120438'
  },
  buttonContainer:{
    padding:8,
  },
  userContainer:{
       padding:8
      },
      userItem:{
        marginVertical:4,
        borderRadius:6,
        backgroundColor:'#7458a6'
      },
      pressedItem:{
        opacity:0.5
      },
      userText:{
        padding:8,
        color:'white'
      }
})

export default ReduxPage