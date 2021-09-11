import AsyncStorage from '@react-native-community/async-storage';

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import api from '../services/api';
import { User } from '../utils/types';

type AuthData = {
  signed: boolean;
  user: User | null;
  loading: boolean;
  setLoading: (value: boolean) => void;
  signIn: (email: string, pass: string) => void;
  register: (name: string, email: string, pass: string, confPass: string) => void;
  signOut: () => void;
  checkLogin: () => void;
  string: string;
  setString: (value: string) => void;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthData);

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) =>
{
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [string, setString] = useState('');

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
      return signOut();
    }
  }

  async function signIn(email: string, pass: string) {
    try {
      setLoading(true);

      const response = await api.post(`/login`,{
        email, pass
      });

      setUser(response.data);
      await AsyncStorage.setItem("user", JSON.stringify(response.data));

      setLoading(false);
    } catch (err) {
      signOut();
      setLoading(false);
    }
  }

  async function register(name: string, email: string, pass: string, confPass: string) {
    try {
      setLoading(true);

      if (pass !== confPass) {
        setLoading(false);
        return Alert.alert("Senhas diferentes", "A senha e a confirmação de senha são diferentes");
      }

      const response = await api.post(`/register/user`,{
        name, email, pass, confPass
      });

      setUser(response.data);
      await AsyncStorage.setItem('user', JSON.stringify(response.data));

      setLoading(false);
    } catch (err: any) {
      signOut();
      setLoading(false);

      if (err.response.data.status == 400) {
        Alert.alert("E-mail já cadastrado", "O e-mail utilizado já foi cadastrado");
      } else if (err.response.data.status) {
        Alert.alert("Senhas diferente", "As senhas digitadas não são iguais");
      } else Alert.alert("Ocorreu um erro", "Ocorreu um erro interno do servidor, sentimos muito. Tente novamente");
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.clear();
    return;
  }

  useEffect(() => {
    checkLogin();
  }, []);

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
      string,
      setString
    }}>
      {children}
    </AuthContext.Provider>
  );

}

export const useAuth = ()=> {
  return useContext(AuthContext);
};