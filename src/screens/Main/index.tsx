import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import GameCard from "../../Components/GameCard";
import Loading from "../../Components/Loading";
import NoContent from "../../Components/NoContent";
import { useAuth } from "../../Contexts/Auth";
import api from "../../services/api";

import {
  BottomNavbar,
  Container, GameContainer, Games, GameTitle, GameTitleContainer, TopImage
} from "./styles";

const goal = require('../../../assets/images/goal.png');
const AddButton = require('../../../assets/images/RoundButton.png');

type Game = {
  _id: string;
  host_ID: string;
  date: string;
  location: string;
  name: string;
  type: string;
  hour: string;
  finished: boolean;
}

const Main: React.FC = () => {

  const [userGames, setUserGames] = useState<Game[]>();
  const [friendsGames, setFriendsGames] = useState<Game[]>();
  const [invitedGames, setInvitedGames] = useState<Game[]>();
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {signOut, user} = useAuth();

  async function getGames() {
    setLoading(true);

    if(!user) {
      signOut();
      return;
    }

    try{
      const result = await api.get(`/games/home/${user._id}`, {
        headers: {auth_token: user.auth_token}
      });

      setUserGames(result.data.userGames);
      setInvitedGames(result.data.invitedGames);
      setFriendsGames(result.data.friendsGames);
      setLoading(false);
    } catch(err){
      signOut();
      setLoading(false);
    }
  }

  const handleNavigateToCreateEvent = useCallback(() => {
    navigation.navigate('CreateEvent');
  }, [navigation]);

  const handleNavigateToProfile = useCallback(() => {
    navigation.navigate('Profile');
  }, [navigation]);

  const navigateToSearchFriends = useCallback(() => {
    navigation.navigate('SearchFriend');
  }, [navigation]);

  useEffect(() => {
    if (isFocused) getGames();
  }, [isFocused]);

  function mapGames(games: Game[]) {
    return (<>
      {
        games.map(game => (
          <View key={game._id}>
            <GameCard
              host_ID={game.host_ID}
              setGames={() => {
                setLoading(true);
              }}
              _id={game._id}
              title={game.name}
              location={game.location}
              time={game.hour}
              finished={game.finished}
            />
          </View>
        ))
      }
    </>)
  }

  return (
    <Container>
      <Games>
        <TopImage>
          <Image source={goal}/>
        </TopImage>
        <GameContainer>
          <GameTitleContainer>
            <GameTitle>Jogos marcados por amigos</GameTitle>
          </GameTitleContainer>

          {
            loading ? <Loading /> :
            friendsGames && friendsGames.length > 0 ? mapGames(friendsGames) : <NoContent text="Seus amigos anda não criaram nenhum jogo" />
          }

        </GameContainer>

        <GameContainer>
          <GameTitleContainer>
            <GameTitle>Seus Jogos</GameTitle>
          </GameTitleContainer>

          {
            loading ? <Loading /> :
            userGames && userGames.length > 0 ? mapGames(userGames) : <NoContent text="Você ainda não criou nenhum jogo" />
          }
        </GameContainer>

        <GameContainer>
          <GameTitleContainer>
            <GameTitle>Convites de jogos</GameTitle>
          </GameTitleContainer>

            {
              loading ? <Loading /> :
              invitedGames && invitedGames.length > 0 ? mapGames(invitedGames) : <NoContent text="Você ainda não foi convidado para nenhum jogo" />
            }

          </GameContainer>
      </Games>

      <BottomNavbar>
        <View>
          <TouchableOpacity onPress={signOut}>
            <Icon name="gear" size={35} color="#686868"/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity disabled>
            <Icon2 name="crown" size={43} color="#686868"/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleNavigateToCreateEvent}>
            <Image source={AddButton} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={navigateToSearchFriends}>
            <Icon name="search" size={43} color="#686868"/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleNavigateToProfile}>
            <Icon name="user" size={35} color="#686868"/>
          </TouchableOpacity>
        </View>
      </BottomNavbar>
    </Container>
  );
}

export default Main;