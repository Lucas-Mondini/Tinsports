import React from "react";
import { Image, ImageSourcePropType, Text } from "react-native";
import { BadgeText, BadgeView } from "./styles";

interface BadgeProps {
  text: string;
  image: ImageSourcePropType;
}

const Badge: React.FC<BadgeProps> = ({text, image}) => {
  return (
    <BadgeView>
      <Image source={image} />
      <BadgeText>{text}</BadgeText>
    </BadgeView>
  );
}

export default Badge;