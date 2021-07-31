import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Main from '../screens/Main';
import GameInfo from '../screens/GameInfo';
import CreateEvent from '../screens/CreateEvent';
import Profile from '../screens/Profile';
import SearchFriend from '../screens/SearchFriend';
import FriendsList from '../screens/FriendsList';
import InviteList from '../screens/InviteList';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{headerShown: false}}
    >
      <App.Screen
        name="Main"
        component={Main}
      />
      <App.Screen
        name="GameInfo"
        component={GameInfo}
      />
      <App.Screen
        name="CreateEvent"
        component={CreateEvent}
      />
      <App.Screen
        name="Profile"
        component={Profile}
      />
      <App.Screen
        name="SearchFriend"
        component={SearchFriend}
      />
      <App.Screen
        name="FriendsList"
        component={FriendsList}
      />
      <App.Screen
        name="InviteList"
        component={InviteList}
      />
    </App.Navigator>
  );
};

export default AppRoutes;
