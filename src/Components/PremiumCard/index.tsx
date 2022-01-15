import React from 'react';

import {
  Card, MonthsText, Price, PriceContainer, PriceView,
} from './styles';

type PremiuCardProps = {
  subscription: {
    time: number,
    period: string
  }
  price: string,
  tier: number,
  setTier: (tier: number) => void,
  selected: number
}

const PremiumCard: React.FC<PremiuCardProps> = ({subscription, price, tier, setTier, selected}) =>
{
  const color: any = {1: "#B3AFFE", 2: "#5E54FF", 3: "#3023FF"};
  const isSelected: boolean = (selected === tier);

  return (
    <Card
      onPress={() => setTier(tier)}
      style={{width: isSelected ? "35%" : '30%', height: isSelected ? 115 : 100, marginTop: isSelected ? 0 : 10}}
      activeOpacity={1}
    >
      <PriceView style={{backgroundColor: color[tier]}}>
        <MonthsText>{subscription.time} {"\n"} {subscription.period}</MonthsText>
        <PriceContainer>
          <Price>R$ {price}</Price>
        </PriceContainer>
      </PriceView>
    </Card>
  );
}

export default PremiumCard;