import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../Contexts/Auth';
import { getFirstName, splitText } from '../../utils/functions';
import{Button, ButtonsView, GameNameText, Invite, InviteInfo, InviteTitle, LocationText, TimeText} from './styles';

interface InviteCardProps{
  _id: string;
  host_ID: string;
  game_ID: string;
  hostName: string;
  gameName: string;
  date: string;
  hour: string;
  location: string;
  confirmInvite: () => void;
  deleteInvite: () => void;
}

interface InviteId {
  id: string, action: "Delete" | "Confirm"
}

const InviteCard: React.FC<InviteCardProps> = ({_id, host_ID, game_ID, date, location, hour, hostName, gameName, confirmInvite, deleteInvite}) => {

  const navigation = useNavigation<any>();
  const {signOut, user} = useAuth();

  const gameLocation = Dimensions.get('window').width <= 320 ? splitText(location, 8) : splitText(location, 18);
  const name = Dimensions.get('window').width <= 320 ? splitText(gameName, 10) : splitText(gameName, 18);

  function goToGameInfo() {
    navigation.push('GameInfo', {id: game_ID});
  }

  function goToUserProfile() {
    navigation.push('Profile', {id: host_ID});
  }

  if (!user) {
    signOut();
    return <View />
  }

  return (
    <Invite onPress={goToGameInfo} onLongPress={goToUserProfile}>
      <Icon name="soccer-ball-o" size={51} color="#686868"/>
      <InviteInfo>
        <View style={{marginLeft: Dimensions.get('window').width <= 320 ? 10 : 0}}>
          <InviteTitle>{getFirstName(hostName)}</InviteTitle>
          <GameNameText>{name}</GameNameText>
          <LocationText>Local: {gameLocation}</LocationText>
          <TimeText>{date} {hour}</TimeText>
        </View>

        <ButtonsView>
          <Button
            onPress={deleteInvite}
            style={{backgroundColor: "#c50000"}}
          >
            <Icon name="close" size={25} color="#fff"/>
          </Button>

          <Button
            onPress={confirmInvite}
            style={{backgroundColor: "#268e01"}}
          >
            <Icon name="check" size={25} color="#fff"/>
          </Button>
        </ButtonsView>
      </InviteInfo>
    </Invite>
  );
}

export default InviteCard;