import React, { useEffect, useState } from 'react'
import { useColorScheme, StyleSheet, Text, Image, View, Button, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

function HomePage({navigation}){
  const isDarkMode = useColorScheme() === 'dark';
  const [count,setCount] = useState(0)
  let data = [
    {id:1,name:'rabin redux'}
  ]

  // useEffect(()=>{
  //   navigation.setOptions({
  //     headerLeft:()=>(
  //       <View><Text style={{color:'black'}}>===</Text></View>
  //   ), 
  //   headerRight:()=>(
  //       <View style={{  flexDirection: "row"}}>
  //         <Button title="Update" onPress={()=>{
  //           navigation.setOptions({title:'updated'})
  //           setCount(prev=>prev+1)
  //         }} />
  //         <Text style={{color:'red'}}>{count}</Text>
  //       </View>
  //   )
  //   })
  // },[navigation,count])

  return(
    <ImageBackground style={styles.body}  source={{uri:'https://cutewallpaper.org/21/red-and-black-hd-wallpaper/Black-red-Wallpapers-Free-by-ZEDGEtm.jpg'}}>
    <SafeAreaView>
    <View>
          <View style={styles.pages}>
            <Button title='Redux Page'onPress={()=>navigation.push('ReduxPage',data)}/>
            <Button title='Test Redux Page'onPress={()=>navigation.push('TestRedux')}/>
            <Button title='Goal Page'onPress={()=>navigation.push('Goals')}/>
            <Button title='Camera Page'onPress={()=>navigation.push('Camera')}/>
            </View>
        </View>
        </SafeAreaView>
        </ImageBackground>
        )
}

const styles = StyleSheet.create({
  body:{
    flex:1
  },
  pages:{
    paddingTop:20,
    justifyContent:'space-around',
    flexDirection:'column',
    alignItems:'center',
    width:'100%',
    gap:2,
  }
})

export default HomePage