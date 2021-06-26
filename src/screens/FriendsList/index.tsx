import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import EvaluationCard from '../../Components/EvaluationCard';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import { Container, FriendsView, Title } from './styles';

const photo = require('../../../assets/photos/photo.jpg');

type Friend = {
  _id: string;
  user_ID: string;
  friend_ID: string;
  name: string;
}

const Friends: React.FC = () => {

  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const { user, signOut} = useAuth();


  async function getFriends() {
    setLoading(true);

    if (!user) return signOut();

    try {
      const response = await api.get(`/friend/${user._id}`, {headers: {auth_token: user.auth_token}});

      setFriends(response.data.friends);
      setLoading(false);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getFriends();
  }, [isFocused]);

  if (loading) return <Text>Carregando...</Text>
  if (!friends) return <Text>Você ainda não possui amigos</Text>

  return (
    <Container>
      <FriendsView>

        <Title>Lista de amigos</Title>

        <View>

          {friends.map(friend => (
            <EvaluationCard photo={photo} name={friend.name} participated={true} paid={false}/>
          ))}

        </View>

      </FriendsView>
    </Container>
  );

}

export default Friends;