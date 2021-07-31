import React, {  useEffect, useState } from 'react';
import { Alert, Modal } from 'react-native';
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

const photo = require('../../../assets/photos/photo.jpg');

type ModalProps = {
  visible: boolean;
  setModal: () => void;
  reloadFunction: () => void;
}

const EditProfileModal: React.FC<ModalProps> = ({visible, setModal, reloadFunction}) => {
  const [loading, setLoading] = useState(false);
  const [footerVisible, setFooterVisible] = useState(true);
  const [disableButton, setDisableButton] = useState(true);

  const { user, signOut } = useAuth();
  const [userInfo, setUserInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  function setFooter() {
    setFooterVisible(!footerVisible);
  }

  async function updateUser() {
    try {
      if (!user) return signOut();

      if (userInfo.newPassword !== userInfo.confirmNewPassword) {
        return Alert.alert("Senhas diferentes", "As senhas que você digitou são diferentes, tente novamente");
      }

      setFooter();
      setLoading(true);

      await api.put(`/register/user/${user._id}`, {
        newName: userInfo.name,
        newEmail: userInfo.email,
        newPass: userInfo.newPassword,
        pass: userInfo.password
      }, {headers: {auth_token: user.auth_token}});

      setLoading(false);
      setFooter();
      setModal();
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
                callback={setFooter}
                autoCapitalize="words"
                setValue={value => setUserInfo({...userInfo, name: value})}
              />
              <Input
                style={{marginLeft: '3%', marginRight: '3%'}}
                label="Email"
                value={userInfo.email}
                icon="at"
                size={28}
                callback={setFooter}
                setValue={value => setUserInfo({...userInfo, email: value})}
              />

              <ChangePasswordText>Mudar senha?</ChangePasswordText>
              <Input
                style={{marginLeft: '3%', marginRight: '3%'}}
                label="Sua senha atual"
                value={userInfo.password}
                icon="unlock"
                size={27}
                secureTextEntry
                callback={setFooter}
                setValue={value => setUserInfo({...userInfo, password: value})}
              />
              <Input
                style={{marginLeft: '3%', marginRight: '3%'}}
                label="Nova senha"
                value={userInfo.newPassword}
                icon="lock"
                size={28}
                secureTextEntry
                callback={setFooter}
                setValue={value => setUserInfo({...userInfo, newPassword: value})}
              />
              <Input
                style={{marginLeft: '3%', marginRight: '3%', paddingBottom: 50}}
                label="Confirme a nova senha"
                value={userInfo.confirmNewPassword}
                icon="unlock-alt"
                size={28}
                secureTextEntry
                callback={setFooter}
                setValue={value => setUserInfo({...userInfo, confirmNewPassword: value})}
              />

            </ModalContainer>
          }

          {footerVisible &&
            <Footer>
              <ConfirmButton
                onPress={updateUser}
                style={{backgroundColor: disableButton ? '#686868' : "#2FB400"}}
              >
                <ButtonText>Confirmar</ButtonText>
              </ConfirmButton>

              <CancelButton onPress={setModal}>
                <CancelText>Cancelar</CancelText>
              </CancelButton>
            </Footer>}
        </ModalContent>
      </ModalBackground>
    </Modal>
  );
}

export default EditProfileModal;