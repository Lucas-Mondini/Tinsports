import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useRequest } from '../../Contexts/Request';
import { Evaluation, GameList } from '../../utils/types';
import DefaultModal from '../DefaultModal';
import MessageModal from '../MessageModal';
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
  invitedUsers: GameList[];
}

const EvaluationUsersModal: React.FC<ModalProps> = ({visible, gameId, setModal, invitedUsers}) =>
{
  const {post, destroy} = useRequest();

  const navigation = useNavigation();
  const [evaluationList, setEvaluationList] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(false);
  const [messageModal, setMessageModal] = useState<any>();

  function sendEvaluations()
  {
    let modalInfo: any = {message:{title: "Avaliar usuários?",
                                   message: "Essa ação não poderá ser revertida"},
                          buttons: [
                            {text: "Sim", color: "green", function: async () => {
                                try {
                                  for (const evaluation of evaluationList) {
                                    await post('/register/user/update-reputation', setLoading,{
                                      user_ID: evaluation.user_ID,
                                      paid: evaluation.paid,
                                      participated: evaluation.participated
                                    });
                                  }

                                  await destroy(`/games/${gameId}`, setModal, setLoading);

                                  setMessageModal(null);
                                  navigation.reset({index: 0, routes: [{name: "Main"}]});
                                } catch (error) {
                                  setMessageModal(null);
                                  navigation.reset({index: 0, routes: [{name: "Main"}]});
                                }
                            }},
                            {text: "Não", color: "red", function: () => setMessageModal(null)},
                          ]};

    setMessageModal(
      <MessageModal
        visible={true}
        loading={loading}
        setModal={() => setMessageModal(null)}
        message={modalInfo.message}
        buttons={modalInfo.buttons}
      />
    );
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
  }, [visible]);

  return (
    <DefaultModal loading={loading} setModal={setModal} visible={visible} animationType="fade">

      {messageModal && messageModal}

      <FriendsView>
        {
          invitedUsers.length === 0 ?
          <NoFriendsView key={1}>
            <NoContent text="Não há jogadores para avaliar"/>
          </NoFriendsView> :
          invitedUsers.map(friend =>
            <UserCard
              buttonsType="Evaluation"
              _id=""
              disableButtons={false}
              usersArray={evaluationList}
              setUsersArray={setEvaluationList}
              key={friend._id}
              name={friend.name}
              photo={friend.photo || photo}
              reputation={friend.reputation}
              user_ID={friend.user_ID}
              disableNavigation
            />
          )
        }
      </FriendsView>

      <Footer>
        <ConfirmButton onPress={sendEvaluations}>
          <ButtonText>Confirmar</ButtonText>
        </ConfirmButton>

        <CancelButton onPress={setModal}>
          <CancelText>Cancelar</CancelText>
        </CancelButton>
      </Footer>
    </DefaultModal>
  );
}

export default EvaluationUsersModal;