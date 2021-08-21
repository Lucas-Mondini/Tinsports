import React from "react";
import { Dimensions } from "react-native";
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

  const fontSize = Dimensions.get("window").width <= 320 ? 20 : 30;
  const iconSize = Dimensions.get("window").width <= 320 ? icon.size * 0.75 : icon.size;

  let iconComponent = icon.ionicons
              ? <Ionicons name={icon.name} size={iconSize} color={icon.color || '#686868'} />
              : <FontAwesome5 name={icon.name} size={iconSize} color={icon.color || '#686868'} />

  return (
    <OptionContainer
      onPress={actions}
      style={{
        paddingTop: Dimensions.get("window").width <= 320 ? 5 : 20,
        height: Dimensions.get("window").width <= 320 ? 40 : 60
      }}
    >
      {iconComponent}
      <OptionText style={{fontSize: fontSize}}>{text}</OptionText>
    </OptionContainer>
  );
}

export default Option;