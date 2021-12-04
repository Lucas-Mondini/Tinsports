import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import EditProfileModal from '../../Components/EditProfileModal';
import Header from '../../Components/Header';
import Loading from '../../Components/Loading';
import Metric from '../../Components/Metric';
import Option from '../../Components/Option';
import UserPhotoModal from '../../Components/UserPhotoModal';
import { useAuth } from '../../Contexts/Auth';
import { useRequest } from '../../Contexts/Request';
import { getFirstName } from '../../utils/functions';
import { Params, User } from '../../utils/types';
import {
  Container,
  EditProfileButton,
  MetricText,
  UserImage,
  UserImageContainer,
  UserInfo,
  UserName
} from './styles';

const photo = require('../../../assets/photos/photo.jpg');

const Profile: React.FC = () =>
{
  const { user, signOut, checkLogin, setString, string } = useAuth();
  const {get} = useRequest();

  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const route = useRoute();
  const params = route.params as Params;

  const [ friend, setFriend ] = useState<User>();
  const [ modalVisible, setModalVisible ] = useState(false);
  const [ photoModal, setPhotoModal ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  function handleGoToFriendsList()
  {
    if (!params) navigation.navigate('FriendsList');
    else navigation.push('FriendsList', {id: params.id});
  }

  function handleGoToInvitesList()
  {
    navigation.navigate('InviteList');
  }

  function setModal()
  {
    setModalVisible(!modalVisible);
  }

  function setUserPhotoModal()
  {
    setPhotoModal(!photoModal);
  }

  async function getUser()
  {
    if (params) setLoading(true);

    try {
      if (params) {
        const response = await get(`/user/${params.id}`, setLoading);

        setFriend(response);
        setString(getFirstName(response.name));
      } else checkLogin();
    } catch (err) {
      navigation.reset({index: 0, routes: [{name: "Main"}, {name: "Profile"}]});
    }
  }

  function goToFriendHome()
  {
    navigation.push("Main", {id: params.id});
  }

  useEffect(() => {
    if (isFocused) getUser();
  }, [isFocused]);

  if(!user) return null;
  if(loading) return <Loading />;
  return (
    <Container>
      <Header visible={!modalVisible}/>

      <UserInfo>
        <UserImageContainer>
          <UserImage source={!params ? (user.photo ? {uri: user.photo} : photo) : (friend?.photo ? {uri: friend?.photo} : photo)}/>
          {!friend && <EditProfileButton onPress={setUserPhotoModal}>
            <Icon name="pen" size={23} color="#686868"/>
          </EditProfileButton>}
        </UserImageContainer>

        <UserName style={!friend ? {} : {marginTop: 20}}>{friend ? friend.name : user.name}</UserName>

        <MetricText>Reputação</MetricText>
        <Metric reputation={params && friend ? friend.reputation : user.reputation} size={70}/>

        <Option
          text={!friend ? "Lista de amigos" : `Amigos de ${getFirstName(string)}`}
          icon={{name: "user-friends", size: 28}}
          actions={handleGoToFriendsList}
        />

        {!friend &&
          <Option
            text="Convites de jogos"
            icon={{name: "baseball-ball", size: 28}}
            actions={handleGoToInvitesList}
          />
        }

        {!friend ?
          <Option
            text="Editar perfil"
            icon={{name: "user-edit", size: 28}}
            actions={setModal}
          /> :
          <Option
            text={`Jogos de ${getFirstName(string)}`}
            icon={{name: "baseball-ball", size: 28}}
            actions={goToFriendHome}
          />
        }

        {!friend && <>
          <EditProfileModal
            reloadFunction={getUser}
            visible={modalVisible}
            setModal={setModal}
          />
          <Option
            text="Sair"
            icon={{name: "exit", size: 35, ionicons: true}}
            actions={signOut}
          />
        </>}

        {!friend &&
          <UserPhotoModal
            reloadFunction={getUser}
            visible={photoModal}
            setModal={setUserPhotoModal}
          />}

        <View style={{marginBottom: 20}}/>
      </UserInfo>
    </Container>
  );
}

export default Profile;