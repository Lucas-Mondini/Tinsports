import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
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

export default function GameInfo(){

  const [eventFinished, setEventFinished] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem("auth_token").then(token =>{
      api.get(`/games/605643345fe0051d44af7bd2`,{
        headers: {
          auth_token: token
        }
      }).then(async response => {
        console.log(response.data);
      }).catch(err => console.error(err));
    }).catch(err => console.log(err));
  }, []);


  function handleGameEvaluation(){
    navigation.navigate("Evaluation");
  }

  return(
    <Container>
      <GameInfoView>
        <Title>Samba do criolo doido</Title>

        <BadgeContainer style={{paddingRight: 38}}>
          <Badge text="Futeba" image={gameIcon}/>
          <Badge text="R$10,00" image={moneyIcon} />
        </BadgeContainer>

        <BadgeContainer>
          <Badge text="R$18:00" image={clockIcon}/>
          <Badge text="18/05/2021" image={calendarIcon}/>
        </BadgeContainer>

        <BadgeContainer>
          <Badge text="Casa do Osvaldo" image={mapIcon}/>
        </BadgeContainer>

        <Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus lacus eu justo condimentum porttitor. Aliquam vel lectus nec lorem blandit auctor. In tincidunt arcu et arcu pharetra lobortis. Suspendisse quis egestas nibh. Cras volutpat sapien non lacinia consectetur. Donec quis orci lectus. Cras sit amet arcu nec velit luctus porta</Description>

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
        <UserCard photo={photo} name="João das Candongas" confirmation="Não confirmado"/>
        <UserCard photo={photo} name="Pedrão da Massa" confirmation="Confirmado"/>
        <UserCard photo={photo} name="João das Candongas" confirmation="Não confirmado"/>
        <UserCard photo={photo} name="Pedrão da Massa" confirmation="Confirmado"/>
        <UserCard photo={photo} name="João das Candongas" confirmation="Não confirmado"/>
        <UserCard photo={photo} name="Pedrão da Massa" confirmation="Confirmado"/>
        <UserCard photo={photo} name="João das Candongas" confirmation="Não confirmado"/>
        <UserCard photo={photo} name="Pedrão da Massa" confirmation="Confirmado"/>
        <UserCard photo={photo} name="João das Candongas" confirmation="Não confirmado"/>
        <UserCard photo={photo} name="Pedrão da Massa" confirmation="Confirmado"/>
        <UserCard photo={photo} name="João das Candongas" confirmation="Não confirmado"/>
        <UserCard photo={photo} name="Pedrão da Massa" confirmation="Confirmado"/>
        <UserCard photo={photo} name="João das Candongas" confirmation="Não confirmado"/>
        <UserCard photo={photo} name="Pedrão da Massa" confirmation="Confirmado"/>
        <UserCard photo={photo} name="João das Candongas" confirmation="Não confirmado"/>
        <UserCard photo={photo} name="Pedrão da Massa" confirmation="Confirmado"/>
        <View style={{paddingBottom: 25}}></View>
      </GameInfoView>
    </Container>
  );
}