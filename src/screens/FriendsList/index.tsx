import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import FriendCard from '../../Components/FriendCard';
import Header from '../../Components/Header';
import Loading from '../../Components/Loading';
import NoContent from '../../Components/NoContent';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import { Friend, Params } from '../../utils/types';
import { Container, FriendsView, Title } from './styles';

const photo = require('../../../assets/photos/photo.jpg');

const Friends: React.FC = () => {
  const params = useRoute().params as Params;
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  const [friends, setFriends] = useState<Friend[]>([]);
  const [invites, setInvites] = useState<Friend[]>([]);
  const { user, signOut, string } = useAuth();

  async function getFriends() {
    setLoading(true);

    if (!user) return signOut();

    try {
      const response = await api.get(`/friend/${params && params.id ? params.id + "?friendFriends=true" : user._id}`,
        {headers: {auth_token: user.auth_token}});

      setFriends(response.data.friends);
      setInvites(response.data.friendInvites);
      setLoading(false);
    } catch(err) {
      navigation.reset({index: 0, routes: [{name: "Main"}, {name: "Profile"}]});
    }
  }

  useEffect(() => {
    if (isFocused) getFriends();
  }, [isFocused]);

  return (
    <Container>
      <Header />
      <View style={{marginTop: 35}} />
      {!params &&
      <>
        <Title>Convites de amizade</Title>
        {loading ? <Loading /> :
          <FriendsView>
              {!invites || invites.length === 0 ? <NoContent text="Você ainda não convites de amizade"/> :
                <>
                  {invites.map(invite => (
                    <FriendCard
                      user_ID={invite.user_ID}
                      reloadFunction={getFriends}
                      key={invite._id}
                      photo={photo}
                      name={invite.name}
                      _id={invite._id}
                      reputation={invite.reputation}
                      invite
                    />
                  ))}
                </>
              }
            </FriendsView>
          }
        </>
      }

      <Title>{params && params.id ? `Amigos de ${string}` : "Lista de amigos"}</Title>
      {loading ? <Loading /> :
        <FriendsView>
            {!friends || friends.length === 0 ? <NoContent text={
                                                              params && params.id
                                                              ? `${string} ainda não possui amigos`
                                                              :"Você ainda não possui amigos"}/> :
              <>
                {friends.map(friend => (
                  <FriendCard
                    user_ID={friend.user_ID}
                    reloadFunction={getFriends}
                    key={friend._id}
                    photo={photo}
                    name={friend.name}
                    _id={friend._id}
                    reputation={friend.reputation}
                    disableButtons={!params ? false : true}
                  />
                ))}
              </>
            }
          </FriendsView>
        }

    </Container>
  );

}

export default Friends;