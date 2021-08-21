import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import Badge from "../../Components/Badge";
import UserCard from "../../Components/UserCard";
import api from "../../services/api";
import {
  BadgeContainer,
  ButtonText,
  Container,
  Description,
  EmptyText,
  EventFinishedButton,
  EventFinishedView,
  GameInfoView,
  InviteButton,
  Title,
  UsersTitle
} from './styles';
import { useRoute } from '@react-navigation/native';

import { useAuth } from "../../Contexts/Auth";
import InviteUsersModal from "../../Components/InviteUsersModal";
import Loading from "../../Components/Loading";
import EvaluationModal from "../../Components/EvaluationModal";
import Header from "../../Components/Header";
import { Game, GameList, Params } from "../../utils/types";

const photo = require('../../../assets/photos/photo.jpg');

const GameInfo: React.FC = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as Params;
  const isFocused = useIsFocused();
  const mountedRef = useRef(true);

  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [game, setGame] = useState<Game>();
  const [gameList, setGameList] = useState<GameList[]>();
  const {user, signOut} = useAuth();

  async function getGameInfo() {
    setLoading(true);

    if(!user) return signOut();

    try{
      const token = user.auth_token

      const result = await api.get(`/games/${params.id}`, {
        headers: {
          auth_token: token
        }
      });

      if(result.status == 401 || !token){
        signOut();
      }

      setLoading(false);
      setGame(result.data);
      setGameList(result.data.gameList);
      setLoading(false);
    } catch(err){
      return navigation.reset({
        index: 0,
        routes: [{name: "Main"}]
      });
    }
  }

  function deleteInvitation(inviteId: string) {

    if (game?.host_ID !== user?._id) return;

    Alert.alert("Excluir convite", "Deseja realmente excluir o convite?", [
      {
        text: "Sim", async onPress() {
          if (!user) return signOut();

          try {
            await api.delete(`/game-list/${inviteId}`, {headers: {auth_token: user.auth_token}});
            getGameInfo();
          } catch(err) {
            navigation.reset({index: 0, routes: [{name: "Main"}, {name: "Profile"}]});
          }
        }
      },
      {
        text: "Não"
      }
    ]);
  }

  function handleModal() {
    setModalOpened(!modalOpened);
  }

  useEffect(() => {
    if (isFocused) getGameInfo();
  }, [isFocused]);

  useEffect(() =>{
    return () => {
      mountedRef.current = false
    }
  },[isFocused]);

  if(loading) return <Loading />;
  if(!game || !gameList) return null;

  return (
    <Container>
      <Header visible={!modalOpened}/>

      {user && game.host_ID === user._id ?
        game.finished ?
          <EvaluationModal
            visible={modalOpened}
            gameId={game._id}
            invitedUsers={gameList}
            setModal={handleModal}
            reloadFunction={getGameInfo}
          /> :
          <InviteUsersModal
            gameList={gameList}
            gameId={game._id}
            setModal={handleModal}
            visible={modalOpened}
            reloadFunction={getGameInfo}
          />
        : null
      }

      <GameInfoView>
        <Title>{game.name}</Title>

        <BadgeContainer style={{ paddingRight: 38 }}>
          <Badge text={game.type} icon="soccer-ball-o" size={29}/>
          <Badge text={game.value ? game.value : "       --   "} icon="money" size={32}/>
        </BadgeContainer>

        <BadgeContainer>
          <Badge text={game.hour} icon="clock-o" size={32}/>
          <Badge text={game.date} icon="calendar-check-o" size={29}/>
        </BadgeContainer>

        <BadgeContainer>
          <Badge text={game.location} icon="map-marker" size={32}/>
        </BadgeContainer>

        <BadgeContainer style={{ paddingTop: 25}}>
          <Badge text={game.hostName} icon="user" size={32}/>
        </BadgeContainer>

        <BadgeContainer>
          <Badge text={game.hostEmail} icon="at" size={32}/>
        </BadgeContainer>

        <Description>{game.description}</Description>

        <UsersTitle>Lista de participantes</UsersTitle>

        {
          (game.finished && game.host_ID === user?._id)
            ?
            <EventFinishedView>
              <EventFinishedButton onPress={handleModal}>
                <ButtonText>Avaliar participantes</ButtonText>
              </EventFinishedButton>
            </EventFinishedView>
            :
            <>
              {user && game.host_ID === user._id && !game.finished && (
                <>
                  {gameList.length > 0 ? null : <EmptyText>Ainda não há convidados</EmptyText>}
                  <InviteButton onPress={handleModal}><ButtonText>Convide amigos</ButtonText></InviteButton>
                </>
              )}
            </>
        }

        {(gameList.length > 0) ?
          <>

            {gameList.map(user =>{
              return (<UserCard
                        key={user._id}
                        invitationId={user._id}
                        id={user.user_ID}
                        photo={photo}
                        name={user.name}
                        reputation={user.reputation}
                        confirmation={user.confirmed}
                        handleLongPress={deleteInvitation}
                      />)
            })}
          </>

          : <View style={{ paddingBottom: 100 }}></View>
        }
        <View style={{ paddingBottom: 25 }}></View>
      </GameInfoView>
    </Container>
  );
}

export default GameInfo;