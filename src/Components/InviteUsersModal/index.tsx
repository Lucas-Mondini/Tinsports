import React, { useEffect, useState } from 'react';
import { Modal } from 'react-native';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import NoContent from '../NoContent';
import UserCard from './components/UserCard';
import {
  ButtonText,
  CancelButton,
  CancelText,
  ConfirmButton,
  Footer,
  FriendsView,
  ModalBackground,
  ModalContent,
  NoFriendsText,
  NoFriendsView
} from './styles';

const photo = require('../../../assets/photos/photo.jpg');

type ModalProps = {
  visible: boolean;
  gameId: string;
  setModal: () => void;
  reloadFunction: () => void;
  setLoading: (value: boolean) => void;
}

type Friend = {
  _id: string;
  name: string;
  reputation: number;
  user_ID: string;
}

const InviteUsersModal: React.FC<ModalProps> = ({setLoading, visible, gameId, setModal, reloadFunction}) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const { user, signOut} = useAuth();
  const [inviteList, setInviteList] = useState([] as string[]);

  async function sendInvites() {
    setModal();
    try {
      if (!user) return signOut();

      for (const invite of inviteList) {
        await api.post('/game-list/invite', {
          user_ID: invite,
          game_ID: gameId
        }, {headers: {auth_token: user.auth_token}});
      }

      setFriends([]);
      reloadFunction();
    } catch (err) {
      signOut();
    }
  }

  async function getFriends() {
    if (!user) return signOut();

    try {
      const response = await api.get(`/friend/${user._id}`, {headers: {auth_token: user.auth_token}});

      setFriends(response.data.friends);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getFriends();
  }, [visible]);

  return (
    <Modal transparent onRequestClose={setModal} visible={visible} animationType="fade">
      <ModalBackground>
        <ModalContent>
          <FriendsView>
            {
              friends.length === 0 ?
              <NoFriendsView key={1}>
                <NoContent text="Não há amigos para convidar"/>
              </NoFriendsView> :
              friends.map(friend =>
                <UserCard
                  inviteList={inviteList}
                  setInviteList={setInviteList}
                  key={friend._id}
                  name={friend.name}
                  photo={photo}
                  reputation={friend.reputation}
                  user_ID={friend._id}
                />)
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

export default InviteUsersModal;