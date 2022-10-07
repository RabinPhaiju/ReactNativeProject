import { StyleSheet,View,Text, Pressable } from "react-native"

const GoalItem = ({removeGoalHandler,itemData}) => {
  return (
    <View style={styles.goalItem}>
      <Pressable 
      
        onLongPress={()=>removeGoalHandler(itemData.item.id)}
        style={({pressed})=> pressed && styles.pressedItem}
        >
        <Text style={styles.goalText}>{itemData.item.name}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
        goalItem:{
        margin:8,
        borderRadius:6,
        backgroundColor:'#6e2add'
      },
      pressedItem:{
        opacity:0.5
      },
      goalText:{
        padding:8,
        color:'white'
      }
})

export default GoalItem