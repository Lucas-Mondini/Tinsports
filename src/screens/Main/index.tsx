import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import GameCard from "../../Components/GameCard";
import api from "../../services/api";

import { 
  BottomNavbar,
  Container, GameContainer, Games, GameTitle, GameTitleContainer, TopImage
} from "./styles";

const goal = require('../../../assets/images/goal.png');
const futbol = require('../../../assets/images/futbol.png');
const crown = require('../../../assets/images/crown.png');
const gear = require('../../../assets/images/gear.png');
const search = require('../../../assets/images/search.png');
const user = require('../../../assets/images/user.png');
const AddButton = require('../../../assets/images/RoundButton.png');

const Main: React.FC = () =>{
  useEffect(() => {
    AsyncStorage.getItem("auth_token").then(token =>{
      api.get(`/games`,{
        headers: {
          auth_token: token
        }
      }).then(async response => {
        console.log(response.data);
      }).catch(err => console.error(err));
    }).catch(err => console.log(err));
  }, []);

  const navigation = useNavigation();

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
          <GameCard icon={futbol} title="Fervo do Véio zé" location="Rua augusta" time="18:30"/>
        </GameContainer>

        <GameContainer>
          <GameTitleContainer>
            <GameTitle>Seus Jogos</GameTitle>
          </GameTitleContainer>
          <GameCard icon={futbol} title="Arrastão em Copacabana" location="Copacabana" time="20:30"/>
        </GameContainer>

        <GameContainer>
          <GameTitleContainer>
            <GameTitle>Convites de jogos</GameTitle>
          </GameTitleContainer>
          <GameCard icon={futbol} title="Samba do criolo doido" location="Maraca" time="18:00"/>
          <GameCard icon={futbol} title="Arrastão em Copacabana" location="Copacabana" time="20:30"/>
          <GameCard icon={futbol} title="Fervo do Véio zé" location="Rua augusta" time="18:30"/>
          <GameCard icon={futbol} title="Fervo do Véio zé" location="Rua augusta" time="18:30"/>
        </GameContainer>
      </Games>

      <BottomNavbar>
        <View>
          <TouchableOpacity>
            <Image source={gear}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Image source={crown}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() =>{
            navigation.navigate('CreateEvent');
          }}>
            <Image source={AddButton}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Image source={search}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() =>{
            navigation.navigate('Profile');
          }}>
            <Image source={user}/>
          </TouchableOpacity>
        </View>
      </BottomNavbar>
    </Container>
  );
}

export default Main;