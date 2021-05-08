import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import{Game, GameInfo, GameTitle, LocationText, TimeText} from './styles';

interface GameCardProps{
  title: string;
  location: string;
  time: string;
  icon: ImageSourcePropType;
  _id: string;
}

const GameCard: React.FC<GameCardProps> = ({_id, title, location, time, icon}) =>{

  const navigation = useNavigation();

  const handleGame = useCallback(() =>{
    navigation.navigate('GameInfo', {_id});
  },[navigation]);

  return (
    <Game onPress={handleGame} key={_id}>
      <Image source={icon}/>
      <GameInfo>
        <View>
          <GameTitle>{title.length == 18 ? title : title.substr(0, 18) + "..."}</GameTitle>
          <LocationText>Local: {location}</LocationText>
        </View>
        <TimeText>{time}</TimeText>
      </GameInfo>
    </Game>
  );
}

export default GameCard;