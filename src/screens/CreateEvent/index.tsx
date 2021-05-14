import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { Image, Text, View} from "react-native";
import Input from '../../Components/Input';
import api from '../../services/api';
import { Checkbox, CheckboxChecked, CheckboxLabel, CheckboxView, Container, GameInfo, SubmitButton, SubmitButtonText, SubmitButtonView } from './styles';

const gameIcon = require('../../../assets/images/futbol-small.png');
const moneyIcon = require('../../../assets/images/money.png');
const clockIcon = require('../../../assets/images/clock.png');
const calendarIcon = require('../../../assets/images/calendar.png');
const mapIcon = require('../../../assets/images/map-marker.png');
const checkIcon = require('../../../assets/images/check.png');

const CreateEvent: React.FC = ()=>{

  const navigation = useNavigation();

  const [paid, setPaid] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [hostId, setHostId] = useState('60840f07fe32c028144a42dd');

  const handleSubmit = useCallback(()=>{
    sendData();
  }, [sendData]);

  function sendData(){
    const data = {
      name, type, location, description,
      "host_ID": hostId
    }
    
    console.log(data);
    AsyncStorage.getItem("auth_token").then(token =>{
      api.post(`/games`, data,{
        headers: {
          auth_token: token
        },
      }).then(()=>{
        navigation.navigate('Main');
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }

  function handleCheckbox(){
    setPaid(!paid);
  }

  return (
    <Container>
      <GameInfo>
        <Input 
          label="Nome" 
          value={name}
          setValue={setName}
          />

        <Input 
          label="Tipo de partida" 
          image={gameIcon}
          value={type}
          setValue={setType}
          />
        <Input 
          label="Local" 
          image={mapIcon}
          value={location}
          setValue={setLocation}
          />

        <View>
          <Input 
            label="Data" 
            image={calendarIcon}
            value={date}
          setValue={setDate}
            />
          <Input 
            label="Hora" 
            image={clockIcon}
            value={time}
            setValue={setTime}
            />
        </View>

          {(paid == false)
            ?
            <CheckboxView onPress={handleCheckbox}>
              <Checkbox/>
              <CheckboxLabel>Evento pago?</CheckboxLabel>  
            </CheckboxView>
            :
            <CheckboxView onPress={handleCheckbox}>
              <CheckboxChecked>
                <Image source={checkIcon} />
              </CheckboxChecked>
              <CheckboxLabel>Evento pago!</CheckboxLabel>  
            </CheckboxView>
          }

        {(paid == true)
            ?
            <Input 
              label="Valor" 
              image={moneyIcon}
              value={cost}
              setValue={setCost}
              />
            :
            <View />
        }

        <Input 
          label="Descrição" 
          multilineActive={true}
          value={description}
          setValue={setDescription}
          />

        <SubmitButtonView>
          <SubmitButton onPress={handleSubmit}>
            <SubmitButtonText>Cadastrar partida</SubmitButtonText>
          </SubmitButton>
        </SubmitButtonView>
      </GameInfo>
    </Container>
  );
}

export default CreateEvent;