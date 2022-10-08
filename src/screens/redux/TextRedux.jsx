import React,{useEffect, useState} from 'react'
import uuid from 'react-native-uuid';
import {useDispatch,useSelector} from "react-redux"
import { removeUser } from '../../redux/features/userSlice';
import { Text, FlatList, View, Button,StyleSheet,Pressable} from 'react-native';

const TestRedux = ({navigation}) => {
  const dispatch = useDispatch();
  const users = useSelector(state=>state.userReducer.value)

  const removeUserHandler=(user)=>{
    dispatch(removeUser(user))
  }

  return (
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
        {users.length==0 && <Text>User list is empty!</Text>}
  </View>
  )
}

const styles = StyleSheet.create({
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

export default TestRedux