import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Main from '../screens/Main';
import GameInfo from '../screens/GameInfo';
import CreateEvent from '../screens/CreateEvent';
import Profile from '../screens/Profile';
import Evaluation from '../screens/Evaluation';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator>
      <App.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <App.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <App.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <App.Screen 
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <App.Screen 
        name="GameInfo"
        component={GameInfo}
        options={{headerShown: false}}
      />
      <App.Screen 
        name="CreateEvent"
        component={CreateEvent}
        options={{headerShown: false}}
      />
      <App.Screen 
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <App.Screen 
        name="Evaluation"
        component={Evaluation}
        options={{headerShown: false}}
      />
    </App.Navigator>
  );
};

export default AppRoutes;
