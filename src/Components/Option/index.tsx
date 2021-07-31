import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { OptionContainer, OptionText } from "./styles";

type OptionsProps = {
  text: string;
  actions: () => void;
  icon: {
    name: string;
    size: number;
    color?: string;
    ionicons?: boolean;
  }
}

const Option: React.FC<OptionsProps> = ({text, actions, icon}) => {
  let iconComponent = icon.ionicons
              ? <Ionicons name={icon.name} size={icon.size} color={icon.color || '#686868'} />
              : <FontAwesome5 name={icon.name} size={icon.size} color={icon.color || '#686868'} />

  return (
    <OptionContainer onPress={actions}>
      {iconComponent}
      <OptionText>{text}</OptionText>
    </OptionContainer>
  );
}

export default Option;