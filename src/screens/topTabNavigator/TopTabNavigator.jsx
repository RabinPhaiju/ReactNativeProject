import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ImagePage from './ImagePage';
import VideoPage from './VideoPage';
import AudioPage from './AudioPage';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Image" component={ImagePage} />
      <Tab.Screen name="Video" component={VideoPage} />
      <Tab.Screen name="Audio" component={AudioPage} />
    </Tab.Navigator>
  );
}

export default TopTabNavigator