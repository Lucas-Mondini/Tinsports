import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment-timezone';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View} from "react-native";
import DateTimePicker, {Event} from "@react-native-community/datetimepicker";

import {
  Container,
  GameInfo,
  SubmitButton,
  SubmitButtonText,
  SubmitButtonView
} from './styles';

import { useAuth } from '../../Contexts/Auth';
import { formatMoney, formatMoneyRealTime } from '../../utils/functions';
import { Game, Params } from '../../utils/types';
import { useRequest } from '../../Contexts/Request';
import Input from '../../Components/Input';
import Header from '../../Components/Header';
import GenericMessageModal from '../../Components/GenericMessageModal';
import Loading from '../../Components/Loading';
import Checkbox from '../../Components/Checkbox';

const CreateEvent: React.FC = () =>
{
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const params = useRoute().params as Params;
  const [game, setGame] = useState({} as Game);
  const [paid, setPaid] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [hourPicker, setHourPicker] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());
  const [modal, setModal] = useState<any>();

  const [loading, setLoading] = useState(false);

  const {user, signOut} = useAuth();
  const {post, get, put} = useRequest();

  async function getGameData()
  {
    if (params && params.id) {
      try {
        const gameData = await get(`/games/${params.id}`, setLoading);
        setGame(gameData);
      } catch (err){}
    }
  }

  async function sendData()
  {
    if (!user) return signOut();

    try{
      setDisableButton(true);

      if (params && params.id) {
        await put(`/games/${params.id}`, setLoading, game);
      } else {
        await post(`/games`, setLoading, game);
      }

      navigation.reset({index: 0, routes: [{name: "Main"}]});
    } catch(err: any) {
      setDisableButton(true);

      let type: any;

      switch (parseInt(err.message)) {
        case 403:
          type = "Premium";
          break;
        case 401:
          type = "EventDateLowerThanActual"
          break;
        default:
          type = "default"
      }

      setModal(
        <GenericMessageModal
          type={type}
          setModal={() => setModal(null)}
        />
      );
    }
  }

  function enableButton()
  {
    if ((game.name && game.name.trim() !== '')
        && (game.type && game.type.trim() !== '')
        && (game.location && game.location.trim() !== '')
        && (game.date && game.date.trim() !== '')
        && (game.hour && game.hour.trim() !== '')
        && ((paid && game.value && game.value.trim() !== '') || (!paid))
       )
        {
          setDisableButton(false);
        } else setDisableButton(true);
  }

  function datePickerComponent()
  {
    let datePicker = <DateTimePicker
                       value={date}
                       onChange={(_: Event, date?: Date) => {
                            setDatePicker(false);
                            setDate(date || new Date());
                            setGame({...game, date: date ? moment(date).format("DD/MM/YYYY") : ""});
                          }
                       }
                       mode="date"
                     />

    return datePicker;
  }

  function hourPickerComponent()
  {
    let datePicker = <DateTimePicker
                       value={hour}
                       onChange={(_: Event, date?: Date) => {
                            setHourPicker(false);
                            setHour(date || new Date());
                            setGame({...game, hour: date ? moment(date).format("HH:mm") : ""});
                          }
                       }
                       mode="time"
                     />

    return datePicker;
  }

  useEffect(() => {
    if (isFocused) getGameData();
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) enableButton();
  }, [game, paid, isFocused]);

  if (loading) return <Loading />
  return (
    <Container>
      <Header />

      {datePicker && datePickerComponent()}
      {hourPicker && hourPickerComponent()}
      {modal && modal}

      <GameInfo>
        <Input
          label="Nome"
          value={game.name}
          setValue={name => setGame({...game, name})}
          />

        <Input
          label="Tipo de partida"
          icon="soccer-ball-o"
          size={25}
          value={game.type}
          maxLength={17}
          setValue={type => setGame({...game, type})}
          />
        <Input
          label="Local"
          icon="map-marker"
          size={28}
          value={game.location}
          setValue={location => setGame({...game, location})}
          />

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity activeOpacity={1} onPress={() => setDatePicker(true)} style={{flex: 1}}>
            <View pointerEvents="none">
              <Input
                label="Data"
                icon="calendar-o"
                size={25}
                value={game.date}
                numeric
                style={{flex:1, marginRight: 15}}
                maxLength={10}
                disabled={false}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} onPress={() => setHourPicker(true)} style={{flex: 1}}>
              <View pointerEvents="none">
                <Input
                  label="Hora"
                  icon="clock-o"
                  size={28}
                  value={game.hour}
                  numeric
                  style={{flex:1}}
                  maxLength={5}
                  disabled={false}
                  />
              </View>
            </TouchableOpacity>
          </View>

          <Checkbox
            text={!paid ? "Evento pago?" : "Evento pago!"}
            handleCheckbox={() => setPaid(!paid)}
            checked={paid}
          />

        {(paid == true)
            ?
            <Input
              label="Valor"
              icon="money"
              size={25}
              value={game.value}
              numeric
              maxLength={10}
              callback={() => {if (game.value) setGame({...game, value: formatMoneyRealTime(game.value)})}}
              setValue={value => setGame({...game, value: formatMoneyRealTime(value)})}
              />
            :
            <View />
        }

        <Input
          label="Descrição"
          multilineActive={true}
          value={game.description}
          setValue={description => setGame({...game, description})}
          />

        {user?.premium &&
          <Checkbox
            text={!game.recurrence ? "Repetir semanalmente?" : "Ocorre toda semana"}
            handleCheckbox={() => setGame({...game, recurrence: !game.recurrence})}
            checked={game.recurrence}
        />
        }

        <SubmitButtonView>
          <SubmitButton
            disabled={disableButton}
            style={{backgroundColor: disableButton ? "#686868" : "#007E33"}}
            onPress={!disableButton ? sendData : () => {}}>
            <SubmitButtonText>{params ? "Salvar" : "Cadastrar"}</SubmitButtonText>
          </SubmitButton>
        </SubmitButtonView>
      </GameInfo>
    </Container>
  );
}

export default CreateEvent;