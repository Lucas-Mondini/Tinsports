import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Alert, Image, ImageSourcePropType, View } from 'react-native';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import{Game, GameInfo, GameTitle, LocationText, TimeText} from './styles';

interface GameCardProps{
  title: string;
  location: string;
  time: string;
  icon: ImageSourcePropType;
  _id: string;
  host_ID: string;
  setGames: ()=>void;
}

interface Game {
  _id: string;
  date: string;
  location: string;
  name: string;
  type: string;
  hour: string;
}

const GameCard: React.FC<GameCardProps> = ({_id, host_ID, title, location, time, icon, setGames}) =>{

  const navigation = useNavigation();
  const {signOut, user} = useAuth();

  const handleGame = useCallback(() =>{
    navigation.navigate('GameInfo', {_id});
  },[navigation]);

  if (!user) {
    signOut();
    return <View />
  }

  const handleDelete = useCallback(() =>{
    Alert.alert('Excluir o jogo', "Deseja realmente excluir esse jogo?",[
      {
        text: 'Sim',
        async onPress(){
          try {
            await api.post(`/games/${_id}/delete`, {host_ID: user._id},{
              headers: {
                auth_token: user.auth_token,
              }
            });

            setGames();
          } catch (error) {
            console.log(error);
          }
        }
      },
      {
        text: 'Não'
      }
    ]);
  },[]);

  return (
    <Game onPress={handleGame} onLongPress={host_ID === user._id ? handleDelete : () => {}} key={_id}>
      <Image source={icon}/>
      <GameInfo>
        <View>
          <GameTitle>{title.length >= 18 ? title.substr(0, 18) + "..." : title}</GameTitle>
          <LocationText>Local: {location}</LocationText>
        </View>
        <TimeText>{time}</TimeText>
      </GameInfo>
    </Game>
  );
}

export default GameCard;