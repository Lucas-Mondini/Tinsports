import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image } from "react-native";
import { GooglePay } from 'react-native-google-pay';

import env from "../../../env";
import Header from "../../Components/Header";
import GenericMessageModal from "../../Components/GenericMessageModal";
import PremiumCard from "../../Components/PremiumCard";

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
  const navigation = useNavigation();

  const [modal, setModal] = useState<any>(null);
  const [tier, setTier] = useState(0);

  function handleSubscription()
  {
    if (tier === 0) {
      return showModal();
    }

    const allowedCardNetworks: Array<'VISA'|'MASTERCARD'> = ['VISA', 'MASTERCARD'];
    const allowedCardAuthMethods: Array<'PAN_ONLY'|'CRYPTOGRAM_3DS'> = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

    const price: any = {1: 9.99, 2: 34.99, 3: 99.99};

    // Set the environment before the payment request
    GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);

    // Check if Google Pay is available
    GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods)
      .then((ready) => {
        console.log(ready);
        if (ready) {
          // Request payment token
          GooglePay.requestPayment({
            cardPaymentMethod: {
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                stripe: {
                  publishableKey: env.publishableKey,
                  version: '2018-11-08',
                },
                // other:
                gateway: 'stripe',
                gatewayMerchantId: env.gatewayMerchantId,
              },
              allowedCardNetworks,
              allowedCardAuthMethods,
            },
            transaction: {
              totalPrice: `${price[tier]}`,
              totalPriceStatus: 'FINAL',
              currencyCode: 'BRL',
            },
            merchantName: env.merchantName,
          })
            .then((token: string) => {
              console.log(price[tier]);
              console.log(token);
            })
            .catch((error) => console.log(error.code, error.message));
        }
      });
  }

  function showModal()
  {
    setModal(
      <GenericMessageModal
        type={"Tier"}
        setModal={() => setModal(null)}
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