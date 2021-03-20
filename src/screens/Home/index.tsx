import React from 'react';
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
  return (
    <Container>
      <Image source={heroImg} />
      <SignInButton activeOpacity={0.8}>
        <SignInButtonText>Entrar</SignInButtonText>
      </SignInButton>

      <RegisterText>Não tem conta?</RegisterText>
      <RegisterButton activeOpacity={0.6}>
        <RegisterButtonText>Inscreva-se</RegisterButtonText>
      </RegisterButton>
    </Container>
  );
};

export default Home;
