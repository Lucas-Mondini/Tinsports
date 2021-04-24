import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';

import {ButtonView, Container, Input, Label, SignInButton, SignInButtonText} from './styles';

const Login: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleSignIn = useCallback(() =>{
    navigation.navigate('Main');
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
        value={password} 
        onChangeText={setPassword}/>
      
      <ButtonView>
        <SignInButton onPress={handleSignIn}>
          <SignInButtonText>Entrar</SignInButtonText>
        </SignInButton>
      </ButtonView>
    </Container>
    
  );
};

export default Login;
