import React, { useState,useEffect } from 'react'
import {Text,FlatList, View, Button, TextInput,StyleSheet, ScrollView,RefreshControl} from 'react-native';
import GoalInput from './GoalInput'
import GoalItem from './GoalItem'

const GoalPage = ({navigation}) => {
  const [isRefreshing,setIsRefreshing]= useState(false)
  const [courseGoals,setCouseGoals] = useState([
    {text:'js',id:1},
    {text:'react',id:2},
    {text:'react-native',id:3},
    {text:'python',id:4},
    {text:'rust',id:5},
    {text:'flask',id:6}
  ])
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

const onRefresh = ()=>{
  setIsRefreshing(true)
  const id = courseGoals[courseGoals.length-1].id+1
  setCouseGoals(prev=>[...prev, {text:'enjoy'+id,id:id}])
  setIsRefreshing(false)
}

  return (
      <View style = {styles.appContainer}>
      <Text>Use db to store</Text>
      <ScrollView horizontal={true} style={{flex:1}}>
        {
          [1,2,3,4,5,6,7,8,9,10].map((item,index)=>{
            return(
              <Text key={index} style={{height:40,padding:4,marginHorizontal:4,backgroundColor:'#eee'}}>Title {item}</Text>
              )

          })
        }
      </ScrollView>
      <View style={styles.buttons}>
        <Button title='Go Back' onPress={()=>navigation.goBack()}/>
        <Button title='Add New Goal' color="#5e0acc" onPress={()=>setIsModalVisible(true)}/>
      </View>
        <GoalInput addGoalHandler={addGoalHandler} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
        <View style={styles.goalsContainer}>
          <FlatList
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={['red','green']} />
          }
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
        paddingTop:2,
        paddingHorizontal:4,
        backgroundColor:'#343385'
      },
      goalsContainer:{
        flex:11,
        height:'100%'
      },
      buttons:{
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row',
        marginBottom:6
      }
     
    })
export default GoalPage