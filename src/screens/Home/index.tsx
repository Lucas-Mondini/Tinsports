import {useNavigation} from '@react-navigation/core';
import React, {useCallback} from 'react';
import {Image} from 'react-native';

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

  const handleSignIn = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const handleRegister = useCallback(() => {
    navigation.navigate('Register');
  }, [navigation]);

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
