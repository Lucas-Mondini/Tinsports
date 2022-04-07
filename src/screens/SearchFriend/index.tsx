import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { useAuth } from '../../Contexts/Auth';
import { User } from '../../utils/types';

import Header from '../../Components/Header';
import Input from '../../Components/Input';
import UserCard from '../../Components/UserCard';

import { FriendsArea, MainView, SearchArea, SearchFriendText } from './styles';
import { useRequest } from '../../Contexts/Request';

const photo = require('../../../assets/photos/photo.jpg');

const SearchFriend: React.FC = () =>
{
  const {signOut, user} = useAuth();
  const {get} = useRequest();
  const navigation = useNavigation<any>();

  const [name, setName] = useState('');
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState(false);
  const [friendSearchText, setFriendSearchText] = useState("Busque por um amigo");

  async function getUsers()
  {
    setLoading(true);

    try {
      if (!name.trim()) return setFriendSearchText("Busque por um amigo");
      if (!user) return signOut();

      const response = await get(`/register/user/${name}`, setLoading);

      setUsers(response.filter((searchUser: User) => searchUser._id !== user._id));
      setFriendSearchText(response.length > 0 ? "Envie um convite de amizade!" : "Nenhum amigo encontrado");
    } catch (err) {
      navigation.reset({index: 0, routes: [{name: "Main"}]});
    }
  }

  useEffect(() => {
    setTimeout(getUsers, 500);
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
          setValue={text => setName(text.replace(/([&\/\\#^,+()$~%\.'":*?<>\[\]{}!¹@²³£¢¬_`\-=§+ªº´;°|])/g, ""))}
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
                _id={user._id}
                disableButtons={false}
                buttonsType="AddFriend"
                reputation={user.reputation}
                key={user._id}
                user_ID={user._id}
                name={user.name}
                photo={user.photo || photo}
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