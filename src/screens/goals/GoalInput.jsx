import { useState } from "react"
import { View,TextInput,Button,StyleSheet,Modal,ToastAndroid,StatusBar, Alert,Image } from "react-native"

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
        Alert.alert('Warning','Enter Course Goal!',[
          {text:'Do not show again!',onPress:()=>  ToastAndroid.show("Dont show again!", ToastAndroid.SHORT)},
          {text:'Cancel',onPress:()=>  ToastAndroid.show("Cancel!", ToastAndroid.SHORT)},
          {text:'OK',onPress:()=>  ToastAndroid.show("ok!", ToastAndroid.SHORT)}
        ],{
          cancelable:true,
          onDismiss:()=>  ToastAndroid.show("Dismiss!", ToastAndroid.SHORT)
        })
      }
  }

  return (
    <>
    <StatusBar backgroundColor="#555" hidden={false} barStyle="light-content" />
    <Modal transparent={true} visible={isModalVisible} animationType='fade' hardwareAccelerated >
      <View style={styles.centered_view}>
        <View style = {styles.inputContainer} >
        <Image 
        // source={require('../../../assets/images/course.jpg')} 
        source={{uri:'https://admission.aglasem.com/wp-content/uploads/2019/12/COURSES-1140x641.png'}}
        style={styles.image} />
            <TextInput style={styles.textInput} placeholder="course goals!" value={enteredText}
            multiline={true}
            keyboardType='ascii-capable'
            onChangeText={goalInputHandler}/>
            <View style={styles.buttonContainer}>
              <Button title="Add Goal" color="#b180f0" onPress={handleAddGoal}/>
              <View style={styles.cancelButton}>
                <Button title="Cancel" color="#f31282" onPress={()=>setIsModalVisible(false)}/>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  image:{
    width:380,
    height:160,
    margin:4,
    borderRadius:5
  },
  centered_view:{
    flex:1,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#0008'
  },
    inputContainer:{
      backgroundColor:'#120838',
      height:240,
      width:'100%',
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