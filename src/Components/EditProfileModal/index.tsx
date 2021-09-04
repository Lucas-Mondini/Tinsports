import React, {  useEffect, useState } from 'react';
import { Alert, Dimensions, Modal, View } from 'react-native';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import Input from '../Input';
import Loading from '../Loading';

import {
  ButtonText,
  CancelButton,
  CancelText,
  ChangePasswordText,
  ConfirmButton,
  Footer,
  ModalBackground,
  ModalContainer,
  ModalContent
} from './styles';

type ModalProps = {
  visible: boolean;
  setModal: () => void;
  reloadFunction: () => void;
}

const EditProfileModal: React.FC<ModalProps> = ({visible, setModal, reloadFunction}) =>
{
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  const { user, signOut } = useAuth();
  const [userInfo, setUserInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  async function updateUser() {
    try {
      if (!user) return signOut();

      if (userInfo.newPassword !== userInfo.confirmNewPassword) {
        return Alert.alert("Senhas diferentes", "As senhas que você digitou são diferentes, tente novamente");
      }

      setLoading(true);

      await api.put(`/register/user`, {
        newName: userInfo.name,
        newEmail: userInfo.email,
        newPass: userInfo.newPassword,
        pass: userInfo.password
      }, {headers: {auth_token: user.auth_token}});

      setLoading(false);
      setModal();
      setUserInfo({...userInfo, password: ""});
      reloadFunction();
    } catch (err) {
      setLoading(false);

      if (err.response && err.response.status === 401)
        Alert.alert("Senha incorreta", "Parece que você digitou sua senha incorretamente");
    }
  }

  function enableButton() {
    if ((userInfo.name && userInfo.name.trim() !== '')
        && (userInfo.email && userInfo.email.trim() !== '')
        && (userInfo.password && userInfo.password.trim() !== '')
       )
        {
          setDisableButton(false);
        } else setDisableButton(true);
  }

  useEffect(() => {
    if (visible) enableButton();
  }, [visible, userInfo]);

  return (
    <Modal transparent onRequestClose={setModal} visible={visible} animationType="slide">
      <ModalBackground>
        <ModalContent>
          {loading ? <Loading /> :
            <ModalContainer>
              <Input
                style={{marginLeft: '3%', marginRight: '3%'}}
                label="Nome"
                icon="user"
                size={28}
                value={userInfo.name}
                autoCapitalize="words"
                setValue={value => setUserInfo({...userInfo, name: value})}
              />
              <Input
                style={{marginLeft: '3%', marginRight: '3%'}}
                label="Email"
                value={userInfo.email}
                icon="at"
                size={28}
                setValue={value => setUserInfo({...userInfo, email: value})}
              />

              <Input
                style={{marginLeft: '3%', marginRight: '3%'}}
                label="Sua senha atual"
                value={userInfo.password}
                icon="unlock"
                size={27}
                secureTextEntry
                setValue={value => setUserInfo({...userInfo, password: value})}
              />

              <ChangePasswordText>Mudar senha?</ChangePasswordText>
              <Input
                style={{marginLeft: '3%', marginRight: '3%'}}
                label="Nova senha"
                value={userInfo.newPassword}
                icon="lock"
                size={28}
                secureTextEntry
                setValue={value => setUserInfo({...userInfo, newPassword: value})}
              />
              <Input
                style={{marginLeft: '3%', marginRight: '3%', paddingBottom: 50}}
                label="Confirme a nova senha"
                value={userInfo.confirmNewPassword}
                icon="unlock-alt"
                size={28}
                secureTextEntry
                setValue={value => setUserInfo({...userInfo, confirmNewPassword: value})}
              />

            </ModalContainer>
          }

          <View style={{marginTop: 30}}/>

          <Footer>
            <ConfirmButton
              onPress={updateUser}
              style={{
                backgroundColor: disableButton ? '#686868' : "#2FB400",
                height: Dimensions.get("window").width <= 320 ? 30 : 40,
                width: Dimensions.get("window").width <= 320 ? 130 : 150
              }}
            >
              <ButtonText>Confirmar</ButtonText>
            </ConfirmButton>

            <CancelButton onPress={setModal}>
              <CancelText>Cancelar</CancelText>
            </CancelButton>
          </Footer>
        </ModalContent>
      </ModalBackground>
    </Modal>
  );
}

export default EditProfileModal;