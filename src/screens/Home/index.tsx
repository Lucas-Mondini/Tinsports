import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, Text} from 'react-native';
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

  function handleSignIn() {
    navigation.navigate('Login');
  }

  function handleRegister() {
    navigation.navigate('Register');
  }

  if (loading) return <Loading background="#dbd9ff" />;

  return (
    <Container>
      <Text style={{
        fontFamily: "Poppins-regular",
        fontSize: 50,
        color: "#6c1cc7",
        position: "absolute",
        top: "50%",
        left: "60%",
        transform: [{rotate: "-20deg"}]
      }}>Beta</Text>
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
