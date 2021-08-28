import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import Header from '../../Components/Header';
import InviteCard from '../../Components/InviteCard';
import Loading from '../../Components/Loading';
import NoContent from '../../Components/NoContent';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import { Invite, Params } from '../../utils/types';
import { Container, FriendsView, Title } from './styles';

const InviteList: React.FC = () => {
  const params = useRoute().params as Params;
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  const [invites, setInvites] = useState<Invite[]>([]);
  const { user, signOut } = useAuth();

  async function getInvites() {
    setLoading(true);

    if (!user) return signOut();

    try {
      const response = await api.get(`/game-list/invite`,
        {headers: {auth_token: user.auth_token}});

      setInvites(response.data);
      setLoading(false);
    } catch(err) {
      navigation.reset({index: 0, routes: [{name: "Main"}, {name: "Profile"}]});
    }
  }

  useEffect(() => {
    if (isFocused) getInvites();
  }, [isFocused]);

  return (
    <Container>
      <Header />
      <View style={{marginTop: 35}} />
      {!params &&
      <>
        <Title>Convites de jogos</Title>
        {loading ? <Loading /> :
          <FriendsView refreshControl={<RefreshControl refreshing={loading} onRefresh={getInvites}/>}>
              {!invites || invites.length === 0 ? <NoContent text="Você não possui convites de jogos"/> :
                <>
                  {invites.map(invite => (
                    <InviteCard
                      key={invite._id}
                      _id={invite._id}
                      host_ID={invite.host_ID}
                      game_ID={invite.game_ID}
                      hostName={invite.hostName}
                      gameName={invite.gameName}
                      reloadFunction={getInvites}
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