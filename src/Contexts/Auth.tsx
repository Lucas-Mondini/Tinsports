import AsyncStorage from '@react-native-community/async-storage';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import api from '../services/api';

type AuthData = {
  signed: boolean;
  user: User | null;
  loading: boolean;
  setLoading: (value: boolean) => void;
  signIn: (email: string, pass: string) => void;
  register: (name: string, email: string, pass: string, confPass: string) => void;
  signOut: () => void;
  checkLogin: () => void;
}

export type User = {
  name: string;
  email: string;
  _id: string;
  auth_token: string;
  reputation: number;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthData);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) =>{

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  async function checkLogin() {
    try {
      setLoading(true);

      const userData = await AsyncStorage.getItem('user');
      if(userData) {
        const userJson = JSON.parse(userData);

        let response = await api.get(`/user/${userJson._id}`, {headers: {auth_token: userJson.auth_token}});

        setUser({...response.data, auth_token: userJson.auth_token});
    }

      setLoading(false);
    } catch(err) {
      console.log(err.result.data);
    }
  }

  async function signIn(email: string, pass: string) {
    setLoading(true);

    const response = await api.post(`/login`,{
      email, pass
    });

    setUser(response.data);
    await AsyncStorage.setItem("user", JSON.stringify(response.data));

    setLoading(false);
  }

  async function register(name: string, email: string, pass: string, confPass: string) {
    setLoading(true);

    const response = await api.post(`/register/user`,{
      name, email, pass, confPass
    });

    setUser(response.data);
    await AsyncStorage.setItem('user', JSON.stringify(response.data));

    setLoading(false);
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.clear();
    return;
  }

  useEffect(() =>{
    checkLogin();
  },[]);

  return (
    <AuthContext.Provider value={{
      signed: Boolean(user),
      user,
      loading,
      setLoading,
      signIn,
      signOut,
      checkLogin,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );

}

export const useAuth = ()=> {
  return useContext(AuthContext);
};