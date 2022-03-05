import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';
import UserCard from '../../Components/UserCard';
import Header from '../../Components/Header';
import Loading from '../../Components/Loading';
import NoContent from '../../Components/NoContent';
import Tab from '../../Components/Tab';
import { useAuth } from '../../Contexts/Auth';
import { Friend, Params } from '../../utils/types';
import { Container, FriendsView, Title } from './styles';
import { useRequest } from '../../Contexts/Request';
import GenericMessageModal from '../../Components/GenericMessageModal';

const photo = require('../../../assets/photos/photo.jpg');

const Friends: React.FC = () =>
{
  const { string } = useAuth();
  const { get, destroy } = useRequest();

  const params = useRoute().params as Params;
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"friends" | "invite">("friends");
  const navigation = useNavigation<any>();

  const [friends, setFriends] = useState<Friend[]>([]);
  const [invites, setInvites] = useState<Friend[]>([]);
  const [modal, setModal] = useState<any>(null);

  async function getFriends()
  {
    try {
      const response = await get(`/friend?_id=${params && params.id ? params.id + "&friendFriends=true" : ""}`, setLoading);

      setFriends(response.friends);
      setInvites(response.friendInvites);
    } catch(err) {
      navigation.reset({index: 0, routes: [{name: "Main"}, {name: "Profile"}]});
    }
  }

  async function handleDeleteFriend(friendId?: string)
  {
    try {
      await destroy(`/friend/${friendId}`, getFriends);
      setModal(null);
    } catch (error) {
      navigation.reset({index: 0, routes: [{name: "Main"}, {name: "Profile"}]});
      setModal(null);
    }
  }

  function showModal(type: any, friendId?: string)
  {
    let functions: any;

    switch (type) {
      case "DeleteFriendInvite":
        functions = [() => handleDeleteFriend(friendId), () => setModal(null)];
        break;
      case "DeleteFriend":
        functions = [() => handleDeleteFriend(friendId), () => setModal(null)];
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

  function renderLists(data: Friend[], params: Params, invite: boolean = false)
  {
    let component, title = "", text = "";

    if (loading) {
      component = <Loading
                    styles={{flex: 0, marginTop: 15, marginBottom: 20}}
                  />
    } else {
      if (!params) {
        title = invite ? "Convites de amizade" : "Lista de amigos";
        text = "Você ainda não possui \nconvites de amizade";
      } else if (params && params.id) {
        title = `Amigos de ${string}`
        text = `${string} ainda não \npossui amigos`;
      } else {
        text = "Você ainda não \npossui amigos";
      }

      if (!data || data.length === 0) {
        component = <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={getFriends}/>}>
                      <NoContent
                        style={{marginTop:"40%", marginBottom:20}}
                        text={text}
                      />
                    </ScrollView>
      } else {
        component = (
          <>
            <FlatList
              data={data}
              renderItem={({item}: {item: Friend}) => (
                <UserCard
                  buttonsType={invite ? "Invite" : "DeleteFriend"}
                  user_ID={item.user_ID}
                  callback={() => showModal(invite ? "DeleteFriendInvite" : "DeleteFriend", item._id)}
                  reloadFunction={getFriends}
                  photo={item.photo || photo}
                  name={item.name}
                  _id={item._id}
                  reputation={item.reputation}
                  disableButtons={params ? true : false}
                />)}
                keyExtractor={invite => invite._id}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={getFriends}/>}
            />
          </>
        );
      }
    }

    return (
      <>
        <Title>{title}</Title>
        <FriendsView>{component}</FriendsView>
      </>
    );
  }

  function renderTab()
  {
    if (tab === "friends") return renderLists(friends, params);
    else if (tab === "invite" && !params) return renderLists(invites, params, true);
  }

  useEffect(() => {
    if (isFocused) getFriends();
  }, [isFocused]);

  return (
    <Container>
      <Header />

      {modal && modal}

      {!params && <Tab
        setState={setTab}
        options={[
          {title: "Amigos", state: "friends"},
          {title: "Convites", state: "invite"}
        ]}
      />}

      <View style={{marginTop: 35}} />
      {renderTab()}
    </Container>
  );
}

export default Friends;