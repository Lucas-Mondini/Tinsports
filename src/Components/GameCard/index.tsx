import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import{Game, GameInfo, GameTitle, LocationText, TimeText} from './styles';

interface GameCardProps{
  title: string;
  location: string;
  time: string;
  _id: string;
  host_ID: string;
  setGames: () => void;
  finished: boolean;
}

const GameCard: React.FC<GameCardProps> = ({_id, host_ID, title, location, time, setGames, finished}) => {

  const navigation = useNavigation();
  const {signOut, user} = useAuth();

  function gameIconRandom(): string {
    const number = Math.floor(Math.random() * 5);
    let icon = "";

    switch(number) {
      case 0:
        icon = "american-football"
        break;
      case 1:
        icon = "baseball"
        break;
      case 2:
         icon = "basketball-sharp"
         break;
      case 3:
         icon = "football"
         break;
      case 4:
         icon = "tennisball"
         break;
    }

    return icon;
  }

  function handleGame() {
    navigation.navigate('GameInfo', {id: _id});
  }

  if (!user) {
    signOut();
    return <View />
  }

  async function handleDelete() {
    Alert.alert('Excluir o jogo', "Deseja realmente excluir esse jogo?",[
      {
        text: 'Sim',
        async onPress() {
          try {
            if (!user) return signOut();

            await api.post(`/games/${_id}/delete`, {host_ID: user._id},{
              headers: {
                auth_token: user.auth_token,
              }
            });

            setGames();
          } catch (error) {
            navigation.reset({index: 0, routes: [{name: "Main"}]});
          }
        }
      },
      {
        text: 'Não'
      }
    ]);
  }

  return (
    <Game onPress={handleGame} onLongPress={host_ID === user._id ? handleDelete : () => {}} key={_id}>
      <Icon name={gameIconRandom()} size={51} color="#686868"/>
      <GameInfo>
        <View>
          <GameTitle>{title.length >= 18 ? title.substr(0, 18) + "..." : title}</GameTitle>
          {finished ? <LocationText>Avalie os jogadores</LocationText> : <LocationText>Local: {location}</LocationText>}
        </View>
        <TimeText style={{color: finished ? "#C50000": "#686868"}}>{finished ? 'Finalizado' : time}</TimeText>
      </GameInfo>
    </Game>
  );
}

export default GameCard;