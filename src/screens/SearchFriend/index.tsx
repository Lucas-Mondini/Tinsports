import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import { useAuth } from '../../Contexts/Auth';
import { User } from '../../utils/types';

import Header from '../../Components/Header';
import Input from '../../Components/Input';
import UserCard from '../../Components/UserCard';

import { FriendsArea, MainView, SearchArea, SearchFriendText } from './styles';

const photo = require('../../../assets/photos/photo.jpg');

const SearchFriend: React.FC = () => {
  const { signOut, user } = useAuth();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState(false);
  const [friendSearchText, setFriendSearchText] = useState("Busque por um amigo");

  async function getUsers() {
    setLoading(true);

    try {
      if (!name.trim()) return setFriendSearchText("Busque por um amigo");
      if (!user) return signOut();

      const response = await api.get(`/register/user/${name}`, {headers: {auth_token: user.auth_token}});

      setUsers(response.data.filter((searchUser: User) => searchUser._id !== user._id));
      setLoading(false);
      setFriendSearchText("Envie um convite de amizade!");

      if (users && users.length === 0) return setFriendSearchText("Nenhum amigo encontrado");
    } catch (err) {
      navigation.reset({index: 0, routes: [{name: "Main"}, {name: "Profile"}]});
    }
  }

  useEffect(() => {
    getUsers();
  }, [name]);

  return (
    <MainView>
      <Header />

      <SearchArea>
        <Input
          label="Buscar por um amigo"
          value={name}
          icon="search"
          size={25}
          autoCapitalize="words"
          setValue={setName}
          style={{flex: 1}}
        />
      </SearchArea>
      <FriendsArea>
        <SearchFriendText>{friendSearchText}</SearchFriendText>

        {!loading
        &&
          users?.map(user => {
            return (
              <UserCard
                reputation={user.reputation}
                key={user._id}
                id={user._id}
                name={user.name}
                photo={user.photo || photo}
                addFriend
                reloadFunction={getUsers}
              />
            )
          })
        }

      </FriendsArea>
    </MainView>
  );
}

export default SearchFriend;