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
import { Provider } from 'react-redux'
import {store } from './src/redux/store'

import DashBoard from './src/DashBoard';
import ReduxPage from './src/screens/redux/ReduxPage';
import GoalPage from './src/screens/goals/GoalPage'
import SettingPage from './src/SettingPage';
import TestRedux from './src/screens/redux/TextRedux'

const HomeStack = createNativeStackNavigator();

const App=()=>{
  return (
    <Provider store={store}>
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
        <HomeStack.Screen name="TestRedux" component={TestRedux} />
        <HomeStack.Screen name="ReduxPage" component={ReduxPage} 
              // options={(props)=>({title:props.route.params[0].name})}
               />
        <HomeStack.Screen name="Goals" component={GoalPage} options={{header:()=>null}}/>
        <HomeStack.Screen name="Setting" component={SettingPage} />
      </HomeStack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

export default App;
