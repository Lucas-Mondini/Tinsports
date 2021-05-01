import React, { useState } from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { View } from 'react-native';
import { Label, InputText, InputContainer, InputImageBox, InputTextNoImage, InputTextDescription } from './styles';

interface InputProps{
  label: string;
  image?: ImageSourcePropType;
  multilineActive?: boolean;
  value: string;
  setValue: (value: string) => void;
}

const Input: React.FC<InputProps> = ({label, image, multilineActive, value, setValue}) => {
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
          <InputText multiline={multilineActive} value={value} onChangeText={setValue}/>
          :
            (multilineActive) 
            ?
            <InputTextDescription multiline={true} value={value} onChangeText={setValue} numberOfLines={7}/>
            :
            <InputTextNoImage multiline={false} value={value} onChangeText={setValue}/>
        }
        
      </InputContainer>
    </View>
  );
}

export default Input;