import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import Header from '../../Components/Header';
import InviteCard from '../../Components/InviteCard';
import Loading from '../../Components/Loading';
import MessageModal from '../../Components/MessageModal';
import NoContent from '../../Components/NoContent';
import { useAuth } from '../../Contexts/Auth';
import { useRequest } from '../../Contexts/Request';
import { Invite, Params } from '../../utils/types';
import { Container, FriendsView, Title } from './styles';

const InviteList: React.FC = () => {
  const params = useRoute().params as Params;
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  const { user, signOut } = useAuth();
  const { get, post, destroy } = useRequest();

  const [invites, setInvites] = useState<Invite[]>([]);
  const [modal, setModal] = useState<any>();

  async function getInvites() {
    setLoading(true);

    if (!user) return signOut();

    try {
      const response = await get(`/game-list/invite`, setLoading);

      setInvites(response);
      setLoading(false);
    } catch(err: any) {
      navigation.reset({index: 0, routes: [{name: "Main"}, {name: "Profile"}]});
    }
  }

  function showModal(type: "Confirm" | "Delete", inviteId: string)
  {
    let modalInfo: any;

    modalInfo = {"Confirm" : {message:{title: "Confirmar participação",
                              message: "Deseja realmente confirmar sua participação nesse jogo?"},
                              buttons: [
                                {text: "Sim", color: "green", function: async () => {
                                    try {
                                      await post(`/game-list/invite-confirmation`, getInvites, {_id: inviteId});
                                      setModal(null);
                                    } catch (error) {
                                      setModal(null);
                                      navigation.reset({index: 0, routes: [{name: "Main"}]});
                                    }
                                }},
                                {text: "Não", color: "red", function: () => setModal(null)},
                              ]},
                "Delete": {message:{title: "Excluir o convite",
                          message: "Deseja realmente excluir esse convite de jogo?"},
                          buttons: [
                            {text: "Sim", color: "green", function: async () => {
                              try {
                                await destroy(`/game-list/${inviteId}`, getInvites);
                                setModal(null);
                              } catch (error: any) {
                                setModal(null);
                                navigation.reset({index: 0, routes: [{name: "Main"}]});
                              }
                            }},
                            {text: "Não", color: "red", function: () => setModal(null)},
                          ]}};

    setModal(
      <MessageModal
        visible={true}
        loading={loading}
        setModal={() => setModal(null)}
        message={modalInfo[type].message}
        buttons={modalInfo[type].buttons}
      />
    )
  }

  useEffect(() => {
    if (isFocused) getInvites();
  }, [isFocused]);

  return (
    <Container>
      <Header />

      {modal && modal}

      <View style={{marginTop: 35}} />
      {!params &&
      <>
        <Title>Convites de jogos</Title>
        {loading ? <Loading /> :
          <FriendsView refreshControl={<RefreshControl refreshing={loading} onRefresh={getInvites}/>}>
              {!invites || invites.length === 0 ? <NoContent style={{marginTop: "45%"}} text="Você não possui convites de jogos"/> :
                <>
                  {invites.map(invite => (
                    <InviteCard
                      key={invite._id}
                      _id={invite._id}
                      host_ID={invite.host_ID}
                      game_ID={invite.game_ID}
                      hostName={invite.hostName}
                      gameName={invite.gameName}
                      deleteInvite={() => showModal("Delete", invite._id)}
                      confirmInvite={() => showModal("Confirm", invite._id)}
                      date={invite.date}
                      hour={invite.hour}
                      location={invite.location}
                    />
                  ))}
                </>
              }
            </FriendsView>
          }
        </>
      }
    </Container>
  );

}

export default InviteList;