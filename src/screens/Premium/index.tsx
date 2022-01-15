import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image } from "react-native";

import Header from "../../Components/Header";
import MessageModal from "../../Components/MessageModal";
import PremiumCard from "../../Components/PremiumCard";
import { useAuth } from "../../Contexts/Auth";

import {
  CardsContainer,
  Container,
  PremiumContainer,
  Content,
  Title,
  Item,
  TopImage,
  SubmitButtonView,
  SubmitButton,
  SubmitButtonText
} from "./styles";

const goal = require('../../../assets/images/premium.png');

const Premium: React.FC = () => {
  const {signOut, string} = useAuth();

  const navigation = useNavigation();

  const [modal, setModal] = useState<any>(null);
  const [tier, setTier] = useState(0);

  function handleSubscription()
  {
    if (tier === 0) {
      return showModal("Tier");
    }

    navigation.navigate("Main");
  }

  function showModal(type: "Tier")
  {
    let modalInfo: any = {
      "Tier": {message:{title: "Você não escolheu um plano!",
                                   message: "Escolha um dos três planos para prosseguir"}}
    };

    setModal(
      <MessageModal
        visible={true}
        loading={false}
        setModal={() => setModal(null)}
        message={modalInfo[type].message}
        buttons={modalInfo[type].buttons}
      />
    );
  }

  return (
    <Container>
      <Header />

      {modal && modal}
      <Content>
        <TopImage>
          <Image source={goal}/>
        </TopImage>

        <PremiumContainer>
          <Title>TinsBoss</Title>

          <Item>{'\u2022'} Cadastre quantos eventos quiser</Item>
          <Item>{'\u2022'} Cadastre eventos recorrentes</Item>
        </PremiumContainer>

        <CardsContainer>
          <PremiumCard
            subscription={{time: 1, period: "Mês"}}
            price="9,99/mês"
            tier={1}
            setTier={setTier}
            selected={tier}
          />
          <PremiumCard
            subscription={{time: 3, period: "Meses"}}
            price="34,99"
            tier={2}
            setTier={setTier}
            selected={tier}
          />
          <PremiumCard
            subscription={{time: 12, period: "Meses"}}
            price="99,99/ano"
            tier={3}
            setTier={setTier}
            selected={tier}
          />
        </CardsContainer>

        <SubmitButtonView>
          <SubmitButton onPress={handleSubscription}>
            <SubmitButtonText>Assinar</SubmitButtonText>
          </SubmitButton>
        </SubmitButtonView>
      </Content>
    </Container>
  );
}

export default Premium;