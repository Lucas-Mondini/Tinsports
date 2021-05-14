import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ImageSourcePropType, Text, View } from "react-native";
import Badge from "../../Components/Badge";
import UserCard from "../../Components/UserCard";
import api from "../../services/api";
import {
  BadgeContainer,
  ButtonText,
  Container, Description, EmptyView, EventFinishedButton, EventFinishedView, GameInfoView, Title, UsersTitle
} from './styles';

const photo = require('../../../assets/photos/photo.jpg');
const gameIcon = require('../../../assets/images/futbol-small.png');
const moneyIcon = require('../../../assets/images/money.png');
const clockIcon = require('../../../assets/images/clock.png');
const calendarIcon = require('../../../assets/images/calendar.png');
const mapIcon = require('../../../assets/images/map-marker.png');
import { useRoute } from '@react-navigation/native';
import { useCallback } from "react";

type Params = {
  _id: string;
}

type Game = {
  name: string;
  location: string;
  date: string;
  _id: string;
  type: string;
  description: string;
}

const GameInfo: React.FC = () => {
  
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as Params;

  const [eventFinished, setEventFinished] = useState(false);
  const [game, setGame] = useState<Game>();

  useEffect(() => {
    AsyncStorage.getItem("auth_token").then(token => {
      api.get(`/games/${params._id}`, {
        headers: {
          auth_token: token
        }
      }).then(async response => {
        await setGame(response.data);
        console.log(game);
      }).catch(err => console.error(err));
    }).catch(err => console.log(err));
  }, [params]);


  const handleGameEvaluation= useCallback(() =>{
    navigation.navigate("Evaluation");
  }, [navigation]);

  if(!game) return <Text>Jogo não encontrado</Text>
  return (
    <Container>
      <GameInfoView>
        <Title>{game.name}</Title>

        <BadgeContainer style={{ paddingRight: 38 }}>
          <Badge text={game.type? game.type : "oi"} image={gameIcon} />
          <Badge text="R$10,00" image={moneyIcon} />
        </BadgeContainer>

        <BadgeContainer>
          <Badge text="R$18:00" image={clockIcon} />
          <Badge text={game.date} image={calendarIcon} />
        </BadgeContainer>

        <BadgeContainer>
          <Badge text={game.location} image={mapIcon} />
        </BadgeContainer>

        <Description>{game.description}</Description>

        {
          (eventFinished)
            ?
            <EventFinishedView>
              <EventFinishedButton onPress={handleGameEvaluation}>
                <ButtonText>Avaliar participantes</ButtonText>
              </EventFinishedButton>
            </EventFinishedView>
            :
            <EmptyView></EmptyView>
        }

        <UsersTitle>Lista de participantes</UsersTitle>
        <UserCard photo={photo} name="João das Candongas" confirmation="Não confirmado" />
        <UserCard photo={photo} name="Pedrão da Massa" confirmation="Confirmado" />
        <UserCard photo={photo} name="João das Candongas" confirmation="Não confirmado" />
        <UserCard photo={photo} name="Pedrão da Massa" confirmation="Confirmado" />
        <UserCard photo={photo} name="João das Candongas" confirmation="Não confirmado" />
        <UserCard photo={photo} name="Pedrão da Massa" confirmation="Confirmado" />
        <UserCard photo={photo} name="João das Candongas" confirmation="Não confirmado" />
        <UserCard photo={photo} name="Pedrão da Massa" confirmation="Confirmado" />
        <UserCard photo={photo} name="João das Candongas" confirmation="Não confirmado" />
        <UserCard photo={photo} name="Pedrão da Massa" confirmation="Confirmado" />
        <UserCard photo={photo} name="João das Candongas" confirmation="Não confirmado" />
        <UserCard photo={photo} name="Pedrão da Massa" confirmation="Confirmado" />
        <UserCard photo={photo} name="João das Candongas" confirmation="Não confirmado" />
        <UserCard photo={photo} name="Pedrão da Massa" confirmation="Confirmado" />
        <UserCard photo={photo} name="João das Candongas" confirmation="Não confirmado" />
        <UserCard photo={photo} name="Pedrão da Massa" confirmation="Confirmado" />
        <View style={{ paddingBottom: 25 }}></View>
      </GameInfoView>
    </Container>
  );
}

export default GameInfo;