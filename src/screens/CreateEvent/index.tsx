import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useCallback } from 'react';
import { Image, Text, View} from "react-native";
import Input from '../../Components/Input';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import { Checkbox, CheckboxChecked, CheckboxLabel, CheckboxView, Container, GameInfo, SubmitButton, SubmitButtonText, SubmitButtonView } from './styles';

const gameIcon = require('../../../assets/images/futbol-small.png');
const moneyIcon = require('../../../assets/images/money.png');
const clockIcon = require('../../../assets/images/clock.png');
const calendarIcon = require('../../../assets/images/calendar.png');
const mapIcon = require('../../../assets/images/map-marker.png');
const checkIcon = require('../../../assets/images/check.png');

interface User{
  email: string;
  _id: string;
  name: string;
  auth_token: string;
}

const CreateEvent: React.FC = ()=>{

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [paid, setPaid] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  //const [user, setUser] = useState<User>();
  const {user} = useAuth();

  async function sendData(){

    if(user){

      const data = {
        name, type, location, description, hour, date, value,
        "host_ID": user?.auth_token
      }

      try{
        await api.post(`/games`, data,{
          headers: {
            auth_token: user.auth_token
          },
        });
      } catch(err){
        console.log(err);
        return
      }

      navigation.navigate('Main');
    } else {
      navigation.navigate('Home');
    }
  }

  const handleSubmit = useCallback(()=>{
    sendData();
  }, [sendData]);

  function handleCheckbox(){
    setPaid(!paid);
  }

  useEffect(()=>{
    //getDataFromAsyncStorage();
  }, [isFocused]);

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
            value={hour}
            setValue={setHour}
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
              value={value}
              setValue={setValue}
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