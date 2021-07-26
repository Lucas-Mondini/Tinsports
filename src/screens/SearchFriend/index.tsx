import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import Input from '../../Components/Input';
import Loading from '../../Components/Loading';
import UserCard from '../../Components/UserCard';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import { formatName } from '../../utils/functions';
import { FriendsArea, MainView, SearchArea, SearchFriendText } from './styles';

const photo = require('../../../assets/photos/photo.jpg');

type User = {
  _id: string;
  name: string;
  email: string;
  reputation: number;
}

const SearchFriend: React.FC = () => {
  const { signOut, user } = useAuth();
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
      signOut();
    }
  }

  useEffect(() => {
    getUsers();
  }, [name]);

  return (
    <MainView>
      <SearchArea>
        <Input label="Buscar por um amigo" value={name} icon="search" size={25} setValue={text => formatName(text, setName)}/>
      </SearchArea>
      <FriendsArea>
        <SearchFriendText>{friendSearchText}</SearchFriendText>

        {!loading
        &&
          users?.map(user => {
            return (
              <UserCard reputation={user.reputation} key={user._id} id={user._id} name={user.name} photo={photo} addFriend />
            )
          })
        }

      </FriendsArea>
    </MainView>
  );
}

export default SearchFriend;