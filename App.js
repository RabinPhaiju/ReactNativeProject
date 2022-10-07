/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashBoard from './src/DashBoard';
import DetailPage from './src/DetailPage';
import GoalPage from './src/screens/goals/GoalPage'
import SettingPage from './src/SettingPage';

const HomeStack = createNativeStackNavigator();

const App=()=>{
  return (
    <NavigationContainer>
    <HomeStack.Navigator  
    screenOptions={{
            headerStyle:{
            backgroundColor:'#444',
          },
          headerTintColor:'white',
          headerTitleStyle:{
            fontSize:25
          }
        }}
         initialRouteName='Home' >
        <HomeStack.Screen name="Dashboard" component={DashBoard} options={{header:()=>null}} />
        <HomeStack.Screen name="Detail" component={DetailPage} 
        options={(props)=>({title:props.route.params[0].name})} />
        <HomeStack.Screen name="Goals" component={GoalPage} options={{header:()=>null}}/>
        <HomeStack.Screen name="Setting" component={SettingPage} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
