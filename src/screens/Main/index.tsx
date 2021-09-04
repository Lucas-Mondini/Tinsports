import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Image, TouchableOpacity, View, RefreshControl, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/FontAwesome5";
import GameCard from "../../Components/GameCard";
import Header from "../../Components/Header";
import Loading from "../../Components/Loading";
import NoContent from "../../Components/NoContent";
import { useAuth } from "../../Contexts/Auth";
import api from "../../services/api";
import { Game, Params } from "../../utils/types";

import {
  BottomNavbar,
  Container,
  GameContainer,
  Games,
  GameTitle,
  GameTitleContainer,
  TopImage,
  AddButton
} from "./styles";

const goal = require('../../../assets/images/goal.png');

const Main: React.FC = () => {
  const params = useRoute().params as Params;
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [disableAddButton, setDisableAddButton] = useState(true);
  const [userGames, setUserGames] = useState<Game[]>();
  const [friendsGames, setFriendsGames] = useState<Game[]>();
  const [invitedGames, setInvitedGames] = useState<Game[]>();
  const {signOut, user, string} = useAuth();

  async function getGames() {
    setLoading(true);

    if(!user) return signOut();

    try{
      const result = await api.get(`/games/home?_id=${params && params.id ? params.id : ""}&friendGames=${params ? "true" : ''}`, {
        headers: {auth_token: user.auth_token}
      });

      if (!params) {
        setInvitedGames(result.data.invitedGames);
        setFriendsGames(result.data.friendsGames);
      }

      if (result.data.userGames.length < 5) {
        setDisableAddButton(false);
      }

      setUserGames(result.data.userGames);
      setLoading(false);
    } catch(err) {
      setLoading(false);
      signOut();
    }
  }

  function handleNavigateToCreateEvent() {
    if (disableAddButton) {
      Alert.alert(
        "Você ainda não é premium",
        "Somente usuários premium podem inserir mais de 5 jogos");
    } else {
      navigation.navigate('CreateEvent');
    }
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
    </>);
  }

  return (
    <Container style={{paddingTop : params ? 50 : 0}}>
      {params && params.id && <Header />}
      <Games refreshControl={<RefreshControl refreshing={loading} onRefresh={getGames}/>}>
        {!params && <View style={{marginTop: 20}}/>}

        <TopImage>
          <Image source={goal}/>
        </TopImage>

        {!params &&
          <GameContainer>
            <GameTitleContainer>
              <GameTitle>Jogos marcados por amigos</GameTitle>
            </GameTitleContainer>

            {
              loading ? <Loading styles={{marginTop: 25}}/> :
              friendsGames && friendsGames.length > 0 ? mapGames(friendsGames) : <NoContent text="Seus amigos anda não criaram nenhum jogo" />
            }

          </GameContainer>
        }

        <GameContainer>
          <GameTitleContainer>
            <GameTitle>{!params ? "Seus Jogos" : `Jogos de ${string}`}</GameTitle>
          </GameTitleContainer>

          {
            loading ? <Loading styles={{marginTop: 25}}/> :
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
                loading ? <Loading styles={{marginTop: 25}}/> :
                invitedGames && invitedGames.length > 0 ? mapGames(invitedGames) : <NoContent text="Você ainda não tem convites de jogos" />
              }

          </GameContainer>
        }

        <View style={{marginBottom: 20}}/>
      </Games>

      {!params &&
        <BottomNavbar>
          <View>
            <TouchableOpacity onPress={handleNavigateToConfiguration}>
              <Icon name="gear" size={Dimensions.get("window").width <= 320 ? 26 : 35} color="#686868"/>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={handleNavigateToPremium}>
              <Icon2 name="crown" size={Dimensions.get("window").width <= 320 ? 32 : 43} color="#686868"/>
            </TouchableOpacity>
          </View>
          <View>
            <AddButton
              onPress={handleNavigateToCreateEvent}
              style={{
                width: Dimensions.get("window").width <= 320 ? 49 : 65,
                height: Dimensions.get("window").width <= 320 ? 49 : 65,
                backgroundColor: disableAddButton ? "#686868" : "#268E01"
              }}
            >
              <Icon2 name="plus" size={Dimensions.get("window").width <= 320 ? 30 : 40} color="#fff"/>
            </AddButton>
          </View>
          <View>
            <TouchableOpacity onPress={navigateToSearchFriends}>
              <Icon name="search" size={Dimensions.get("window").width <= 320 ? 32 : 43} color="#686868"/>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={handleNavigateToProfile}>
              <Icon name="user" size={Dimensions.get("window").width <= 320 ? 26 : 35} color="#686868"/>
            </TouchableOpacity>
          </View>
        </BottomNavbar>
      }
    </Container>
  );
}

export default Main;