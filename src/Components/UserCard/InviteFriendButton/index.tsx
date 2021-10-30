import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { InviteButton} from './styles';

interface UserCardProps{
  user_ID: string;
  inviteList?: any[];
  setInviteList?: (value: any[]) => void;
}

const UserCard: React.FC<UserCardProps> = ({user_ID, inviteList, setInviteList})=>{
  const [invite, setInvite] = useState(false);

  function handleInviteList() {
    let usersList = inviteList ? [...inviteList] : [];

    if (!invite) {
      usersList.push(user_ID);
    } else {
      usersList = usersList.filter(userId => userId !== user_ID);
    }

    if (setInviteList) setInviteList(usersList);
    setInvite(!invite);
  }

  return <InviteButton
            onPress={handleInviteList}
         >
            <Icon
              name="share"
              size={25}
              color={invite ? '#268E01' : '#686868'}
            />
         </InviteButton>
}

export default UserCard;