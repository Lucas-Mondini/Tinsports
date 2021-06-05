import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';

const App = createStackNavigator();

const AuthRoutes: React.FC = () => {
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
    </App.Navigator>
  );
};

export default AuthRoutes;
