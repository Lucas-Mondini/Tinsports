import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import api from '../../services/api';

import {ButtonView, Container, Input, Label, SignInButton, SignInButtonText} from './styles';

const Register: React.FC = () => {

  const navigation = useNavigation();

  const [name, setName] = useState('jdascgas@gmail.com');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');

  const handleSignIn = useCallback(() =>{

    api.post(`/register/user`,{
      name, email, pass, confPass
    }).then(response => {
      console.log(response);

      navigation.navigate('Main');
    }).catch(err => console.log(err));

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
        <SignInButton onPress={handleSignIn}>
          <SignInButtonText>Registrar</SignInButtonText>
        </SignInButton>
      </ButtonView>

    </Container>
  )
};

export default Register;
