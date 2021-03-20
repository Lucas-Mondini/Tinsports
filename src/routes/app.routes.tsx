import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';

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
        options={{headerTitle: 'Entrar'}}
      />
      <App.Screen
        name="Register"
        component={Register}
        options={{headerTitle: 'Registrar'}}
      />
    </App.Navigator>
  );
};

export default AppRoutes;
