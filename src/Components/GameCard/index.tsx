import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import{Game, GameInfo, GameTitle, LocationText, TimeText} from './styles';

interface GameCardProps{
  title: string;
  location: string;
  time: string;
  icon: ImageSourcePropType;
}

const GameCard: React.FC<GameCardProps> = ({title, location, time, icon}) =>{

  const navigation = useNavigation();

  const handleGame = useCallback(() =>{
    navigation.navigate('GameInfo');
  },[navigation]);

  return (
    <Game onPress={handleGame}>
      <Image source={icon}/>
      <GameInfo>
        <View>
          <GameTitle>{title}</GameTitle>
          <LocationText>Local: {location}</LocationText>
        </View>
        <TimeText>{time}</TimeText>
      </GameInfo>
    </Game>
  );
}

export default GameCard;