import AsyncStorage from "@react-native-community/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { Image, TouchableOpacity, View, Text} from "react-native";
import GameCard from "../../Components/GameCard";
import { useAuth } from "../../Contexts/Auth";
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
const userIcon = require('../../../assets/images/user.png');
const AddButton = require('../../../assets/images/RoundButton.png');

type Game = {
  _id: string;
  host_ID: string;
  date: string;
  location: string;
  name: string;
  type: string;
  hour: string;
}

const Main: React.FC = () =>{

  const [games, setGames] = useState<Game[]>();
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {signOut, user} = useAuth();

  async function getGames(){

    if(!user) {
      signOut();
      return;
    }

    try{
      const result = await api.get(`/games`,{headers: {auth_token: user.auth_token}});

      if(result.status == 401){
        signOut();
      }

      setLoading(false);
      setGames(result.data);
    } catch(err){
      signOut();
      setLoading(false);
    }
  }

  const handleNavigateToCreateEvent = useCallback(() =>{
    navigation.navigate('CreateEvent');
  }, [navigation]);

  const handleNavigateToProfile = useCallback(() =>{
    navigation.navigate('Profile');
  }, [navigation]);

  const navigateToSearchFriends = useCallback(()=>{
    navigation.navigate('SearchFriend');
  },[navigation]);

  useEffect(() => {
    getGames();
  }, [isFocused, loading]);

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
                <GameCard host_ID={game.host_ID} setGames={() => {
                  setLoading(true);
                }} _id={game._id} icon={futbol} title={game.name} location={game.location} time={game.hour}/>
              </View>
            ))}

          </GameContainer>
      </Games>

      <BottomNavbar>
        <View>
          <TouchableOpacity onPress={signOut}>
            <Image source={gear}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <Image source={crown}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleNavigateToCreateEvent}>
            <Image source={AddButton}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={navigateToSearchFriends}>
            <Image source={search}/>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleNavigateToProfile}>
            <Image source={userIcon}/>
          </TouchableOpacity>
        </View>
      </BottomNavbar>
    </Container>
  );
}

export default Main;