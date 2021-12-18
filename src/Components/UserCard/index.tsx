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
import Gesture from '../Gesture';

interface UserCardProps{
  name: string;
  _id: string;
  user_ID: string;
  buttonsType: "AddFriend" | "DeleteFriend" | "Invite" | "GameInviteText" | "GameInvite" | "Evaluation";
  disableButtons: boolean;
  reputation: number;
  photo: ImageSourcePropType | string;
  confirmation?: boolean;
  reloadFunction?: () => void;
  callback?: () => void;
  callback2?: () => void;
  usersArray?: any[];
  setUsersArray?: (value: any[]) => void;
  disableNavigation?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
    name, _id, user_ID, photo, disableButtons, buttonsType, reputation, confirmation, disableNavigation,
    reloadFunction, callback, callback2, usersArray, setUsersArray
  }) => {
  const navigation = useNavigation<any>();

  const userName = (minLength: number, maxLength: number) => Dimensions.get('window').width < 480
                                                             ? splitText(name, minLength)
                                                             : splitText(name, maxLength);

  function accessProfile()
  {
    if (!disableNavigation) navigation.push("Profile", {id: user_ID});
  }

  function handleName()
  {
    const name = {
      "AddFriend": userName(12, 20),
      "DeleteFriend": userName(15, 20),
      "Invite": userName(12, 20),
      "GameInviteText": userName(12, 20),
      "GameInvite": userName(18, 20),
      "Evaluation": userName(12, 20)
    }

    return name[buttonsType];
  }

  function handleButtons()
  {
    const buttons = {
      "AddFriend": <AddFriendButtons
                      _id={user_ID}
                      reloadFunction={reloadFunction ? reloadFunction : ()=>{}}
                   />,
      "DeleteFriend": <DeleteFriendButtons
                        _id={_id}
                        disableButtons={disableButtons}
                        callback={callback ? callback : ()=>{}}
                      />,
      "Invite": <InviteButtons
                  _id={_id}
                  disableButtons={disableButtons}
                  reloadFunction={reloadFunction ? reloadFunction : ()=>{}}
                  callback={callback ? callback : ()=>{}}
                />,
      "GameInviteText": <GameInviteText
                            confirmation={confirmation}
                        />,
      "GameInvite": <InviteFriendButton
                      user_ID={user_ID}
                      inviteList={usersArray}
                      setInviteList={setUsersArray}
                    />,
      "Evaluation": <EvaluationButtons
                      user_ID={user_ID}
                      evaluationList={usersArray}
                      setEvaluationList={setUsersArray}
                    />
    }

    return buttons[buttonsType];
  }

  function renderCard()
  {
    return (
      <User onPress={accessProfile} activeOpacity={!disableNavigation ? 0.8 : 1}>
        <UserPhoto source={typeof photo === 'string' ? {uri: photo} : photo} />
        <UserInfo>
          <View>
            <UserName>{handleName()}</UserName>
            <ReputationView>
              <ReputationText>Rep.: </ReputationText>
              <Metric reputation={reputation} size={15}/>
            </ReputationView>
          </View>

          {handleButtons()}
        </UserInfo>
      </User>
    )
  }

  if (buttonsType == "GameInviteText" && !disableButtons) {
    const buttons: any = [{type: "Cancel", function: callback}];

    if (callback2) {
      buttons.push({type: "Confirm", function: callback2});
    }

    return (
      <Gesture
        buttons={buttons}
      >
        {renderCard()}
      </Gesture>
    );
  }
  else return renderCard();
}

export default UserCard;