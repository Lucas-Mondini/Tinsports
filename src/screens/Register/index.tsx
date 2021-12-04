import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '../../Components/Loading';
import MessageModal from '../../Components/MessageModal';
import { useAuth } from '../../Contexts/Auth';

import {ButtonView, Container, Input, Label, SignInButton, SignInButtonText} from './styles';

const Register: React.FC = () =>
{
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const {register, loading} = useAuth();
  const [disableButton, setDisableButton] = useState(true);
  const [modal, setModal] = useState<any>();

  async function handleRegister() {
    try {
      await register(name, email, pass, confPass, showModal);
    } catch (err) {
      navigation.navigate("Register");
    }
  }

  function showModal(status: number)
  {
    let modalInfo: any = {message:{title: "Ocorreu um erro",
                                   message: "Ocorreu um erro interno do servidor, sentimos muito. \nTente novamente"}};

    if (status == 400) {
      modalInfo = {message:{title: "E-mail já cadastrado",
                            message: "O e-mail utilizado já foi cadastrado"}};
    } else if (status == 401) {
      modalInfo = {message:{title: "Senhas diferentes",
                            message: "Você digitou senhas diferentes"}};
    }

    setModal(
      <MessageModal
        visible={true}
        loading={loading}
        setModal={() => setModal(null)}
        message={modalInfo.message}
        buttons={modalInfo.buttons}
      />
    );
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

  if (loading) return <Loading />;
  return (
    <Container>
      {modal && modal}
      <ScrollView>
        <Label>Nome</Label>
        <Input
          placeholder="Digite seu nome"
          placeholderTextColor="#b1b1b1"
          value={name}
          autoCapitalize="words"
          onChangeText={setName}/>

        <Label>Email</Label>
        <Input
          placeholder="Digite seu email"
          placeholderTextColor="#b1b1b1"
          value={email}
          onChangeText={setEmail}/>

        <Label>Senha</Label>
        <Input
          placeholder="Digite sua senha"
          placeholderTextColor="#b1b1b1"
          value={pass}
          secureTextEntry={true}
          onChangeText={setPass}/>

        <Label>Confirme sua senha</Label>
        <Input
          placeholder="Digite sua senha novamente"
          placeholderTextColor="#b1b1b1"
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
      </ScrollView>
    </Container>
  );
};

export default Register;
