import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import { formatName } from '../../utils/functions';

import {ButtonView, Container, Input, Label, SignInButton, SignInButtonText} from './styles';

const Register: React.FC = () => {

  const [name, setName] = useState('jdascgas@gmail.com');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const {register} = useAuth();

  function formatUserName(userName: string){
    formatName(userName, setName);
  }

  const handleRegister = useCallback(async () =>{
    register(name, email, pass, confPass);
  },[]);

  return (

    <Container>
      <Label>Nome</Label>
      <Input
        placeholder="Digite seu nome"
        value={name}
        onChangeText={formatUserName}/>

      <Label>Email</Label>
      <Input
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}/>

      <Label>Senha</Label>
      <Input
        placeholder="Digite sua senha"
        value={pass}
        secureTextEntry={true}
        onChangeText={setPass}/>

      <Label>Confirme sua senha</Label>
      <Input
        placeholder="Digite sua senha novamente"
        value={confPass}
        secureTextEntry={true}
        onChangeText={setConfPass}/>

      <ButtonView>
        <SignInButton onPress={handleRegister}>
          <SignInButtonText>Registrar</SignInButtonText>
        </SignInButton>
      </ButtonView>

    </Container>
  )
};

export default Register;
