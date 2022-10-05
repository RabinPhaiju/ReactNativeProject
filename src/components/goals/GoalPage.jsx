import React, { useState,useEffect } from 'react'
import {Text,FlatList, View, Button, TextInput,StyleSheet} from 'react-native';
import GoalInput from './GoalInput'
import GoalItem from './GoalItem'

const GoalPage = ({navigation}) => {
  const [courseGoals,setCouseGoals] = useState([])
  const [isModalVisible,setIsModalVisible] = useState(false)

  const addGoalHandler=(text)=>{
    setCouseGoals(prev=>[{text:text,id:Math.random().toString()},...prev])
  }

  const removeGoalHandler = id=>{
      setCouseGoals(prev=>[...prev.filter(p=>p.id!=id)])
  }

  useEffect(()=>{
    navigation.setOptions({
      headerStyle:{
            backgroundColor:'#343345',
          },
          headerTintColor:'#eee',
    })
  },[])

  return (
      <View style = {styles.appContainer}>
      <Text>Use db to store</Text>
      <View style={styles.buttons}>
        <Button title='Go Back' onPress={()=>navigation.goBack()}/>
        <Button title='Add New Goal' color="#5e0acc" onPress={()=>setIsModalVisible(true)}/>
      </View>
        <GoalInput addGoalHandler={addGoalHandler} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
        <View style={styles.goalsContainer}>
          <FlatList
          data = {courseGoals}
          renderItem={(itemData)=> <GoalItem removeGoalHandler={removeGoalHandler} itemData={itemData}/>}
          keyExtractor = {item=>item.id }
          />
          </View>
      </View>
      )
    }

    const styles = StyleSheet.create({
      appContainer:{
        flex:1,
        paddingTop:20,
        paddingHorizontal:4,
        backgroundColor:'#343345'
      },
      goalsContainer:{
        flex:6,
      },
      buttons:{
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row'
      }
     
    })
export default GoalPage