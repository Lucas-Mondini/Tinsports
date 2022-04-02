import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Main from '../screens/Main';
import GameInfo from '../screens/GameInfo';
import CreateEvent from '../screens/CreateEvent';
import Profile from '../screens/Profile';
import SearchFriend from '../screens/SearchFriend';
import FriendsList from '../screens/FriendsList';
import InviteList from '../screens/InviteList';
import Premium from '../screens/Premium';
import { useAuth } from "../Contexts/Auth";

const Drawer = createDrawerNavigator();
const App = createStackNavigator();

const SignOutButton: React.FC = () =>
{
  const {signOut} = useAuth();

  useEffect(() => {
    signOut();
  });

  return null;
}

const Home: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Main}
        options={{
          drawerItemStyle: {height: 0}
        }}
      />
      <Drawer.Screen
        name="Sair"
        component={SignOutButton}
      />
    </Drawer.Navigator>
  );
}

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{headerShown: false}}
    >
      <App.Screen
        name="Main"
        component={Home}
      />
      <App.Screen
        name="UserMain"
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
      <App.Screen
        name="Premium"
        component={Premium}
      />
    </App.Navigator>
  );
};

export default AppRoutes;
