import React, { useState } from 'react';
import { Text } from 'react-native';

import {ButtonView, Container, Input, Label, SignInButton, SignInButtonText} from './styles';

//const [email, setEmail] = useState('');
//const [password, setPassword] = useState('');

const Login: React.FC = () => {
  return (

    <Container>
      <Label>Email</Label>
      <Input placeholder="Digite seu email" />{/* value={email} onChangeText={setEmail}/> */}

      <Label>Senha</Label>
      <Input placeholder="Digite sua senha" />{/* value={password} onChangeText={setPassword}/> */}
      
      <ButtonView>
        <SignInButton>
          <SignInButtonText>Entrar</SignInButtonText>
        </SignInButton>
      </ButtonView>
    </Container>
    
  );
};

export default Login;
