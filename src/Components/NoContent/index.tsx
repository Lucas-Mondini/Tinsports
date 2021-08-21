import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import { NoContentText, NoContentView} from "./styles";

interface NoContentProps {
  text: string;
  style?: object;
}

const NoContent: React.FC<NoContentProps> = ({text, style}) => {
  return (
    <NoContentView style={style}>
      <Icon name="do-not-disturb" size={35} color="#d8d8d8"/>
      <NoContentText>{text}</NoContentText>
    </NoContentView>
  );
}

export default NoContent;