import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { NoGameText, NoGameView} from "./styles";

interface NoGameProps {
  text: string;
}

const NoGame: React.FC<NoGameProps> = ({text}) => {
  return (
    <NoGameView>
      <Icon name="do-not-disturb" size={35} color="#d8d8d8"/>
      <NoGameText>{text}</NoGameText>
    </NoGameView>
  );
}

export default NoGame;