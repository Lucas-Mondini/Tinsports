import {useNavigation} from '@react-navigation/core';
import { useIsFocused } from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import { useEffect } from 'react';
import {Image} from 'react-native';
import Loading from '../../Components/Loading';
import { useAuth } from '../../Contexts/Auth';

import {
  Container,
  SignInButton,
  SignInButtonText,
  RegisterText,
  RegisterButton,
  RegisterButtonText
} from './styles';

const heroImg = require('../../../assets/images/hero.png');

const Home: React.FC = () => {
  const navigation = useNavigation();
  const {loading} = useAuth();

  const handleSignIn = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const handleRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

  if (loading) return <Loading background="#dbd9ff" />;

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
