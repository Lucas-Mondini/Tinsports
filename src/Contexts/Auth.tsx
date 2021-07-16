import AsyncStorage from '@react-native-community/async-storage';

import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import api from '../services/api';

type AuthData = {
  signed: boolean;
  user: User | null;
  signIn: (email: string, pass: string) => void;
  register: (name: string, email: string, pass: string, confPass: string) => void;
  signOut(): void;
  checkLogin(): void;
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

  const [user, setUser] = useState<User | null>(null);

  async function checkLogin() {
    const userData = await AsyncStorage.getItem('user');
    if(userData) {
      setUser(JSON.parse(userData));
    }
  }

  async function signIn(email: string, pass: string) {
    const response = await api.post(`/login`,{
      email, pass
    });

    setUser(response.data);
    await AsyncStorage.setItem("user", JSON.stringify(response.data));
  }

  async function register(name: string, email: string, pass: string, confPass: string) {
    const response = await api.post(`/register/user`,{
      name, email, pass, confPass
    });

    setUser(response.data);
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
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