import React, { useEffect, useState } from 'react';
import Loading from '../../Components/Loading';
import { useAuth } from '../../Contexts/Auth';

import {ButtonView, Container, Input, Label, SignInButton, SignInButtonText} from './styles';

const Register: React.FC = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const {register, loading} = useAuth();
  const [disableButton, setDisableButton] = useState(true);

  async function handleRegister() {
    await register(name, email, pass, confPass);
  }

  function enableButton() {
    if ((email && email.trim() !== '')
        && (name && name.trim() !== '')
        && (pass && pass.trim() !== '')
        && (confPass && confPass.trim() !== '')
       )
        {
          setDisableButton(false);
        } else setDisableButton(true);
  }

  useEffect(() => {
    enableButton();
  }, [name, email, pass, confPass]);

  function loadPage() {
    if (loading) return <Loading />
    else {
      return (
        <Container>
          <Label>Nome</Label>
          <Input
            placeholder="Digite seu nome"
            value={name}
            autoCapitalize="words"
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
            <SignInButton
              onPress={handleRegister}
              disabled={disableButton}
              style={{backgroundColor: disableButton ? '#686868' : "#007e33"}}
            >
              <SignInButtonText>Registrar</SignInButtonText>
            </SignInButton>
          </ButtonView>
        </Container>
      );
    }
  }

  return loadPage();
};

export default Register;
