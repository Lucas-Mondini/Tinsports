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
  invitedUsers: Friend[];
}

type Friend = {
  _id: string;
  name: string;
  reputation: number;
  user_ID: string;
}

type Evaluation = {
  id: string;
  data: {
    user_ID: string;
    paid: boolean;
    participated: boolean;
  }
}

const EvaluationUsersModal: React.FC<ModalProps> = ({visible, gameId, setModal, reloadFunction, invitedUsers}) => {
  const { user, signOut} = useAuth();
  const [evaluationList, setEvaluationList] = useState<Evaluation[]>([]);

  async function sendInvites() {
    console.log(evaluationList[0].id, evaluationList[0].data.participated, evaluationList[0].data.paid);
    console.log(evaluationList[1].id, evaluationList[1].data.participated, evaluationList[1].data.paid);
    /* try {
      if (!user) return signOut();

      for (const invite of evaluationList) {
        await api.post('/game-list/invite', {
          user_ID: invite,
          game_ID: gameId
        }, {headers: {auth_token: user.auth_token}});
      }

      setModal();
      reloadFunction();
    } catch (err) {
      signOut();
    } */
  }

  function fillEvaluationArray() {
    const evaluations = [];
    for (const invited in invitedUsers) {
      const id = invitedUsers[invited].user_ID;

      const user = {
        id,
        data: {
          user_ID: invitedUsers[invited].user_ID,
          paid: false,
          participated: false
        }
      }

      evaluations.push(user);
    }

    setEvaluationList(evaluations);

    if (!visible) return setEvaluationList([]);
  }

  useEffect(() => {
    sendInvites();
  }, [evaluationList]);

  return (
    <Modal transparent onRequestClose={setModal} visible={visible} animationType="fade">
      <ModalBackground>
        <ModalContent>
          <FriendsView>
            {
              invitedUsers.length === 0 ?
              <NoFriendsView key={1}>
                <NoContent text="Não há amigos para convidar"/>
              </NoFriendsView> :
              invitedUsers.map(friend =>
                <UserCard
                  evaluationList={evaluationList}
                  setEvaluationList={setEvaluationList}
                  key={friend._id}
                  name={friend.name}
                  photo={photo}
                  reputation={friend.reputation}
                  user_ID={friend.user_ID}
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

export default EvaluationUsersModal;