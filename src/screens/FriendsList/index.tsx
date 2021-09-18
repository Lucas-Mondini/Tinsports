import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
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
      const response = await api.get(`/friend?_id=${params && params.id ? params.id + "&friendFriends=true" : ""}`,
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
        {loading ? <Loading  styles={{flex: 0, marginTop: 15, marginBottom: 20}}/> :
          <FriendsView>
              {!invites || invites.length === 0
                ?
                <NoContent
                  style={{marginTop:15, marginBottom:20}}
                  text="Você ainda não convites de amizade"/>
                :
                <>
                  <FlatList
                    data={invites}
                    renderItem={({item}: {item: Friend}) => (
                      <FriendCard
                        user_ID={item.user_ID}
                        reloadFunction={getFriends}
                        photo={item.photo || photo}
                        name={item.name}
                        _id={item._id}
                        reputation={item.reputation}
                        invite
                      />)}
                      keyExtractor={invite => invite._id}
                      refreshControl={<RefreshControl refreshing={loading} onRefresh={getFriends}/>}
                  />
                </>
              }
            </FriendsView>
          }
        </>
      }

      <Title>{params && params.id ? `Amigos de ${string}` : "Lista de amigos"}</Title>
      {loading ? <Loading styles={{flex: 0, marginTop: 15, marginBottom: 20}}/> :

          !friends || friends.length === 0
              ?
              <NoContent
                style={{marginTop:15, marginBottom:20}}
                text={
                  params && params.id
                  ? `${string} ainda não possui amigos`
                  :"Você ainda não possui amigos"
                }
              />
              :
              <FlatList
                data={friends}
                renderItem={({item}: {item: Friend}) => (
                  <FriendCard
                    user_ID={item.user_ID}
                    reloadFunction={getFriends}
                    key={item._id}
                    photo={item.photo || photo}
                    name={item.name}
                    _id={item._id}
                    reputation={item.reputation}
                    disableButtons={!params ? false : true}
                  />)}
                  keyExtractor={friend => friend._id}
                  refreshControl={<RefreshControl refreshing={loading} onRefresh={getFriends}/>}
              />
        }

    </Container>
  );

}

export default Friends;