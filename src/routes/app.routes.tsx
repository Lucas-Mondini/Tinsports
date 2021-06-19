import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Main from '../screens/Main';
import GameInfo from '../screens/GameInfo';
import CreateEvent from '../screens/CreateEvent';
import Profile from '../screens/Profile';
import Evaluation from '../screens/Evaluation';

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
        name="Evaluation"
        component={Evaluation}
      />
    </App.Navigator>
  );
};

export default AppRoutes;
