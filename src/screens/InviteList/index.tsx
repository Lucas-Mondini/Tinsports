import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import Header from '../../Components/Header';
import InviteCard from '../../Components/InviteCard';
import Loading from '../../Components/Loading';
import GenericMessageModal from '../../Components/GenericMessageModal';
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

  async function confirmGameInvite(inviteId: string)
  {
    try {
      await post(`/game-list/invite-confirmation`, getInvites, {_id: inviteId});
      setModal(null);
    } catch (error) {
      setModal(null);
      navigation.reset({index: 0, routes: [{name: "Main"}]});
    }
  }

  async function deleteGameInvite(inviteId: string)
  {
    try {
      await destroy(`/game-list/${inviteId}`, getInvites);
      setModal(null);
    } catch (error: any) {
      setModal(null);
      navigation.reset({index: 0, routes: [{name: "Main"}]});
    }
  }

  function showModal(type: any, inviteId: string)
  {
    let functions: any;

    switch (type) {
      case "ConfirmGameInvite":
        functions = [() => confirmGameInvite(inviteId), () => setModal(null)]
        break;
      case "DeleteGameInvite":
        functions = [() => deleteGameInvite(inviteId), () => setModal(null)]
        break;
    }

    setModal(
      <GenericMessageModal
        setModal={() => setModal(null)}
        type={type}
        functions={functions}
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
                      deleteInvite={() => showModal("DeleteGameInvite", invite._id)}
                      confirmInvite={() => showModal("ConfirmGameInvite", invite._id)}
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