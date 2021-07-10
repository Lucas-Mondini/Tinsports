import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";
import Badge from "../../Components/Badge";
import UserCard from "../../Components/UserCard";
import api from "../../services/api";
import {
  BadgeContainer,
  ButtonText,
  Container, Description, EmptyText, EventFinishedButton, EventFinishedView, GameInfoView, InviteButton, Title, UsersTitle
} from './styles';

const photo = require('../../../assets/photos/photo.jpg');
const gameIcon = require('../../../assets/images/futbol-small.png');
const moneyIcon = require('../../../assets/images/money.png');
const clockIcon = require('../../../assets/images/clock.png');
const calendarIcon = require('../../../assets/images/calendar.png');
const mapIcon = require('../../../assets/images/map-marker.png');
import { useRoute } from '@react-navigation/native';
import { useCallback } from "react";
import { useAuth } from "../../Contexts/Auth";
import InviteUsersModal from "../../Components/InviteUsersModal";
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";

type Params = {
  _id: string;
}

type GameList = {
  _id: string;
  user_ID: string;
  name: string;
  email: string;
  confirmed: boolean;
}

type Game = {
  name: string;
  location: string;
  date: string;
  hour: string;
  _id: string;
  type: string;
  description: string;
  host_ID: string;
  value: string;
}

const GameInfo: React.FC = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as Params;
  const isFocused = useIsFocused();
  const mountedRef = useRef(true);

  const [loading, setLoading] = useState(true);
  const [modalOpened, setModalOpened] = useState(false);
  const [eventFinished, setEventFinished] = useState(false);
  const [game, setGame] = useState<Game>();
  const [gameList, setGameList] = useState<GameList[]>();
  const {user, signOut} = useAuth();

  async function getGameInfo() {

    if(!user){
      signOut();
      return;
    }

    try{
      const token = user.auth_token

      const result = await api.get(`/games/${params._id}`, {
        headers: {
          auth_token: token
        }
      });

      if(result.status == 401 || !token){
        signOut();
      }

      if(!mountedRef.current) return null;

      setLoading(false);
      setGame(result.data);
      setGameList(result.data.gameList);
    } catch(err){
      signOut();
    }
  }

  function deleteInvitation(inviteId: string) {

    if (game?.host_ID !== user?._id) return;

    Alert.alert("Excluir convite", "Deseja realmente excluir o convite?", [
      {
        text: "Sim", async onPress() {
          if (!user) return signOut();

          try {
            await api.delete(`/game-list/${inviteId}/delete`, {headers: {auth_token: user.auth_token}});
            getGameInfo();
          } catch(err) {
            console.log(err);
            //signOut();
          }
        }
      },
      {
        text: "Não"
      }
    ]);
  }

  const handleGameEvaluation= useCallback(() =>{
    navigation.navigate("Evaluation");
  }, [navigation]);

  function handleModal() {
    setModalOpened(!modalOpened);
  }

  useEffect(() => {
    getGameInfo();
  }, [isFocused, game]);

  useEffect(() =>{
    return () => {
      mountedRef.current = false
    }
  },[isFocused]);

  if(loading) return <Text>Carregando...</Text>
  if(!game || !gameList) return <Text>Jogo não encontrado</Text>

  return (
    <Container>

      {user && game.host_ID === user._id && <InviteUsersModal gameId={game._id} setModal={handleModal} visible={modalOpened} reloadFunction={getGameInfo} />}

      <GameInfoView>
        <Title>{game.name}</Title>

        <BadgeContainer style={{ paddingRight: 38 }}>
          <Badge text={game.type} image={gameIcon} />
          <Badge text={game.value ? `R$${game.value}` : "--"} image={moneyIcon} />
        </BadgeContainer>

        <BadgeContainer>
          <Badge text={game.hour} image={clockIcon} />
          <Badge text={game.date} image={calendarIcon} />
        </BadgeContainer>

        <BadgeContainer>
          <Badge text={game.location} image={mapIcon} />
        </BadgeContainer>

        <Description>{game.description}</Description>

        <UsersTitle>Lista de participantes</UsersTitle>

        {
          (eventFinished)
            ?
            <EventFinishedView>
              <EventFinishedButton onPress={handleGameEvaluation}>
                <ButtonText>Avaliar participantes</ButtonText>
              </EventFinishedButton>
            </EventFinishedView>
            :
            <>
              <EmptyText>Ainda não há convidados</EmptyText>
              {user && game.host_ID === user._id && <InviteButton onPress={handleModal}><ButtonText>Convide amigos</ButtonText></InviteButton>}
            </>
        }

        {(gameList.length > 0) ?
          <View>

            {gameList.map(user =>{
              return (<UserCard key={user._id} invitationId={user._id} id={user.user_ID} photo={photo} name={user.name} confirmation={user.confirmed} handleLongPress={deleteInvitation} />)
            })}
          </View>

          : <View style={{ paddingBottom: 100 }}></View>
        }
        <View style={{ paddingBottom: 25 }}></View>
      </GameInfoView>
    </Container>
  );
}

export default GameInfo;