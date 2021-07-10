import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { useAuth } from '../../../../Contexts/Auth';
import Icon from 'react-native-vector-icons/FontAwesome';

import { User, UserInfo, UserName, UserPhoto, ReputationText, ReputationView, InviteButton} from './styles';

interface UserCardProps{
  name: string;
  //reputation: number;
  photo: ImageSourcePropType;
  confirmation?: boolean;
  addFriend?: boolean;
  user_ID: string;
  inviteList: string[];
  setInviteList: (value: string[]) => void;
}

const UserCard: React.FC<UserCardProps> = ({name, user_ID, inviteList, setInviteList, photo})=>{
  const [invite, setInvite] = useState(false);

  function handleInviteList() {
    let usersList = [...inviteList];

    if (!invite) {
      usersList.push(user_ID);
    } else {
      usersList = usersList.filter(userId => userId !== user_ID);
    }
    
    setInviteList(usersList)
    setInvite(!invite);
  }

  return (
    <User>
      <UserPhoto source={photo} />
      <UserInfo>
        <View>
          <UserName>{name}</UserName>
          <ReputationView>
            <ReputationText>Reputação: </ReputationText>
            <Icon name="star" color="yellow" size={15}/>
            <Icon name="star" color="yellow" size={15}/>
            <Icon name="star" color="yellow" size={15}/>
            <Icon name="star-half-empty" color="yellow" size={15}/>
            <Icon name="star-o" color="yellow" size={15}/>
          </ReputationView>
        </View>

        <InviteButton onPress={handleInviteList}><Icon name="share" size={25} color={invite ? '#268E01' : '#686868'}/></InviteButton>
      </UserInfo>
    </User>
  );
}

export default UserCard;