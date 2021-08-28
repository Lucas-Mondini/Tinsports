import React, { useEffect, useState } from 'react';
import { Dimensions, Modal } from 'react-native';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import { Friend, GameList } from '../../utils/types';
import Loading from '../Loading';
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
}

const InviteUsersModal: React.FC<ModalProps> = ({visible, gameId, setModal, reloadFunction}) => {
  const [loading, setLoading] = useState(false);

  const [friends, setFriends] = useState<Friend[]>([]);
  const { user, signOut} = useAuth();

  const [inviteList, setInviteList] = useState([] as string[]);

  async function sendInvites() {
    setLoading(true);

    try {
      if (!user) return signOut();

      for (const invite of inviteList) {
        await api.post('/game-list', {
          user_ID: invite,
          game_ID: gameId
        }, {headers: {auth_token: user.auth_token}});
      }

      setFriends([]);
      setLoading(false);
      setModal();
      reloadFunction();
    } catch (err) {
      setModal();
    }
  }

  async function getFriends() {
    setLoading(true);

    if (!user) return signOut();

    try {
      const response = await api.get(`/friend/gameList/${gameId}`,
        {headers: {auth_token: user.auth_token}});

      setFriends(response.data);
      setLoading(false);
    } catch(err) {
      setModal();
    }
  }

  useEffect(() => {
    if (visible) getFriends();
  }, [visible]);

  return (
    <Modal transparent onRequestClose={setModal} visible={visible} animationType="fade">
      <ModalBackground>
        <ModalContent>
          {loading ? <Loading styles={{backgroundColor: "#f6f6f6"}}/> :
            friends.length === 0 ?
            <NoFriendsView key={1}>
              <NoContent text="Não há amigos para convidar"/>
            </NoFriendsView> :
            <FriendsView>
              {
                friends.map(friend =>
                  <UserCard
                    inviteList={inviteList}
                    setInviteList={setInviteList}
                    key={friend._id}
                    name={friend.name}
                    photo={photo}
                    reputation={friend.reputation}
                    user_ID={friend.user_ID}
                  />)
              }
            </FriendsView>
          }

          <Footer>
            <ConfirmButton
              onPress={sendInvites}
              style={{
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

export default InviteUsersModal;