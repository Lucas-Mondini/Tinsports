import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Dimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../Contexts/Auth';
import { useRequest } from '../../Contexts/Request';
import { splitText } from '../../utils/functions';
import{Game, GameInfo, GameTitle, LocationText, TimeText} from './styles';

interface GameCardProps{
  title: string;
  location: string;
  time: string;
  _id: string;
  host_ID: string;
  finished: boolean;
  setGameId: (_id: string) => void;
  deleteGame: () => void;
}

const GameCard: React.FC<GameCardProps> = ({_id, host_ID, title, location, time, finished, setGameId, deleteGame}) => {

  const navigation = useNavigation();
  const {signOut, user} = useAuth();

  const gameTitle = Dimensions.get('window').width < 480 ? splitText(title, 10) : splitText(title, 18);

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

  return (
    <Game onPress={handleGame}
      onLongPress={host_ID === user._id ? () => {
        setGameId(_id);
        deleteGame();
      } : () => {}}
    >
      <Icon name={gameIconRandom()} size={51} color="#686868"/>
      <GameInfo>
        <View>
          <GameTitle>{gameTitle}</GameTitle>
          {finished ? <LocationText>Avalie os jogadores</LocationText> : <LocationText>Local: {splitText(location, 10)}</LocationText>}
        </View>
        <TimeText style={{color: finished ? "#C50000": "#686868"}}>{finished ? 'Finalizado' : time}</TimeText>
      </GameInfo>
    </Game>
  );
}

export default GameCard;