import React, { useEffect, useState } from 'react';
import { Modal, Text } from 'react-native';
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
  invitedUsers: Friend[];
}

type Friend = {
  _id: string;
  name: string;
  reputation: number;
  user_ID: string;
}

const InviteUsersModal: React.FC<ModalProps> = ({visible, gameId, setModal, reloadFunction, invitedUsers}) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const { user, signOut} = useAuth();
  const [inviteList, setInviteList] = useState([] as string[]);

  async function sendInvites() {
    try {
      if (!user) return signOut();

      for (const invite of inviteList) {
        await api.post('/game-list/invite', {
          user_ID: invite,
          game_ID: gameId
        }, {headers: {auth_token: user.auth_token}});
      }

      setFriends([]);
      setModal();
      reloadFunction();
    } catch (err) {
      signOut();
    }
  }

  async function getFriends() {
    if (!user) return signOut();

    try {
      const response = await api.get(`/friend/${user._id}`, {headers: {auth_token: user.auth_token}});

      let filterUsers = new Array();

      if (invitedUsers.length > 0) {
        for (const invited of invitedUsers) {
          filterUsers = response.data.friends.filter((friend: Friend) => friend._id !== invited.user_ID);
        }

        setFriends(filterUsers);
      } else {
        setFriends(response.data.friends);
      }
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
              friends.map(friend =>
                !friend
                ? <NoFriendsView key={1}>
                    <NoContent text="Não há amigos para convidar"/>
                  </NoFriendsView>
                : <UserCard
                    inviteList={inviteList}
                    setInviteList={setInviteList}
                    key={friend._id}
                    name={friend.name}
                    photo={photo}
                    reputation={friend.reputation}
                    user_ID={friend._id}/>)
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