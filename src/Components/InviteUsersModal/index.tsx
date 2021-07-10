import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack/lib/typescript/src/types';
import React, { useEffect, useState } from 'react';
import { Modal, Text } from 'react-native';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import UserCard from './components/UserCard';
import { ButtonText, CancelButton, CancelText, ConfirmButton, Footer, FriendsView, ModalBackground, ModalContent } from './styles';

const photo = require('../../../assets/photos/photo.jpg');

type ModalProps = {
  visible: boolean;
  gameId: string;
  setModal: () => void;
  reloadFunction: () => void;
}

type Friend = {
  _id: string;
  name: string;
}

const InviteUsersModal: React.FC<ModalProps> = ({visible, gameId, setModal, reloadFunction}) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, signOut} = useAuth();
  const [inviteList, setInviteList] = useState([] as string[]);

  async function sendInvites() {
    const invites = new Array();
    try {

      if (!user) return signOut();

      for (const invite of inviteList) {
        await api.post('/games/invite', {
          user_ID: invite,
          game_ID: gameId
        }, {headers: {auth_token: user.auth_token}});
      }

      setFriends(invites);
      setModal();
      reloadFunction();
    } catch (err) {
      signOut();
    }
  }

  async function getFriends() {
    setLoading(true);

    if (!user) return signOut();

    try {
      const response = await api.get(`/friend/${user._id}`, {headers: {auth_token: user.auth_token}});

      setFriends(response.data.friends);
      setLoading(false);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getFriends();
  }, [visible]);

  if (loading) return <Text>Carregando...</Text>

  return (
    <Modal transparent visible={visible} animationType="fade">
      <ModalBackground>
        <ModalContent>
          <FriendsView>
            { friends
              ? friends.map(friend => <UserCard
                                        inviteList={inviteList}
                                        setInviteList={setInviteList}
                                        key={friend._id}
                                        name={friend.name}
                                        photo={photo}
                                        user_ID={friend._id}/>)
              : <Text>Você ainda não possui amigos</Text>
            }
          </FriendsView>

          <Footer>
            <ConfirmButton onPress={sendInvites}>
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

export default InviteUsersModal