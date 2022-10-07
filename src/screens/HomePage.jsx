import React, { useEffect, useState } from 'react'
import { useColorScheme, StyleSheet, Text, Image, View, Button, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'

function HomePage({navigation}){
  const isDarkMode = useColorScheme() === 'dark';
  const [count,setCount] = useState(0)
  let data = [
    {id:1,name:'rabin'},
    {id:2,name:'sabin'}
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
        <Text style={{fontSize:20,color:'black',textAlign:'center'}} >Home Page</Text>
          <View style={{flexDirection:'column',gap:2,justifyContent:'space-around',alignItems:'center',width:'100%'}}>
            <Button title='Detail Page'onPress={()=>navigation.push('Detail',data)}/>
            <Button title='Setting Page'onPress={()=>navigation.push('Setting')}/>
            <Button title='Goal Page'onPress={()=>navigation.push('Goals')}/>
            </View>
        </View>
        </SafeAreaView>
        </ImageBackground>
        )
}

const styles = StyleSheet.create({
  body:{
    flex:1
  }
})

export default HomePage