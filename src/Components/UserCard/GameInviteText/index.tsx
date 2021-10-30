import React from 'react';

import {
  UnconfirmedText,
  ConfirmedText
} from './styles';

interface GameInviteTextProps{
  confirmation?: boolean;
}

const GameInviteText: React.FC<GameInviteTextProps> = ({confirmation}) => {

  let confirmed = <ConfirmedText>Confirmado</ConfirmedText>
  if (!confirmation) confirmed = <UnconfirmedText>Não confirmado</UnconfirmedText>

  return confirmed;
}

export default GameInviteText;