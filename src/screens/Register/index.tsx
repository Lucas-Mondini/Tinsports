import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';

import {ButtonView, Container, Input, Label, SignInButton, SignInButtonText} from './styles';

const Register: React.FC = () => {

  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  function register(){
    console.log({
      name,
      email, 
      password,
      confirmPass
    })
  }

  const handleSignIn = useCallback(() =>{
    navigation.navigate('Main');
  },[navigation]);


  return (
  
    <Container>
      <Label>Nome</Label>
      <Input 
        placeholder="Digite seu nome" 
        value={name}
        onChangeText={setName}/>

      <Label>Email</Label>
      <Input 
        placeholder="Digite seu email" 
        value={email}
        onChangeText={setEmail}/>

      <Label>Senha</Label>
      <Input 
        placeholder="Digite sua senha" 
        value={password} 
        secureTextEntry={true}
        onChangeText={setPassword}/>

      <Label>Confirme sua senha</Label>
      <Input 
        placeholder="Digite sua senha novamente" 
        value={confirmPass} 
        secureTextEntry={true}
        onChangeText={setConfirmPass}/>
      
      <ButtonView>
        <SignInButton onPress={handleSignIn}>
          <SignInButtonText>Registrar</SignInButtonText>
        </SignInButton>
      </ButtonView>

    </Container>
  )
};

export default Register;
