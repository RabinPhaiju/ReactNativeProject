import { useState } from "react"
import { View,TextInput,Button,StyleSheet,Modal } from "react-native"
import Toast from 'react-native-toast-message';

const GoalInput = ({addGoalHandler,setIsModalVisible,isModalVisible}) => {
    const [enteredText,setEnteredText] = useState('')

    function goalInputHandler(text){
      setEnteredText(text)
    }
    function handleAddGoal(){
      if(enteredText.length>0){
        addGoalHandler(enteredText)
        setEnteredText('')
        setIsModalVisible(false)
      }else{
        console.warn('error')
        // Toast.show({
        //   type: 'info',
        //   text1: 'Hello Developer'
        //   // text2: 'Enter Couse Name'
        // })
      }
  }

  return (
    <Modal style={{height:200}} visible={isModalVisible} animationType='slide' >
      <View style = {styles.inputContainer}>
   
        <TextInput style={styles.textInput} placeholder="course goals!" value={enteredText}
        onChangeText={goalInputHandler}/>
        <View style={styles.buttonContainer}>
          <Button title="Add Goal" color="#b180f0" onPress={handleAddGoal}/>
          <View style={styles.cancelButton}>
            <Button title="Cancel" color="#f31282" onPress={()=>setIsModalVisible(false)}/>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  image:{
    width:400,
    height:200,
    margin:12
  },
    inputContainer:{
      backgroundColor:'#120838',
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        padding:16,
      },
      buttonContainer:{
        marginTop:8,
        justifyContent:'space-around',
        flexDirection:'row',
      },
      cancelButton:{
        width:'26%',
        marginHorizontal:8
      },
      textInput:{
        borderWidth:1,
        borderRadius:6,
        borderColor:'#e4d0ff',
        backgroundColor:'#e4d0ff',
        width:'98%',
        padding:12,
        color:'#120438'
      }
})

export default GoalInput