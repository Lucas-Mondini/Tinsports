import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';

import {ButtonView, Container, Input, Label, SignInButton, SignInButtonText} from './styles';

const Login: React.FC = () => {

  const [email, setEmail] = useState('jdascga@gmail.com');
  const [pass, setPass] = useState('123456');
  const {signIn} = useAuth();

  const isFocused = useIsFocused();

  const handleSignIn = useCallback(async () =>{
    signIn(email, pass);
  },[]);

  return (

    <Container>
      <Label>Email</Label>
      <Input
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}/>

      <Label>Senha</Label>
      <Input
        placeholder="Digite sua senha"
        secureTextEntry={true}
        value={pass}
        onChangeText={setPass}/>

      <ButtonView>
        <SignInButton onPress={handleSignIn}>
          <SignInButtonText>Entrar</SignInButtonText>
        </SignInButton>
      </ButtonView>
    </Container>

  );
};

export default Login;
