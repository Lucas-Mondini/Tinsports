import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';

import {ButtonView, Container, Input, Label, SignInButton, SignInButtonText} from './styles';

const Register: React.FC = () => {

  const navigation = useNavigation();

  const handleSignIn = useCallback(() =>{
    navigation.navigate('Main');
  },[navigation]);


  return (
  
    <Container>
      <Label>Nome</Label>
      <Input placeholder="Digite seu nome" value="Jão da massa"/>{/* value={email} onChangeText={setEmail}/> */}

      <Label>Email</Label>
      <Input placeholder="Digite seu email" value="jao@gamil.com"/>{/* value={password} onChangeText={setPassword}/> */}

      <Label>Senha</Label>
      <Input placeholder="Digite sua senha" value="123456789" secureTextEntry={true}/>{/* value={password} onChangeText={setPassword}/> */}

      <Label>Confirme sua senha</Label>
      <Input placeholder="Digite sua senha novamente" value="123456789" secureTextEntry={true}/>{/* value={password} onChangeText={setPassword}/> */}
      
      <ButtonView>
        <SignInButton onPress={handleSignIn}>
          <SignInButtonText>Registrar</SignInButtonText>
        </SignInButton>
      </ButtonView>

    </Container>
  )
};

export default Register;
