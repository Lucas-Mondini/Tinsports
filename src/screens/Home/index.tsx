import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import { useEffect } from 'react';
import {Image, Text} from 'react-native';

import {
  Container,
  SignInButton,
  SignInButtonText,
  RegisterText,
  RegisterButton,
  RegisterButtonText,
} from './styles';

// TODO: turn into a ES6 import
const heroImg = require('../../../assets/images/hero.png');

const Home: React.FC = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loading,setLoading] = useState(true);

  async function checkIfIsLoggedIn() {
    const user = await AsyncStorage.getItem('user');
    if(user) {
      const {auth_token} = JSON.parse(user);
      if(auth_token) navigation.navigate('Main');
    }

    setLoading(false);
  }

  const handleSignIn = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const handleRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  useEffect(() =>{
    checkIfIsLoggedIn();
    setLoading(false);
  }, [isFocused]);

  if(loading) return <Text>Carregando...</Text>

  return (
    <Container>
      <Image source={heroImg} />
      <SignInButton activeOpacity={0.8} onPress={handleSignIn}>
        <SignInButtonText>Entrar</SignInButtonText>
      </SignInButton>

      <RegisterText>Não tem conta?</RegisterText>
      <RegisterButton activeOpacity={0.6} onPress={handleRegister}>
        <RegisterButtonText>Inscreva-se</RegisterButtonText>
      </RegisterButton>
    </Container>
  );
};

export default Home;
