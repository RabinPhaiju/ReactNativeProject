import React, { useState,useEffect } from 'react'
import {Text,FlatList, View, Button, TextInput,StyleSheet, ScrollView,RefreshControl} from 'react-native';
import GoalInput from './GoalInput'
import GoalItem from './GoalItem'
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
  name:'GoalDB',location:'default'
},()=>{},
error=>{console.log(error)})

const GoalPage = ({navigation}) => {
  const [isRefreshing,setIsRefreshing]= useState(false)
  const [courseGoals,setCouseGoals] = useState([])
  const [isModalVisible,setIsModalVisible] = useState(false)

  const createTable = ()=>{
    try{
      db.transaction((tx)=>{
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS goals (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
          )
        })
      }catch(error){console.log(error)}
  }

  const addGoalHandler=(text)=>{
       db.transaction((tx)=>{
        // await tx.executeSql("INSERT INTO Goals (Name) VALUES ('"+text+"')");
        tx.executeSql("INSERT INTO goals (name) VALUES (?)",[text],
        (sqltxn,res)=>{
          setCouseGoals(prev=>[{name:text,id:res?.insertId},...prev])
        });
      })
  }

  const removeGoalHandler = id=>{
    db.transaction((tx)=>{
      tx.executeSql("DELETE FROM goals WHERE id="+id,[],
      (sqltxn,res)=>{
        setCouseGoals(prev=>[...prev.filter(p=>p.id!=id)])
      });
    })
  }

  useEffect(()=>{
    createTable()
    getSQLiteData()
    navigation.setOptions({
      headerStyle:{
            backgroundColor:'#343345',
          },
          headerTintColor:'#eee',
    })
  },[])

  const getSQLiteData = ()=>{
         db.transaction((tx)=>{
          tx.executeSql(
            "SELECT * FROM goals ORDER BY id DESC",[],(tx,res)=>{
              // console.log('courses retrive successful')
              let len = res.rows.length;
              if(len>0){
                let results = []
                for(let i = 0;i<len;i++){
                  let item = res.rows.item(i);
                  results.push({id:item.id,name:item.name})
                }
               setCouseGoals(results)
              }
            },
            error =>{
              // console.log("error on getting courses"+error.message)
            }
          )
        })
  }

const onRefresh = ()=>{
  setIsRefreshing(true)
  getSQLiteData()
  setIsRefreshing(false)
}

  return (
      <View style = {styles.appContainer}>
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