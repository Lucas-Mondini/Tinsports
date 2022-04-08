import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useRequest } from '../../Contexts/Request';
import { Friend } from '../../utils/types';
import DefaultModal from '../DefaultModal';
import NoContent from '../NoContent';
import UserCard from '../UserCard';
import {
  ButtonText,
  CancelButton,
  CancelText,
  ConfirmButton,
  Footer,
  FriendsView,
  NoFriendsView
} from './styles';

const photo = require('../../../assets/photos/photo.jpg');

type ModalProps = {
  visible: boolean;
  gameId: string;
  setModal: () => void;
  reloadFunction: () => void;
}

const InviteUsersModal: React.FC<ModalProps> = ({visible, gameId, setModal, reloadFunction}) =>
{
  const [loading, setLoading] = useState(false);

  const [friends, setFriends] = useState<Friend[]>([]);
  const {get, post} = useRequest();

  const [inviteList, setInviteList] = useState([] as string[]);

  async function sendInvites()
  {
    try {
      for (const invite of inviteList) {
        await post('/game-list', setLoading, {
          user_ID: invite,
          game_ID: gameId
        });
      }

      setFriends([]);
      reloadFunction();
      setModal();
    } catch (err) {
      setModal();
    }
  }

  async function getFriends()
  {
    try {
      const response = await get(`/friend/gameList/${gameId}`, setLoading);

      setFriends(response);
    } catch(err) {
      setModal();
    }
  }

  useEffect(() => {
    if (visible) getFriends();
  }, [visible]);

  return (
    <DefaultModal loading={loading} setModal={setModal} visible={visible} animationType="fade">
      {friends.length === 0 ?
        <NoFriendsView key={1}>
          <NoContent text="Não há amigos para convidar"/>
        </NoFriendsView> :
        <FriendsView>
          {
            friends.map(friend =>
              <UserCard
                buttonsType="GameInvite"
                usersArray={inviteList}
                setUsersArray={setInviteList}
                key={friend._id}
                name={friend.name}
                photo={friend.photo || photo}
                reputation={friend.reputation}
                user_ID={friend.user_ID}
                _id={friend.user_ID}
                disableButtons={false}
                disableNavigation
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
    </DefaultModal>
  );
}

export default InviteUsersModal;