import React, { useEffect, useState } from 'react'
import { useColorScheme, ScrollView, Text, Image, View, Button} from 'react-native';

const HomePage = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [count,setCount] = useState(0)
  let data = [
    {id:1,name:'rabin'},
    {id:2,name:'sabin'}
  ]

  useEffect(()=>{
    navigation.setOptions({
      headerLeft:()=>(
        <View><Text style={{color:'black'}}>===</Text></View>
    ), 
    headerRight:()=>(
        <View style={{  flexDirection: "row"}}>
          <Button title="Update" onPress={()=>{
            navigation.setOptions({title:'updated'})
            setCount(prev=>prev+1)
          }} />
          <Text style={{color:'red'}}>{count}</Text>
        </View>
    )
    })
  },[navigation,count])

  return(
    <View>
      <Text style={{fontSize:20,color:'black',textAlign:'center'}} >Home Page</Text>
      <View style={{flexDirection:'column',gap:2,justifyContent:'space-around',alignItems:'center',width:'100%'}}>
          <Button title='About Page'onPress={()=>navigation.push('About')}/>
          <Button title='Detail Page'onPress={()=>navigation.push('Detail',data)}/>
          <Button title='Setting Page'onPress={()=>navigation.push('Setting')}/>
          <Button title='Goal Page'onPress={()=>navigation.push('Goals')}/>
      </View>
      </View>
    )
}

export default HomePage