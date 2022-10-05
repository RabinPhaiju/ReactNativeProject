import React from 'react'
import { SafeAreaView, Text,FlatList, View, Button,} from 'react-native';

const DetailPage = ({route,navigation}) => {
  let DATA = route.params

  const renderItem = ({ item }) => (
    <View>
      <Text style={{color:'black'}}>{item.name}</Text>
    </View>
  );

  return (
  <View>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={item=>item.id}/>
      <Button title='Go Back' onPress={()=>navigation.goBack()}/>
  </View>
  )
}

export default DetailPage