import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import AboutPage from './AboutPage'
import SettingPage from './SettingPage'
import HomePage from './screens/HomePage'
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabNavigator = createBottomTabNavigator()

const DashBoard = () => {
    return(
        <TabNavigator.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if(route.name =='Home'){
                    iconName = "home";
                    size = focused?25:20;
                } else if(route.name =='About'){
                    iconName = "information-circle-outline";
                    size = focused?25:20;
                }else if(route.name =='Setting'){
                    iconName = "settings";
                    size = focused?25:20;
                }
                return <Ionicons name={iconName} size={size} color={color} />;
                
            },
            tabBarActiveBackgroundColor:'#ddd',
            tabBarInactiveBackgroundColor:'#ddd'
        })}
        >
        <TabNavigator.Screen name="Home" component={HomePage} options={{header:()=>null}}/>
        <TabNavigator.Screen name="About" component={AboutPage} />
        <TabNavigator.Screen name="Setting" component={SettingPage} options={{tabBarBadge:2}} />
        </TabNavigator.Navigator>
    )
}

export default DashBoard