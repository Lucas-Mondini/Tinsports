import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { BadgeText, BadgeView } from "./styles";

interface BadgeProps {
  text: string;
  icon: string;
  size: number;
}

const Badge: React.FC<BadgeProps> = ({text, icon, size}) => {
  return (
    <BadgeView>
      <Icon name={icon} size={size} color="#686868"/>
      <BadgeText>{text}</BadgeText>
    </BadgeView>
  );
}

export default Badge;