import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Text } from 'react-native';

import {ButtonView, Container, Input, Label, SignInButton, SignInButtonText} from './styles';

//const [email, setEmail] = useState('');
//const [password, setPassword] = useState('');

const Login: React.FC = () => {

  const navigation = useNavigation();

  const handleSignIn = useCallback(() =>{
    navigation.navigate('Main');
  },[navigation]);

  return (

    <Container>
      <Label>Email</Label>
      <Input placeholder="Digite seu email" />{/* value={email} onChangeText={setEmail}/> */}

      <Label>Senha</Label>
      <Input placeholder="Digite sua senha" />{/* value={password} onChangeText={setPassword}/> */}
      
      <ButtonView>
        <SignInButton onPress={handleSignIn}>
          <SignInButtonText>Entrar</SignInButtonText>
        </SignInButton>
      </ButtonView>
    </Container>
    
  );
};

export default Login;
