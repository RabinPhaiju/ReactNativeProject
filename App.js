
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './src/HomePage';
import AboutPage from './src/AboutPage';
import DetailPage from './src/DetailPage';
import SettingPage from './src/SettingPage'
import GoalPage from './src/components/goals/GoalPage'

const HomeStack = createNativeStackNavigator();

const App=()=>{
  return (
    <NavigationContainer>
    <HomeStack.Navigator  
    // screenOptions={{
    //         headerStyle:{
    //         backgroundColor:'blue',
    //       },
    //       headerTintColor:'red',
    //       headerTitleStyle:{
    //         fontSize:30
    //       }
    //     }}
         initialRouteName='Home' >
        <HomeStack.Screen name="Home" component={HomePage} />
        <HomeStack.Screen name="About" component={AboutPage} 
        // options={{title:'About Page'}} 
        options={{
          title:'About Page',headerStyle:{
            backgroundColor:'skyblue',
          },
          headerTintColor:'red',
          headerTitleStyle:{
            fontSize:40
          }
        }}/>
        <HomeStack.Screen name="Detail" component={DetailPage} 
        options={(props)=>({title:props.route.params[0].name})} />
        <HomeStack.Screen name="Setting" component={SettingPage}/>
        <HomeStack.Screen name="Goals" component={GoalPage}/>
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
