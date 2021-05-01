import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import api from '../../services/api';

import {ButtonView, Container, Input, Label, SignInButton, SignInButtonText} from './styles';

const Login: React.FC = () => {

  const [email, setEmail] = useState('jdascga@gmail.com');
  const [pass, setPass] = useState('123456');

  const navigation = useNavigation();

  const handleSignIn = useCallback(() =>{

    api.post(`/login`,{
      email, pass
    }).then(async response => {
      await AsyncStorage.setItem("auth_token", response.data.auth_token);

      navigation.navigate('Main');
    }).catch(err => console.log(err));

  },[navigation]);

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
