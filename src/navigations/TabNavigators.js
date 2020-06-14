import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IconType} from '../constants/AppConstants';
import Home from '../screens/Home';
import TabBarButton from '../components/Shared/TabBarButton';
import StartScan from '../screens/StartScan';
import History from '../screens/History';
import {View} from 'react-native';
import IconComponent from '../components/Shared/IconComponent';
import {Colors} from '../constants/ThemeConstants';
import {BarcodeStack, HistoryStack} from './StackNavigators';
import ComingSoon from '../screens/ComingSoon';
import DetailsPage from '../screens/DetailsPage';

const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({})}
      //   tabBar={props => <TabBarButton {...props} />}
      tabBarOptions={{
        activeTintColor: Colors.red,
        inactiveTintColor: Colors.themeBlack,
        keyboardHidesTabBar: true,
        showLabel: false,
      }}>
      <Tab.Screen
        name="History"
        component={HistoryStack}
        options={{
          tabBarIcon: ({color, focused}) => (
            <IconComponent
              color={color}
              size={20}
              type={IconType.MaterialCommunityIcons}
              name="history"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Fine"
        component={BarcodeStack}
        options={{
          tabBarIcon: ({color, focused}) => (
            <IconComponent
              color={color}
              size={20}
              type={IconType.AntDesign}
              name="search1"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={DetailsPage}
        options={{
          tabBarIcon: ({color, focused}) => (
            <IconComponent
              color={color}
              size={20}
              type={IconType.AntDesign}
              name="bulb1"
            />
          ),
        }}
      />
      <Tab.Screen
        name="General"
        component={ComingSoon}
        options={{
          tabBarIcon: ({color, focused}) => (
            <IconComponent
              color={color}
              size={20}
              type={IconType.AntDesign}
              name="bulb1"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export {HomeTabNavigator};
