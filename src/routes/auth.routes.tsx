import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';

const App = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{headerShown: false}}
    >
      <App.Screen
        name="Home"
        component={Home}
      />
      <App.Screen
        name="Login"
        component={Login}
      />
      <App.Screen
        name="Register"
        component={Register}
      />
    </App.Navigator>
  );
};

export default AuthRoutes;
