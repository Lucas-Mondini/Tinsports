import AsyncStorage from '@react-native-community/async-storage';

import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
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
  getUserInfo: () => void;
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
    setLoading(true);

    const userData = await AsyncStorage.getItem('user');
    if(userData) {
      setUser(JSON.parse(userData));
    }

    setLoading(false);
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

  async function getUserInfo() {
    try {
      if (!user) return signOut();

      let response = await api.get(`/user/${user._id}`, {headers: {auth_token: user.auth_token}});

      setUser(response.data);
    } catch(err) {
      return signOut();
    }
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
      register,
      getUserInfo
    }}>
      {children}
    </AuthContext.Provider>
  );

}

export const useAuth = ()=> {
  return useContext(AuthContext);
};