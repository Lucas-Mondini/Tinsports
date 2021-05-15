import AsyncStorage from "@react-native-community/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { Image, TouchableOpacity, View, Text} from "react-native";
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

type Game = {
  _id: string;
  date: string;
  location: string;
  name: string;
  type: string;
}

const Main: React.FC = () =>{

  const [games, setGames] = useState<Game[]>();
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  //navigation.reset({index: 0, routes:[{name: 'Main'}]});

  async function getGames(){
    const token = await AsyncStorage.getItem("auth_token");

    if(!token){
      navigation.navigate("Login");
    }

    try{
      const result = await api.get(`/games`,{headers: {auth_token: token}});
  
      if(result.status == 401){
        await AsyncStorage.removeItem("auth_token");
        navigation.navigate("Login");
      }
      
      setLoading(false);
      setGames(result.data);
    } catch(err){
      await AsyncStorage.removeItem("auth_token");
      setLoading(false);
      navigation.navigate("Login");
    }
  }
  
  const handleNavigateToCreateEvent = useCallback(() =>{
    navigation.navigate('Profile');
  }, [navigation]);

  useEffect(() => {
    getGames();
  }, [isFocused]);

  if(loading) return <Text>Carregando...</Text>

  return (
    <Container>
      <Games>
        <TopImage>
          <Image source={goal}/>
        </TopImage>
        {/* <GameContainer>
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
        </GameContainer> */}

        <GameContainer>
          <GameTitleContainer>
            <GameTitle>Convites de jogos</GameTitle>
          </GameTitleContainer>

          {games?.map(game =>(
            <View key={game._id}>
              <GameCard _id={game._id} icon={futbol} title={game.name} location={game.location} time={"18:00"}/>
            </View>
          ))}
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
          <TouchableOpacity onPress={handleNavigateToCreateEvent}>
            <Image source={user}/>
          </TouchableOpacity>
        </View>
      </BottomNavbar>
    </Container>
  );
}

export default Main;