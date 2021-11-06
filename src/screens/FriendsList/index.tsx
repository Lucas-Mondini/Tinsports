import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import UserCard from '../../Components/UserCard';
import Header from '../../Components/Header';
import Loading from '../../Components/Loading';
import NoContent from '../../Components/NoContent';
import Tab from '../../Components/Tab';
import { useAuth } from '../../Contexts/Auth';
import { Friend, Params } from '../../utils/types';
import { Container, FriendsView, Title } from './styles';
import { useRequest } from '../../Contexts/Request';

const photo = require('../../../assets/photos/photo.jpg');

const Friends: React.FC = () =>
{
  const { string } = useAuth();
  const { get } = useRequest();

  const params = useRoute().params as Params;
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"friends" | "invite">("friends");
  const navigation = useNavigation<any>();

  const [friends, setFriends] = useState<Friend[]>([]);
  const [invites, setInvites] = useState<Friend[]>([]);

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
        component = <NoContent
                      style={{marginTop:15, marginBottom:20}}
                      text={text}
                    />
      } else {
        component = (
          <>
            <FlatList
              data={data}
              renderItem={({item}: {item: Friend}) => (
                <UserCard
                  buttonsType={invite ? "Invite" : "DeleteFriend"}
                  user_ID={item.user_ID}
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