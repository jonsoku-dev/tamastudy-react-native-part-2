import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import MyInfoScreen from './screens/MyInfoScreen';
import MapScreen from './screens/MapScreen';

import * as Icons from './components/icons';

const Tab = createBottomTabNavigator();

const setOptions = (Icon: any) => {
  return {
    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
      <Icon color={color} size={size} />
    ),
  };
};

const MyTabs = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#00c300',
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={setOptions(Icons.HomeIcon)}
    />
    <Tab.Screen
      name="Map"
      component={MapScreen}
      options={setOptions(Icons.MapIcon)}
    />
    <Tab.Screen
      name="MyInfo"
      component={MyInfoScreen}
      options={setOptions(Icons.MyInfoIcon)}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};

export default App;
