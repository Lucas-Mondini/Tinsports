import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { RefreshControl, View } from "react-native";
import Badge from "../../Components/Badge";
import UserCard from "../../Components/UserCard";
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
import { useRequest } from "../../Contexts/Request";
import MessageModal from "../../Components/MessageModal";

const photo = require('../../../assets/photos/photo.jpg');

const GameInfo: React.FC = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as Params;
  const isFocused = useIsFocused();
  const mountedRef = useRef(true);

  const {user} = useAuth();
  const {get, destroy} = useRequest();

  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [game, setGame] = useState<Game>();
  const [gameList, setGameList] = useState<GameList[]>();
  const [modal, setModal] = useState<any>();

  async function getGameInfo() {
    try{
      const result = await get(`/games/${params.id}`, setLoading);

      if (result?.finished && result.host_ID !== user?._id) {
        return navigation.reset({
          index: 0,
          routes: [{name: "Main"}]
        });
      }

      setGame(result);
      setGameList(result.gameList);
    } catch(err){
      return navigation.reset({
        index: 0,
        routes: [{name: "Main"}]
      });
    }
  }

  function deleteInvitation(inviteId: string)
  {
    if (game?.host_ID !== user?._id) return;

    let modalInfo: any = {message:{title: "Excluir convite?",
                                   message: "Deseja realmente excluir o convite?"},
                          buttons: [
                            {text: "Sim", color: "green", function: async () => {
                                try {
                                  await destroy(`/game-list/${inviteId}`, getGameInfo);
                                  setModal(null);
                                } catch (error) {
                                  setModal(null);
                                  navigation.reset({index: 0, routes: [{name: "Main"}]});
                                }
                            }},
                            {text: "Não", color: "red", function: () => setModal(null)},
                          ]};

    setModal(
      <MessageModal
        visible={true}
        loading={loading}
        setModal={() => setModal(null)}
        message={modalInfo.message}
        buttons={modalInfo.buttons}
      />
    );
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
      {modal && modal}

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
            gameId={game._id}
            setModal={handleModal}
            visible={modalOpened}
            reloadFunction={getGameInfo}
          />
        : null
      }

      <GameInfoView refreshControl={<RefreshControl refreshing={loading} onRefresh={getGameInfo}/>}>
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

        {(gameList.length > 0 || game.finished) ? null : <EmptyText>Ainda não há convidados</EmptyText>}

        {
          (game.finished && game.host_ID === user?._id)
            ?
            <EventFinishedView>
              <EventFinishedButton
                disabled={(gameList.length === 0)}
                style={{backgroundColor: (gameList.length === 0) ? "#656565" : "#2FB400"}}
                onPress={handleModal}
              >
                <ButtonText>Avaliar participantes</ButtonText>
              </EventFinishedButton>
            </EventFinishedView>
            :
            <>
              {user && game.host_ID === user._id && !game.finished && (
                <>
                  <InviteButton onPress={handleModal}><ButtonText>Convide amigos</ButtonText></InviteButton>
                </>
              )}
            </>
        }

        {(gameList.length > 0) ?
          <>
            {gameList.map(user =>{
              return (<UserCard
                        buttonsType="GameInviteText"
                        key={user._id}
                        _id={user.user_ID}
                        user_ID={user.user_ID}
                        photo={user.photo || photo}
                        name={user.name}
                        reputation={user.reputation}
                        confirmation={user.confirmed}
                        handleLongPress={() => deleteInvitation(user._id)}
                        disableButtons={false}
                      />)
            })}
          </>

          : game.finished && <EmptyText>Não há usuários para avaliar</EmptyText>
        }
        <View style={{ paddingBottom: 25 }}></View>
      </GameInfoView>
    </Container>
  );
}

export default GameInfo;