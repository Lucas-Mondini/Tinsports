import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ImageSourcePropType, View } from 'react-native';
import { splitText } from '../../utils/functions';
import Metric from '../Metric';
import AddFriendButtons from './FriendButtons/AddFriendButtons';
import DeleteFriendButtons from './FriendButtons/DeleteFriendButtons';
import InviteButtons from './FriendButtons/InviteButtons';
import GameInviteText from './GameInviteText';
import InviteFriendButton from './InviteFriendButton';
import EvaluationButtons from './EvaluationButtons';
import {
  User,
  UserInfo,
  UserName,
  UserPhoto,
  ReputationText,
  ReputationView
} from './styles';

interface UserCardProps{
  name: string;
  _id: string;
  user_ID: string;
  buttonsType: "AddFriend" | "DeleteFriend" | "Invite" | "GameInviteText" | "GameInvite" | "Evaluation";
  disableButtons: boolean;
  reputation: number;
  photo: ImageSourcePropType | string;
  confirmation?: boolean;
  addFriend?: boolean;
  handleLongPress?: () => void;
  reloadFunction?: () => void;
  usersArray?: any[];
  setUsersArray?: (value: any[]) => void;
  disableNavigation?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
    name, _id, user_ID, photo, disableButtons, buttonsType, reputation, confirmation, disableNavigation,
    handleLongPress, reloadFunction, usersArray, setUsersArray
  }) => {

  const navigation = useNavigation<any>();

  const userName = Dimensions.get('window').width < 480 ? splitText(name, 10) : splitText(name, 18);

  function accessProfile()
  {
    if (!disableNavigation) navigation.push("Profile", {id: user_ID});
  }

  function handleButtons() {
    switch (buttonsType) {
      case "AddFriend":
        return <AddFriendButtons _id={user_ID} reloadFunction={reloadFunction ? reloadFunction : ()=>{}}/>
        break;
      case "DeleteFriend":
        return <DeleteFriendButtons _id={_id} disableButtons={disableButtons} reloadFunction={reloadFunction ? reloadFunction : ()=>{}}/>
        break;
      case "Invite":
        return <InviteButtons _id={_id} disableButtons={disableButtons} reloadFunction={reloadFunction ? reloadFunction : ()=>{}}/>
        break;
      case "GameInviteText":
        return <GameInviteText confirmation={confirmation} />
        break;
      case "GameInvite":
        return <InviteFriendButton user_ID={user_ID} inviteList={usersArray} setInviteList={setUsersArray} />
        break;
      case "Evaluation":
        return <EvaluationButtons user_ID={user_ID} evaluationList={usersArray} setEvaluationList={setUsersArray} />
        break;
    }
  }

  return (
    <User onPress={accessProfile} activeOpacity={!disableNavigation ? 0.8 : 1} onLongPress={handleLongPress ? handleLongPress : ()=>{}}>
      <UserPhoto source={typeof photo === 'string' ? {uri: photo} : photo} />
      <UserInfo>
        <View>
          <UserName>{name}</UserName>
          <ReputationView>
            <ReputationText>Rep.: </ReputationText>
            <Metric reputation={reputation} size={15}/>
          </ReputationView>
        </View>

        {handleButtons()}
      </UserInfo>
    </User>
  );
}

export default UserCard;