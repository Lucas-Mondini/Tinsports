import { useNavigation } from "@react-navigation/native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  HeaderContainer,
  BackButton
} from "./styles";

type HeaderProps = {
  visible?: boolean
}

const Header: React.FC<HeaderProps> = ({visible = true}) => {
  const navigation = useNavigation();

  function goBack() {
    navigation.goBack();
  }

  function goHome() {
    navigation.reset({index: 0, routes: [{name: "Main"}]});
  }

  if (!visible) return null;

  return (
    <HeaderContainer>
      <BackButton onPress={goBack}>
        <Icon name="arrow-left" size={35} color="#686868"/>
      </BackButton>
      <BackButton onPress={goHome}>
        <Icon name="home" size={35} color="#686868"/>
      </BackButton>
    </HeaderContainer>
  );
}

export default Header;