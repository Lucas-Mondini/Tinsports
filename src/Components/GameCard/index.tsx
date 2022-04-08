import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../../Contexts/Auth';
import { splitText } from '../../utils/functions';
import Gesture from '../Gesture';
import{Game, GameInfo, GameTitle, LocationText, TimeText} from './styles';

interface GameCardProps{
  title: string;
  location: string;
  time: string;
  _id: string;
  host_ID: string;
  finished: boolean;
  type: "User" | "Friends" | "Invites";
  deleteGame?: () => void;
  editGame?: () => void;
  confirmInvite?: () => void;
  cancelInvite?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({
  _id, host_ID, title, location, time, finished, type,
  deleteGame, editGame, confirmInvite, cancelInvite
  }) =>
{
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

  function typeActions(): Array<any>
  {
    switch(type) {
      case "User":
        const functions = [{type: 'Delete', function: deleteGame}];

        if (!finished) functions.push({type: 'Edit', function: editGame});

        return functions;
      case "Friends":
        return [];
      case "Invites":
        return [
          {type: 'Confirm', function: confirmInvite},
          {type: 'Cancel', function: cancelInvite}
        ];
    }
  }

  function handleGame() {
    navigation.navigate('GameInfo', {id: _id});
  }

  if (!user) {
    signOut();
    return <View />
  }

  return (
    <Gesture buttons={typeActions()}>
      <Game
        onPress={handleGame}
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
    </Gesture>
  );
}

export default GameCard;