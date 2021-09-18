import React, { useEffect, useState } from 'react';
import { Dimensions, ImageSourcePropType, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { User, UserInfo, UserName, UserPhoto, ReputationText, ReputationView, InviteButton} from './styles';
import Metric from '../../../Metric';
import { splitText } from '../../../../utils/functions';

interface UserCardProps{
  name: string;
  reputation: number;
  photo: ImageSourcePropType | string;
  confirmation?: boolean;
  addFriend?: boolean;
  user_ID: string;
  inviteList: string[];
  setInviteList: (value: string[]) => void;
}

const UserCard: React.FC<UserCardProps> = ({name, user_ID, inviteList, reputation, setInviteList, photo})=>{
  const [invite, setInvite] = useState(false);

  const userName = Dimensions.get("window").width <= 320 ? splitText(name, 15) : splitText(name, 20);

  function handleInviteList() {
    let usersList = [...inviteList];

    if (!invite) {
      usersList.push(user_ID);
    } else {
      usersList = usersList.filter(userId => userId !== user_ID);
    }

    setInviteList(usersList);
    setInvite(!invite);
  }

  return (
    <User>
      <UserPhoto source={typeof photo == "string" ? {uri: photo} : photo} />
      <UserInfo>
        <View>
          <UserName>{userName}</UserName>
          <ReputationView>
            <ReputationText>Rep.: </ReputationText>
            <Metric reputation={reputation} size={15}/>
          </ReputationView>
        </View>

        <InviteButton onPress={handleInviteList}><Icon name="share" size={25} color={invite ? '#268E01' : '#686868'}/></InviteButton>
      </UserInfo>
    </User>
  );
}

export default UserCard;