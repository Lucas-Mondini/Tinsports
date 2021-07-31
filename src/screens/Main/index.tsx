import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import GameCard from "../../Components/GameCard";
import Header from "../../Components/Header";
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

type Params = {
  id: string;
}

const Main: React.FC = () => {
  const params = useRoute().params as Params;
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [userGames, setUserGames] = useState<Game[]>();
  const [friendsGames, setFriendsGames] = useState<Game[]>();
  const [invitedGames, setInvitedGames] = useState<Game[]>();
  const {signOut, user, string} = useAuth();

  async function getGames() {
    setLoading(true);

    if(!user) return signOut();

    try{
      const result = await api.get(`/games/home/${params && params.id ? params.id + "?friendGames=true" : user._id}`, {
        headers: {auth_token: user.auth_token}
      });

      if (!params) {
        setInvitedGames(result.data.invitedGames);
        setFriendsGames(result.data.friendsGames);
      }

      setUserGames(result.data.userGames);
      setLoading(false);
    } catch(err) {
      setLoading(false);
      navigation.reset({index: 0, routes: [{name: "Main"}]});
    }
  }

  function handleNavigateToCreateEvent() {
    navigation.navigate('CreateEvent');
  }

  function handleNavigateToProfile() {
    navigation.navigate('Profile');
  }

  function navigateToSearchFriends() {
    navigation.navigate('SearchFriend');
  }

  function handleNavigateToConfiguration() {
    Alert.alert("Não disponível", "A Função de configurações não está disponível na beta");
  }

  function handleNavigateToPremium() {
    Alert.alert("Não disponível", "Assinatura Premium não está disponível na beta");
  }

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
              setGames={getGames}
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
      {params && params.id && <Header />}
      <Games>
        <TopImage>
          <Image source={goal}/>
        </TopImage>

        {!params &&
          <GameContainer>
            <GameTitleContainer>
              <GameTitle>Jogos marcados por amigos</GameTitle>
            </GameTitleContainer>

            {
              loading ? <Loading /> :
              friendsGames && friendsGames.length > 0 ? mapGames(friendsGames) : <NoContent text="Seus amigos anda não criaram nenhum jogo" />
            }

          </GameContainer>
        }

        <GameContainer>
          <GameTitleContainer>
            <GameTitle>{!params ? "Seus Jogos" : `Jogos de ${string}`}</GameTitle>
          </GameTitleContainer>

          {
            loading ? <Loading /> :
            userGames && userGames.length > 0 ? mapGames(userGames) : <NoContent text={!params
                                                                                        ? "Você ainda não criou nenhum jogo"
                                                                                        : `${string} ainda não criou nenhum jogo`
                                                                                      } />
          }
        </GameContainer>

        {!params &&
          <GameContainer>
            <GameTitleContainer>
              <GameTitle>Convites de jogos</GameTitle>
            </GameTitleContainer>

              {
                loading ? <Loading /> :
                invitedGames && invitedGames.length > 0 ? mapGames(invitedGames) : <NoContent text="Você ainda não tem convites de jogos" />
              }

          </GameContainer>
        }
      </Games>

      {!params &&
        <BottomNavbar>
          <View>
            <TouchableOpacity onPress={handleNavigateToConfiguration}>
              <Icon name="gear" size={35} color="#686868"/>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={handleNavigateToPremium}>
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
      }
    </Container>
  );
}

export default Main;