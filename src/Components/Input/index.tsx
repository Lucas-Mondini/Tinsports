import React, { useState } from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { View } from 'react-native';
import { Label, InputText, InputContainer, InputImageBox, InputTextNoImage } from './styles';

interface InputProps{
  label: string;
  image?: ImageSourcePropType;
  multilineActive?: boolean;
}

const Input: React.FC<InputProps> = ({label, image, multilineActive}) => {
  return (
    <View>
      <Label>{label}</Label>
      <InputContainer>

        {(image)
          ?
          <InputImageBox>
            <Image source={image}/>
          </InputImageBox>
          :
          <View />
        }
        
        {(image)
          ?
          <InputText multiline={multilineActive}/>
          :
          <InputTextNoImage multiline={multilineActive} numberOfLines={5}/>
        }

        
      </InputContainer>
    </View>
  );
}

export default Input;