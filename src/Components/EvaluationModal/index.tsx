import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Modal } from 'react-native';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import { Evaluation, GameList } from '../../utils/types';
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
  NoFriendsView
} from './styles';

const photo = require('../../../assets/photos/photo.jpg');

type ModalProps = {
  visible: boolean;
  gameId: string;
  setModal: () => void;
  reloadFunction: () => void;
  invitedUsers: GameList[];
}

const EvaluationUsersModal: React.FC<ModalProps> = ({visible, gameId, setModal, invitedUsers}) => {
  const {user, signOut} = useAuth();
  const navigation = useNavigation();
  const [evaluationList, setEvaluationList] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(false);

  function sendEvaluations() {
    Alert.alert("Avaliar usuários?", "Essa ação não poderá ser revertida",[{
      text: "Sim",
      onPress: async () => {

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
    }, {text: "Não"}]);
  }

  function fillEvaluationArray() {
    const evaluations = [];
    for (const invited of invitedUsers) {
      const user = {
        user_ID: invited.user_ID,
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
          {loading ? <Loading styles={{backgroundColor: "#f6f6f6"}}/> :
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
                />
              )
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