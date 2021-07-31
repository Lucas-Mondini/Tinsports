import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
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
  invitedUsers: Friend[];
}

type Friend = {
  _id: string;
  name: string;
  reputation: number;
  user_ID: string;
}

type Evaluation = {
  user_ID: string;
  paid: boolean;
  participated: boolean;
}

const EvaluationUsersModal: React.FC<ModalProps> = ({visible, gameId, setModal, invitedUsers}) => {
  const {user, signOut} = useAuth();
  const navigation = useNavigation();
  const [evaluationList, setEvaluationList] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendEvaluations() {
    try {
      setLoading(true);
      if (!user) return signOut();

      for (const evaluation of evaluationList) {
        await api.post('/register/user/update-reputation', {
          user_ID: evaluation.user_ID,
          paid: evaluation.paid,
          participated: evaluation.participated
        }, {headers: {auth_token: user.auth_token}});
      }

      await api.post(`/games/${gameId}/delete`, {
        host_ID: user._id
      }, {headers: {auth_token: user.auth_token}});

      setLoading(false);
      setModal();

      navigation.reset({index: 0, routes: [{name: "Main"}]});
    } catch (err) {
      navigation.reset({index: 0, routes: [{name: "Main"}, {name: "Profile"}]});
    }
  }

  function fillEvaluationArray() {
    const evaluations = [];
    for (const invited in invitedUsers) {
      const user = {
        user_ID: invitedUsers[invited].user_ID,
        paid: false,
        participated: false
      }

      evaluations.push(user);
    }

    setEvaluationList(evaluations);

    if (!visible) return setEvaluationList([]);
  }

  useEffect(() => {
    if (visible) fillEvaluationArray();
  }, [visible])

  return (
    <Modal transparent onRequestClose={setModal} visible={visible} animationType="fade">
      <ModalBackground>
        <ModalContent>
          {loading ? <Loading background="#f6f6f6"/> :
          <FriendsView>
            {
              invitedUsers.length === 0 ?
              <NoFriendsView key={1}>
                <NoContent text="Não há jogadores para avaliar"/>
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
          </FriendsView>}

          <Footer>
            <ConfirmButton onPress={sendEvaluations}>
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