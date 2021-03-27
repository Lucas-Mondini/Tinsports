import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import GameCard from "../../Components/GameCard";

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
          <TouchableOpacity>
            <Image source={AddButton}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Image source={search}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Image source={user}/>
          </TouchableOpacity>
        </View>
      </BottomNavbar>
    </Container>
  );
}

export default Main;